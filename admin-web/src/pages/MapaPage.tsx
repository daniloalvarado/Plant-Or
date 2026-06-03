import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { usePlantas } from '@/hooks/use-plantas'
import { useNavigate } from 'react-router-dom'
import { Leaf, MapPin, Filter, Search } from 'lucide-react'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { EstadoBadge } from '@/components/EstadoBadge'
import { useState } from 'react'
import type { Planta } from '@/types/planta'
import { CustomSelect } from '@/components/CustomSelect'
import { useTheme } from '@/components/ThemeProvider'

// Fix Leaflet default icon paths broken by Vite bundler
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const STATUS_COLORS: Record<string, string> = {
  'Validado':    '#1FC451',
  'En revisión': '#FBBF24',
  'Observado':   '#FB923C',
  'Rechazado':   '#EF4444',
}
const ALL_STATES = Object.keys(STATUS_COLORS)

const createMarkerIcon = (estado: string) => {
  const color = STATUS_COLORS[estado] ?? '#6B7280'
  return L.divIcon({
    className: '',
    html: `<div style="
      width:20px;height:20px;border-radius:50%;
      background-color:${color};
      border:3px solid rgba(255,255,255,0.9);
      box-shadow:0 0 10px ${color}80,0 2px 6px rgba(0,0,0,.5);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  })
}

export default function MapaPage() {
  const { plantas, loading } = usePlantas()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const mapPlantas = plantas.filter(p => p.latitud && p.longitud)

  const counts: Record<string, number> = { all: mapPlantas.length }
  ALL_STATES.forEach(s => { counts[s] = mapPlantas.filter(p => p.estado_revision === s).length })

  const filtered = mapPlantas.filter(p => {
    const matchesState = activeFilter === 'all' || p.estado_revision === activeFilter;
    const textToSearch = `${p.distrito || ''} ${p.direccion || ''} ${p.tipo_ubicacion_1 || ''} ${p.tipo_ubicacion_2 || ''} ${p.numero_casa || ''} ${p.nombres_comunes || ''} ${p.nombre_cientifico || ''}`.toLowerCase();
    const matchesSearch = !searchTerm || textToSearch.includes(searchTerm.toLowerCase());
    return matchesState && matchesSearch;
  })

  const center: [number, number] = [-3.74912, -73.25383]

  if (loading) return <LoadingSpinner text="Cargando mapa..." />

  return (
    <>
    <div className="flex flex-col h-[calc(100vh-120px)] gap-4">
      {/* Header */}
      <div className="flex flex-col gap-4 flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mapa del Catálogo</h1>
            <p className="text-muted-foreground mt-1">
              {counts[activeFilter] ?? 0} {(counts[activeFilter] ?? 0) === 1 ? 'registro geolocalizado' : 'registros geolocalizados'}
            </p>
          </div>
          
          {/* Filters - Desktop (Chips) */}
          <div className="hidden sm:flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-foreground/10 border-foreground/30 text-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground hover:bg-foreground/10'
              }`}
            >
              Todos ({counts['all'] ?? 0})
            </button>
            {ALL_STATES.map(state => (
              <button
                key={state}
                onClick={() => setActiveFilter(state)}
                style={activeFilter === state ? {
                  borderColor: STATUS_COLORS[state] + '80',
                  color: STATUS_COLORS[state],
                  backgroundColor: STATUS_COLORS[state] + '18',
                } : {}}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  activeFilter === state ? '' : 'border-border text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                }`}
              >
                {state} ({counts[state] ?? 0})
              </button>
            ))}
          </div>

          {/* Filters - Mobile (Dropdown) */}
          <div className="flex sm:hidden items-center gap-2 w-full flex-1">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <CustomSelect
                value={activeFilter}
                onChange={(val) => setActiveFilter(val)}
                options={[
                  { value: 'all', label: `Todos (${counts['all'] ?? 0})` },
                  ...ALL_STATES.map(state => ({
                    value: state,
                    label: `${state} (${counts[state] ?? 0})`
                  }))
                ]}
              />
            </div>
          </div>
        </div>

        {/* Search Bar - Full Width everywhere */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por distrito, calle o nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#1FC451] transition-colors"
          />
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative rounded-xl overflow-hidden border border-border min-h-0">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            key={theme} // force re-render when theme changes
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
            url={theme === 'dark' ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"}
            subdomains="abcd"
          />
          <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={50}
            showCoverageOnHover={false}
          >
            {filtered.map(p => (
              <Marker key={p._id} position={[p.latitud!, p.longitud!]} icon={createMarkerIcon(p.estado_revision)}>
                <Popup className="plant-popup">
                  <div className="text-sm space-y-2 min-w-[180px]">
                    <p className="font-bold italic text-gray-900 leading-tight">{p.nombre_cientifico || '—'}</p>
                    {p.nombres_comunes && <p className="text-gray-500 text-xs">{p.nombres_comunes}</p>}
                    <EstadoBadge estado={p.estado_revision} />
                    <p className="text-xs text-gray-600">Por: {p.registrador_nombre || '—'}</p>
                    <button
                      onClick={() => navigate(`/planta/${p._id}`)}
                      className="block w-full text-center text-xs font-bold text-green-700 hover:text-green-800 pt-1 border-t border-gray-200"
                    >
                      Ver Detalles →
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-6 left-4 bg-card/80 backdrop-blur-sm rounded-xl border border-border p-3 space-y-1.5 z-[1000]">
          {ALL_STATES.map(state => (
            <div key={state} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: STATUS_COLORS[state], boxShadow: `0 0 6px ${STATUS_COLORS[state]}80` }}
              />
              <span className="text-xs text-foreground">{state}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}
