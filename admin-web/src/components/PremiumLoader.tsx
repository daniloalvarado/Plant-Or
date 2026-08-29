import React, { useEffect, useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';

interface PremiumLoaderProps {
  isLoading: boolean;
}

export function PremiumLoader({ isLoading }: PremiumLoaderProps) {
  const { theme } = useTheme();
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  const points = [
    { id: 1, src: '/loader/images.jpg', top: '35%', left: '42%' },
    { id: 2, src: '/loader/images2.jpg', top: '55%', left: '28%' },
    { id: 3, src: '/loader/images3.jpg', top: '25%', left: '60%' },
    { id: 4, src: '/loader/images4.jpg', top: '65%', left: '70%' },
    { id: 5, src: '/loader/images5.jpg', top: '48%', left: '52%', isHero: true },
  ];

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden transition-opacity duration-500 ${isExiting ? 'pointer-events-none' : ''}`}>
      
      {/* Container perfectly hugging the map image */}
      <div className={`relative transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Background Map - Original untouched size */}
        <img 
          src="/loader/mapadeiquitos.webp" 
          alt="Mapa de Iquitos"
          className={`block max-w-[90vw] max-h-[90vh] object-contain opacity-80 loader-map-bg ${theme === 'dark' ? 'loader-map-dark' : 'loader-map-light'}`}
        />
        <div className="absolute inset-0 loader-grid-overlay opacity-30 pointer-events-none"></div>

        {/* Scattered Points relative ONLY to the map */}
        {points.map((point) => (
          <div
            key={point.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${isExiting && point.isHero ? 'top-1/2 left-1/2 scale-[3] z-50 opacity-0' : ''} 
              ${isExiting && !point.isHero ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}
            `}
            style={{ 
              top: isExiting && point.isHero ? '50%' : point.top, 
              left: isExiting && point.isHero ? '50%' : point.left,
              transitionDelay: isExiting && !point.isHero ? `${point.id * 50}ms` : '0ms'
            }}
          >
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-full bg-[#1FC451] animate-ping opacity-60" style={{ animationDuration: '2.5s' }}></div>
              <div className="absolute inset-0 rounded-full bg-[#1FC451] animate-ping opacity-40" style={{ animationDuration: '2.5s', animationDelay: '1s' }}></div>
              <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#1FC451] overflow-hidden bg-card shadow-[0_0_15px_rgba(31,196,81,0.5)]">
                <img src={point.src} alt="Planta" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
