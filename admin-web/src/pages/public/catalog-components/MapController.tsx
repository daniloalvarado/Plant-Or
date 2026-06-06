import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

export function MapController({ focus, markerRefs, mapResetSignal, plants }: { focus: {lat: number, lng: number, id: string} | null, markerRefs: React.MutableRefObject<Record<string, any>>, mapResetSignal: number, plants: any[] }) {
  const map = useMap();
  useEffect(() => {
    if (focus) {
      const targetCenter = [focus.lat, focus.lng] as [number, number];
      map.flyTo(targetCenter, 18, { animate: true, duration: 1.5 });
      
      const onMoveEnd = () => {
        let attempts = 0;
        const checkMarker = () => {
          const marker = markerRefs.current[focus.id];
          if (marker) {
            marker.openPopup();
          } else if (attempts < 25) {
            attempts++;
            setTimeout(checkMarker, 200);
          }
        };
        setTimeout(checkMarker, 300);
      };
      
      map.once('moveend', onMoveEnd);
    }
  }, [focus, map, markerRefs]);

  useEffect(() => {
    if (mapResetSignal > 0) {
      const validPlants = plants.filter(p => p.latitud && p.longitud);
      if (validPlants.length > 0) {
        const bounds = L.latLngBounds(validPlants.map(p => [p.latitud, p.longitud]));
        map.flyToBounds(bounds, { animate: true, duration: 1.5, padding: [50, 50] });
      } else {
        map.flyTo([-12.0464, -77.0428], 13, { animate: true, duration: 1.5 });
      }
      map.closePopup();
    }
  }, [mapResetSignal, map, plants]);

  return null;
}
