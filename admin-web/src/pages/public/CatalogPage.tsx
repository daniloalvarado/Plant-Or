import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Search, Map as MapIcon, Box, Filter, X, Leaf, CheckCircle2, Sun, Moon, ChevronRight, ChevronLeft, Menu, Pointer, MapPin } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { usePlantas } from '@/hooks/use-plantas'
import { client, urlFor, urlForImage } from '@/lib/sanity'
import type { Planta } from '@/types/planta'
import { CustomSelect } from '@/components/CustomSelect'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { TooltipLogo } from '../../components/TooltipLogo'
import { AnimatedButton } from '../../components/AnimatedButton'
import { useTheme } from '@/components/ThemeProvider'
import './CatalogPage.css'

import { MapController } from './catalog-components/MapController'
import { MinimapView } from './catalog-components/MinimapView'
import { PlantDetailModal } from './catalog-components/PlantDetailModal'
import { FiltersModal } from './catalog-components/FiltersModal'

// Leaflet setup
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const markerIcon = L.divIcon({
  className: 'custom-map-marker',
  html: `<div></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
})



function MapPersister() {
  const map = useMapEvents({
    moveend: () => {
      if (typeof window !== 'undefined') {
        const center = map.getCenter();
        localStorage.setItem('catalogMapLat', center.lat.toString());
        localStorage.setItem('catalogMapLng', center.lng.toString());
        localStorage.setItem('catalogMapZoom', map.getZoom().toString());
      }
    }
  })
  return null;
}

export default function CatalogPage() {
  const { plantas, loading } = usePlantas()
  const [viewMode, setViewMode] = useState<'tunnel' | 'map'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('catalogViewMode') as 'tunnel' | 'map') || 'tunnel'
    }
    return 'tunnel'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('catalogViewMode', viewMode)
    }
  }, [viewMode])

  const initialMapState = useMemo(() => {
    if (typeof window !== 'undefined') {
      const lat = localStorage.getItem('catalogMapLat');
      const lng = localStorage.getItem('catalogMapLng');
      const zoom = localStorage.getItem('catalogMapZoom');
      if (lat && lng && zoom) {
        return {
          center: [parseFloat(lat), parseFloat(lng)] as [number, number],
          zoom: parseInt(zoom)
        }
      }
    }
    return { center: [-12.0464, -77.0428] as [number, number], zoom: 13 }
  }, [])

  const [mapResetSignal, setMapResetSignal] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedHabito, setSelectedHabito] = useState('Todos')
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [filtersModalOpen, setFiltersModalOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobileMenuRendered, setIsMobileMenuRendered] = useState(false)
  const [isMobileMenuAnimatingOut, setIsMobileMenuAnimatingOut] = useState(false)
  const [sanityFiltros, setSanityFiltros] = useState<any[]>([])
  const [selectedPlant, setSelectedPlant] = useState<Planta | null>(null)
  const [mapFocus, setMapFocus] = useState<{lat: number, lng: number, id: string} | null>(null)
  const markerRefs = useRef<Record<string, any>>({})
  const { theme, setTheme } = useTheme()

  // Solo plantas validadas
  const publicPlants = useMemo(() => plantas.filter(p => p.estado_revision === 'Validado'), [plantas])

  // Fetch Filtros from Sanity
  useEffect(() => {
    client.fetch(`*[_type == "filtro" && activo == true] | order(orden asc)`).then(setSanityFiltros)
  }, [])

  // Habit options from actual data
  const habitoOptions = useMemo(() => {
    const habitos = new Set<string>()
    publicPlants.forEach(p => p.habito && habitos.add(p.habito))
    return ['Todos', ...Array.from(habitos)].map(h => ({ value: h, label: h }))
  }, [publicPlants])

  // Filter logic
  const filteredPlants = useMemo(() => {
    return publicPlants.filter(p => {
      // 1. Search text
      const textToSearch = `${p.nombre_cientifico} ${p.nombres_comunes} ${p.distrito} ${p.direccion}`.toLowerCase()
      if (searchTerm && !textToSearch.includes(searchTerm.toLowerCase())) return false

      // 2. Habito dropdown
      if (selectedHabito !== 'Todos' && p.habito !== selectedHabito) return false

      // 3. Advanced filters
      for (const [categoria, values] of Object.entries(activeFilters)) {
        if (values.length === 0) continue
        
        let match = false;
        // Check if any block has the value
        const blocks = ['arbol_datos', 'palmera_datos', 'arbusto_datos', 'liana_datos', 'hierba_datos']
        blocks.forEach(block => {
          if (p[block as keyof Planta]) {
            const blockData = p[block as keyof Planta] as any
            Object.values(blockData).forEach(val => {
              if (Array.isArray(val)) {
                if (val.some(v => values.includes(v))) match = true
              } else if (typeof val === 'string') {
                if (values.includes(val)) match = true
              }
            })
          }
        })
        
        // Also check top level properties
        if (values.includes(p.habito || '')) match = true
        if (values.includes(p.tipo_vida || '')) match = true
        if (p.estado_fenologico?.some(ef => values.includes(ef))) match = true
        if (p.estado_individuo?.some(ei => values.includes(ei))) match = true
        if (p.valor_ornamental?.some(vo => values.includes(vo))) match = true
        if (p.impacto_urbano?.some(iu => values.includes(iu))) match = true
        
        // If it didn't match ANY of the selected values for this category, fail
        if (!match) return false
      }

      return true
    })
  }, [publicPlants, searchTerm, selectedHabito, activeFilters])

  useEffect(() => {
    if (mobileMenuOpen) {
      setIsMobileMenuRendered(true)
      setIsMobileMenuAnimatingOut(false)
    } else if (isMobileMenuRendered) {
      setIsMobileMenuAnimatingOut(true)
      const timer = setTimeout(() => {
        setIsMobileMenuRendered(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [mobileMenuOpen, isMobileMenuRendered])

  return (
    <div className="public-catalog-bg fixed inset-0 w-full h-full font-sans overflow-hidden flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* Navbar */}
      <nav className="h-[70px] border-b border-border flex items-center justify-between px-6 flex-shrink-0 z-50 bg-background/80 backdrop-blur-md transition-colors duration-300">
        <div className="flex items-center gap-2">
          <TooltipLogo />
        </div>

        <div className="flex-1 max-w-xl mx-8 relative hidden lg:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por planta, distrito o calle..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-secondary border border-border rounded-full py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-green transition-colors"
          />
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-4">
          <div className="w-40">
            <CustomSelect
              value={selectedHabito}
              onChange={setSelectedHabito}
              options={habitoOptions}
              placeholder="Hábito..."
              className="min-w-0 w-full"
            />
          </div>
          
          <button 
            onClick={() => setFiltersModalOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 border border-border rounded-lg text-sm font-medium transition-colors cursor-pointer text-foreground"
          >
            <Filter className="w-4 h-4" />
            <span>Filtros</span>
            {Object.values(activeFilters).flat().length > 0 && (
              <span className="bg-brand-green text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {Object.values(activeFilters).flat().length}
              </span>
            )}
          </button>

          <div className="flex bg-secondary border border-border rounded-lg p-1">
            <button
              onClick={() => setViewMode('tunnel')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${viewMode === 'tunnel' ? 'bg-brand-green text-white' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Box className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setMapFocus(null); setViewMode('map'); setMapResetSignal(s => s + 1); }}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${viewMode === 'map' ? 'bg-brand-green text-white' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 ml-2 bg-secondary hover:bg-secondary/80 border border-border rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Lateral Menu */}
      {isMobileMenuRendered && (
        <div className={`fixed inset-0 z-[200] flex bg-black/80 backdrop-blur-sm md:hidden transition-opacity duration-300 ${isMobileMenuAnimatingOut ? 'opacity-0' : 'opacity-100'}`} onClick={() => setMobileMenuOpen(false)}>
          <div className={`w-72 h-full bg-card shadow-2xl flex flex-col p-6 absolute right-0 origin-top-right ${isMobileMenuAnimatingOut ? 'animate-shrink-tr' : 'animate-grow-tr'}`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-lg text-foreground">Menú</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-secondary rounded-full text-muted-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Search */}
              <div className="relative block lg:hidden">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar planta..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-full py-2 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:border-brand-green"
                />
              </div>

              {/* Habito */}
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Hábito de Crecimiento</label>
                <CustomSelect
                  value={selectedHabito}
                  onChange={setSelectedHabito}
                  options={habitoOptions}
                  placeholder="Todos"
                  className="w-full"
                />
              </div>

              {/* Filters */}
              <button 
                onClick={() => { setMobileMenuOpen(false); setFiltersModalOpen(true); }}
                className="w-full flex items-center justify-between px-4 py-3 bg-secondary hover:bg-secondary/80 border border-border rounded-lg text-sm font-medium transition-colors cursor-pointer text-foreground"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>Filtros Dinámicos</span>
                </div>
                {Object.values(activeFilters).flat().length > 0 && (
                  <span className="bg-brand-green text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {Object.values(activeFilters).flat().length}
                  </span>
                )}
              </button>

              {/* View Mode */}
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Vista</label>
                <div className="flex bg-secondary border border-border rounded-lg p-1">
                  <button
                    onClick={() => { setViewMode('tunnel'); setMobileMenuOpen(false); }}
                    className={`flex-1 flex justify-center p-2 rounded-md transition-colors cursor-pointer ${viewMode === 'tunnel' ? 'bg-brand-green text-white' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <Box className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => { setMapFocus(null); setViewMode('map'); setMapResetSignal(s => s + 1); setMobileMenuOpen(false); }}
                    className={`flex-1 flex justify-center p-2 rounded-md transition-colors cursor-pointer ${viewMode === 'map' ? 'bg-brand-green text-white' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <MapIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Theme Toggle */}
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Apariencia</label>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-secondary hover:bg-secondary/80 border border-border rounded-lg text-foreground transition-colors cursor-pointer"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span>{theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 relative">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <LoadingSpinner text="Cargando catálogo botánico..." />
          </div>
        ) : viewMode === 'tunnel' ? (
          <MinimapView plants={filteredPlants} onPlantClick={setSelectedPlant} />
        ) : (
          <div className="h-[calc(100dvh-70px)] w-full">
            <MapContainer
              center={initialMapState.center}
              zoom={initialMapState.zoom}
              scrollWheelZoom
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <MapPersister />
              <TileLayer
                attribution='&copy; CARTO'
                url={theme === 'dark' ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"}
                subdomains="abcd"
              />
              <MapController focus={mapFocus} markerRefs={markerRefs} mapResetSignal={mapResetSignal} plants={filteredPlants} />
              <MarkerClusterGroup chunkedLoading maxClusterRadius={50} disableClusteringAtZoom={17}>
                {filteredPlants.filter(p => p.latitud && p.longitud).map(p => (
                  <Marker 
                    key={p._id} 
                    position={[p.latitud!, p.longitud!]} 
                    icon={markerIcon}
                    ref={(r) => { if (r) markerRefs.current[p._id] = r; }}
                  >
                    <Popup className="plant-popup dark-popup !p-0 overflow-hidden rounded-xl border border-border bg-card text-card-foreground">
                      <div className="flex flex-col w-[200px]">
                        {p.galeria?.[0] ? (
                          <img src={urlForImage(p.galeria[0]).width(400).auto('format').url()} alt={p.nombre_cientifico} className="w-full h-32 object-cover" />
                        ) : (
                          <div className="w-full h-32 bg-secondary flex items-center justify-center">
                            <Leaf className="w-8 h-8 text-muted-foreground" />
                          </div>
                        )}
                        <div className="px-3 pb-3 pt-1.5 flex flex-col justify-center gap-1">
                          <div className="font-bold text-foreground text-sm leading-tight truncate">{p.nombres_comunes || 'Nombre com�n no registrado'}</div>
                          {p.nombre_cientifico && <div className="text-muted-foreground text-xs truncate italic">{p.nombre_cientifico}</div>}
                          <div className="mt-2 pointer-events-auto">
                            <AnimatedButton initialText="VER" hoverText="FICHA TÉCNICA" onClick={() => setSelectedPlant(p)} />
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
              
              {/* Legend */}
              <div className="absolute top-4 right-4 z-[1000] pointer-events-none">
                <div className="bg-card/90 backdrop-blur-md border border-border p-3 rounded-xl shadow-2xl pointer-events-auto">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Leyenda</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-white bg-marker-custom"></div>
                    <span className="text-sm font-bold text-marker-custom">Planta Identificada</span>
                  </div>
                </div>
              </div>
            </MapContainer>
          </div>
        )}
      </div>

      {/* Filters Modal */}
      <FiltersModal
        isOpen={filtersModalOpen}
        onClose={() => { setFiltersModalOpen(false); setMobileMenuOpen(true); }}
        onApply={() => setFiltersModalOpen(false)}
        sanityFiltros={sanityFiltros}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />

      {/* Plant Detail Modal */}
      <PlantDetailModal 
        isOpen={!!selectedPlant} 
        plant={selectedPlant} 
        onClose={() => setSelectedPlant(null)} 
        onShowOnMap={(plant) => {
          setSelectedPlant(null);
          setViewMode('map');
          if (plant.latitud && plant.longitud) {
            setMapFocus({lat: plant.latitud, lng: plant.longitud, id: plant._id});
          }
        }}
      />
    </div>
  )
}


