import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Leaf } from 'lucide-react'
import { urlForImage } from '@/lib/sanity'
import { AnimatedButton } from '@/components/AnimatedButton'
import { MapController } from './MapController'

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
      const center = map.getCenter();
      try {
        localStorage.setItem('catalogMapLat', center.lat.toString());
        localStorage.setItem('catalogMapLng', center.lng.toString());
        localStorage.setItem('catalogMapZoom', map.getZoom().toString());
      } catch (e) {
        // ignore
      }
    }
  });
  return null;
}

interface LazyCatalogMapProps {
  initialMapState: { center: [number, number]; zoom: number };
  theme: string;
  mapFocus: {lat: number, lng: number, id: string} | null;
  markerRefs: React.MutableRefObject<Record<string, any>>;
  mapResetSignal: number;
  filteredPlants: any[];
  setSelectedPlant: (p: any) => void;
}

export default function LazyCatalogMap({
  initialMapState,
  theme,
  mapFocus,
  markerRefs,
  mapResetSignal,
  filteredPlants,
  setSelectedPlant
}: LazyCatalogMapProps) {
  return (
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
                    <img src={urlForImage(p.galeria[0]).width(400).auto('format').url()} alt={p.nombre_cientifico} draggable={false} onContextMenu={(e) => e.preventDefault()} className="w-full h-32 object-cover pointer-events-none select-none" />
                  ) : (
                    <div className="w-full h-32 bg-secondary flex items-center justify-center">
                      <Leaf className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="px-3 pb-3 pt-1.5 flex flex-col justify-center gap-1">
                    <div className="font-bold text-foreground text-sm leading-tight truncate">{p.nombres_comunes || 'Nombre común no registrado'}</div>
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
  );
}
