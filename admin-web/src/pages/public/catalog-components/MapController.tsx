import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'

export function MapController({ focus, markerRefs, viewMode }: { focus: {lat: number, lng: number, id: string} | null, markerRefs: React.MutableRefObject<Record<string, any>>, viewMode: string }) {
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
    } else if (viewMode === 'map') {
      map.flyTo([-12.0464, -77.0428], 13, { animate: true, duration: 1.5 });
      map.closePopup();
    }
  }, [focus, map, markerRefs, viewMode]);
  return null;
}
