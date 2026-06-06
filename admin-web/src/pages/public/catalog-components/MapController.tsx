import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'

export function MapController({ focus, markerRefs }: { focus: {lat: number, lng: number, id: string} | null, markerRefs: React.MutableRefObject<Record<string, any>> }) {
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
          } else if (attempts < 15) {
            attempts++;
            setTimeout(checkMarker, 200);
          }
        };
        setTimeout(checkMarker, 300);
      };
      
      map.once('moveend', onMoveEnd);
    }
  }, [focus, map, markerRefs]);
  return null;
}
