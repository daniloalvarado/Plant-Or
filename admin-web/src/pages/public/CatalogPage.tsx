import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Search, Map as MapIcon, Box, Filter, X, Leaf, CheckCircle2, Sun, Moon, ChevronRight, ChevronLeft, Menu } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { usePlantas } from '@/hooks/use-plantas'
import { client, urlFor } from '@/lib/sanity'
import type { Planta } from '@/types/planta'
import { CustomSelect } from '@/components/CustomSelect'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useTheme } from '@/components/ThemeProvider'
import './CatalogPage.css'

gsap.registerPlugin(useGSAP)

// Leaflet setup
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const markerIcon = L.divIcon({
  className: '',
  html: `<div style="width:20px;height:20px;border-radius:50%;background-color:#1FC451;border:3px solid rgba(255,255,255,0.9);box-shadow:0 0 10px rgba(31,196,81,0.5),0 2px 6px rgba(0,0,0,.5);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
})

export default function CatalogPage() {
  const { plantas, loading } = usePlantas()
  const [viewMode, setViewMode] = useState<'tunnel' | 'map'>('tunnel')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedHabito, setSelectedHabito] = useState('Todos')
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [filtersModalOpen, setFiltersModalOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sanityFiltros, setSanityFiltros] = useState<any[]>([])
  const [selectedPlant, setSelectedPlant] = useState<Planta | null>(null)
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

  return (
    <div className="public-catalog-bg fixed inset-0 w-full h-full font-sans overflow-hidden flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* Navbar */}
      <nav className="h-[70px] border-b border-border flex items-center justify-between px-6 flex-shrink-0 z-50 bg-background/80 backdrop-blur-md transition-colors duration-300">
        <div className="flex items-center gap-3">
          <Leaf className="w-6 h-6 text-[#1FC451]" />
          <span className="font-bold text-lg text-foreground">Plant-OR</span>
        </div>

        <div className="flex-1 max-w-xl mx-8 relative hidden lg:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nombre, distrito o calle..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-secondary border border-border rounded-full py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#1FC451] transition-colors"
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
              <span className="bg-[#1FC451] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {Object.values(activeFilters).flat().length}
              </span>
            )}
          </button>

          <div className="flex bg-secondary border border-border rounded-lg p-1">
            <button
              onClick={() => setViewMode('tunnel')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${viewMode === 'tunnel' ? 'bg-[#1FC451] text-black' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Box className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${viewMode === 'map' ? 'bg-[#1FC451] text-black' : 'text-muted-foreground hover:text-foreground'}`}
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
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] flex bg-black/80 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-72 h-full bg-card shadow-2xl flex flex-col p-6 animate-in slide-in-from-right absolute right-0" onClick={e => e.stopPropagation()}>
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
                  className="w-full bg-secondary border border-border rounded-full py-2 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:border-[#1FC451]"
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
                  <span className="bg-[#1FC451] text-black text-xs font-bold px-2 py-0.5 rounded-full">
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
                    className={`flex-1 flex justify-center p-2 rounded-md transition-colors cursor-pointer ${viewMode === 'tunnel' ? 'bg-[#1FC451] text-black' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <Box className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => { setViewMode('map'); setMobileMenuOpen(false); }}
                    className={`flex-1 flex justify-center p-2 rounded-md transition-colors cursor-pointer ${viewMode === 'map' ? 'bg-[#1FC451] text-black' : 'text-muted-foreground hover:text-foreground'}`}
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
          <TunnelView plants={filteredPlants} onPlantClick={setSelectedPlant} />
        ) : (
          <div className="h-[calc(100vh-70px)] w-full">
            <MapContainer
              center={[-3.74912, -73.25383]}
              zoom={13}
              scrollWheelZoom
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; CARTO'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
              />
              <MarkerClusterGroup chunkedLoading maxClusterRadius={50}>
                {filteredPlants.filter(p => p.latitud && p.longitud).map(p => (
                  <Marker key={p._id} position={[p.latitud!, p.longitud!]} icon={markerIcon}>
                    <Popup className="plant-popup dark-popup !p-0 overflow-hidden rounded-xl border border-border bg-card text-card-foreground">
                      <div className="flex flex-col w-[200px]">
                        {p.galeria?.[0] ? (
                          <img src={urlFor(p.galeria[0])} alt={p.nombre_cientifico} className="w-full h-32 object-cover" />
                        ) : (
                          <div className="w-full h-32 bg-secondary flex items-center justify-center">
                            <Leaf className="w-8 h-8 text-muted-foreground" />
                          </div>
                        )}
                        <div className="p-3 text-sm space-y-1">
                          <p className="font-bold italic text-foreground leading-tight truncate">{p.nombre_cientifico || 'Por identificar'}</p>
                          {p.nombres_comunes && <p className="text-muted-foreground text-xs truncate">{p.nombres_comunes}</p>}
                          <button
                            onClick={() => setSelectedPlant(p)}
                            className="block w-full text-center text-xs font-bold text-black bg-[#1FC451] hover:bg-[#19a343] py-2 mt-3 rounded-lg transition-colors"
                          >
                            Ver Detalles
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
              
              {/* Legend */}
              <div className="leaflet-bottom leaflet-right z-[1000] pointer-events-none mb-6 mr-2">
                <div className="bg-card/90 backdrop-blur-md border border-border p-3 rounded-xl shadow-2xl pointer-events-auto">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Leyenda</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#1FC451] border-2 border-white shadow-[0_0_8px_rgba(31,196,81,0.5)]"></div>
                    <span className="text-sm font-medium text-foreground">Planta Identificada</span>
                  </div>
                </div>
              </div>
            </MapContainer>
          </div>
        )}
      </div>

      {/* Filters Modal */}
      {filtersModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
            <div className="p-5 border-b border-border flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
                <Filter className="w-5 h-5 text-[#1FC451]" />
                Filtros Dinámicos
              </h2>
              <button onClick={() => setFiltersModalOpen(false)} className="p-2 hover:bg-secondary rounded-lg transition-colors cursor-pointer text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
              {Object.entries(
                sanityFiltros.reduce((acc: any, curr) => {
                  if (!acc[curr.categoria]) acc[curr.categoria] = []
                  acc[curr.categoria].push(curr)
                  return acc
                }, {})
              ).map(([categoria, filtros]: [string, any]) => (
                <div key={categoria} className="space-y-3">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{categoria}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {filtros.map((filtro: any) => {
                      const isSelected = activeFilters[categoria]?.includes(filtro.dato_tecnico)
                      return (
                        <button
                          key={filtro._id}
                          onClick={() => {
                            setActiveFilters(prev => {
                              const curr = prev[categoria] || []
                              const isMultiple = filtro.tipo_seleccion === 'Selección múltiple'
                              let next;
                              if (curr.includes(filtro.dato_tecnico)) {
                                next = curr.filter(v => v !== filtro.dato_tecnico)
                              } else {
                                next = isMultiple ? [...curr, filtro.dato_tecnico] : [filtro.dato_tecnico]
                              }
                              return { ...prev, [categoria]: next }
                            })
                          }}
                          className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                            isSelected 
                              ? 'bg-[#1FC451]/10 border-[#1FC451]/50 text-[#1FC451]' 
                              : 'bg-secondary/50 border-border text-foreground hover:bg-secondary'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-[#1FC451] bg-[#1FC451]' : 'border-muted-foreground/30'}`}>
                            {isSelected && <CheckCircle2 className="w-3 h-3 text-black" />}
                          </div>
                          <span className="text-sm font-medium leading-tight truncate">{filtro.nombre_filtro}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-border flex justify-between items-center bg-secondary/30">
              <button 
                onClick={() => setActiveFilters({})}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Limpiar todo
              </button>
              <button 
                onClick={() => setFiltersModalOpen(false)}
                className="px-6 py-2.5 bg-[#1FC451] hover:bg-[#19a343] text-black font-bold rounded-lg transition-colors cursor-pointer shadow-none"
              >
                Aplicar filtros
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Plant Detail Modal */}
      {selectedPlant && (
        <PlantDetailModal plant={selectedPlant} onClose={() => setSelectedPlant(null)} />
      )}
    </div>
  )
}

function TunnelView({ plants, onPlantClick }: { plants: Planta[], onPlantClick: (p: Planta) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [zOffset, setZOffset] = useState(0)

  const minItems = 30
  const totalItems = Math.max(plants.length, minItems)
  const Z_GAP = 800
  const tunnelDepth = totalItems * Z_GAP
  const visibleDepth = 4 * Z_GAP

  // Generamos la data de las capas solo cuando cambian las plantas
  const layers = useMemo(() => {
    if (plants.length === 0) return []
    const newLayers = []
    for (let i = 0; i < totalItems; i++) {
      const index = i % plants.length
      const plant = plants[index]
      
      const goldenRatio = 1.61803398875
      const angle = i * Math.PI * 2 * goldenRatio
      const radiusX = 350 + (i % 3) * 50 
      const radiusY = 250 + (i % 2) * 50
      
      newLayers.push({
        id: `layer-${i}-${plant._id}`,
        plant,
        x: Math.cos(angle) * radiusX - 125,
y: Math.sin(angle) * radiusY - 175,
        baseZ: -i * Z_GAP
      })
    }
    return newLayers
  }, [plants, totalItems, Z_GAP])

  const targetZRef = useRef(0);
  const currentZRef = useRef(0);
  const touchStartRef = useRef(0);

  const handleWheel = (e: React.WheelEvent) => {
    targetZRef.current += e.deltaY * 1.5;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const deltaY = touchStartRef.current - e.touches[0].clientY;
    targetZRef.current += deltaY * 3;
    touchStartRef.current = e.touches[0].clientY;
  };

  useGSAP(() => {
    targetZRef.current = zOffset;
    currentZRef.current = zOffset;
    const exitPoint = 1500;
    
    // Animation loop
    const ticker = gsap.ticker.add(() => {
      // Interpolación suave (lerp)
      currentZRef.current += (targetZRef.current - currentZRef.current) * 0.1;
      
      if (wrapperRef.current) {
        // En lugar de mover todo el wrapper, movemos los hijos (mucho mejor rendimiento en GSAP 3D)
        const children = wrapperRef.current.children;
        for (let i = 0; i < children.length; i++) {
          const el = children[i] as HTMLElement;
          const baseZ = parseFloat(el.dataset.z || '0');
          
          let z = baseZ + currentZRef.current;
          z = ((z % tunnelDepth) + tunnelDepth) % tunnelDepth;
          z = z - tunnelDepth + exitPoint;
          
          const isVisible = z >= -visibleDepth && z <= exitPoint;
          let overlay = 1;

          if (isVisible) {
            if (z > 0) overlay = z / exitPoint;
            else if (z > -visibleDepth) {
              const progress = Math.abs(z) / visibleDepth;
              overlay = progress * progress;
            }
          }

          gsap.set(el, {
            z: z,
            "--overlay": Math.min(1, Math.max(0, overlay)),
            visibility: overlay >= 1 ? 'hidden' : 'visible'
          });
        }
      }
    });

    return () => gsap.ticker.remove(ticker);
  }, [tunnelDepth, visibleDepth, Z_GAP, layers]); // dependencias

  if (plants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-70px)] text-muted-foreground">
        <Leaf className="w-16 h-16 mb-4 opacity-20" />
        <p className="text-xl font-medium text-foreground">No se encontraron plantas</p>
        <p className="text-sm">Prueba ajustando los filtros de búsqueda</p>
      </div>
    )
  }

  return (
    <div 
      className="tunnel-scene" 
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="tunnel-wrapper" ref={wrapperRef}>
        {layers.map((layer) => (
          <div 
            key={layer.id}
            className="tunnel-layer"
            data-z={layer.baseZ}
            style={{ visibility: 'hidden' }}
          >
            <div 
              className="tunnel-item" 
              style={{ left: layer.x, top: layer.y }}
              onClick={() => onPlantClick(layer.plant)}
            >
              <img 
                src={layer.plant.galeria?.[0] ? urlFor(layer.plant.galeria[0]) : ''} 
                alt={layer.plant.nombre_cientifico} 
                style={{ background: !layer.plant.galeria?.[0] ? 'linear-gradient(135deg, #1a3a2a, #08130D)' : 'none' }}
              />
              <div className="item-overlay" />
              <div className="item-info-preview">
                <h4>{layer.plant.nombre_cientifico || layer.plant.nombres_comunes || 'Sin identificar'}</h4>
                <p>{layer.plant.habito || 'Sin clasificar'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none opacity-50">
        <div className="w-6 h-10 border-2 border-foreground rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-foreground rounded-full animate-bounce" />
        </div>
        <span className="text-xs font-medium uppercase tracking-widest mt-2 whitespace-nowrap text-foreground">Scroll para explorar</span>
      </div>
    </div>
  )
}

function PlantDetailModal({ plant, onClose }: { plant: Planta, onClose: () => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' })
  }
  const scrollRight = () => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })
  }

  return (
    <div className="fixed inset-0 z-[200] flex justify-end bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-full max-w-2xl h-full bg-[#111] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-[45vh] md:h-[55vh] flex-shrink-0 bg-black group">
          {plant.galeria && plant.galeria.length > 0 ? (
            <>
              <div ref={scrollContainerRef} className="w-full h-full relative overflow-x-auto flex snap-x snap-mandatory custom-scrollbar no-scrollbar">
                {plant.galeria.map((foto, index) => (
                  <img key={index} src={urlFor(foto)} className="w-full h-full object-cover flex-shrink-0 snap-center" alt="Foto de planta" />
                ))}
              </div>
              
              {plant.galeria.length > 1 && (
                <>
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white z-10 border border-white/10 shadow-lg">
                    {plant.galeria.length} FOTOS
                  </div>
                  <button onClick={scrollLeft} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all cursor-pointer border border-white/20">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={scrollRight} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all cursor-pointer border border-white/20">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </>
          ) : (
             <div className="w-full h-full bg-secondary flex items-center justify-center p-8">
               <div className="text-center">
                 <Leaf className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                 <h2 className="text-2xl font-bold text-foreground italic mb-2">{plant.nombre_cientifico || 'Especie por identificar'}</h2>
                 <p className="text-muted-foreground">{plant.nombres_comunes}</p>
               </div>
             </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent pointer-events-none" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-sm transition-colors cursor-pointer border border-white/20 z-20">
            <X className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-4 left-6 right-6 z-10">
            <span className="px-2.5 py-1 bg-[#1FC451] text-black text-xs font-bold rounded-md uppercase tracking-wider mb-2 inline-block shadow-lg">
              {plant.habito || 'Planta'}
            </span>
            <h2 className="text-3xl font-bold text-foreground leading-tight italic drop-shadow-md">
              {plant.nombre_cientifico || 'Especie por identificar'}
            </h2>
            {plant.nombres_comunes && (
              <p className="text-muted-foreground font-medium drop-shadow-md">{plant.nombres_comunes}</p>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 rounded-xl p-4 border border-border">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Familia</span>
              <p className="text-foreground font-medium mt-1">{plant.familia || 'No especificada'}</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 border border-border">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Tipo de vida</span>
              <p className="text-foreground font-medium mt-1">{plant.tipo_vida || 'No especificado'}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#1FC451] uppercase tracking-wider border-b border-border pb-2">
              Ubicación Registrada
            </h3>
            <p className="text-foreground/80 text-sm leading-relaxed">
              <span className="font-semibold text-foreground">Distrito:</span> {plant.distrito || '—'}<br/>
              <span className="font-semibold text-foreground">Dirección:</span> {plant.direccion || '—'} {plant.numero_casa}<br/>
              <span className="font-semibold text-foreground">Referencia:</span> {plant.ubicacion_planta || '—'}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#1FC451] uppercase tracking-wider border-b border-border pb-2">
              Evaluación Botánica
            </h3>
            <p className="text-foreground/80 text-sm leading-relaxed">
              <span className="font-semibold text-foreground">Fenología:</span> {plant.estado_fenologico?.join(', ') || '—'}<br/>
              <span className="font-semibold text-foreground">Estado del Individuo:</span> {plant.estado_individuo?.join(', ') || '—'}<br/>
              <span className="font-semibold text-foreground">Valor Ornamental:</span> {plant.valor_ornamental?.join(', ') || '—'}<br/>
              <span className="font-semibold text-foreground">Impacto Urbano:</span> {plant.impacto_urbano?.join(', ') || '—'}
            </p>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Registrado por: {plant.registrador_nombre || 'Anónimo'} • {new Date(plant._createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
