import React, { useRef, useState, useEffect } from 'react'
import { Leaf } from 'lucide-react'
import type { Planta } from '@/types/planta'
import { urlForImage } from '@/lib/sanity'
import { AnimatedButton } from '@/components/AnimatedButton'

export function MinimapView({ plants, onPlantClick }: { plants: Planta[], onPlantClick: (p: Planta) => void }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const isHorizontal = window.innerWidth <= 900;
      const scrollAmount = isHorizontal ? window.innerWidth * 0.2 : window.innerHeight * 0.2;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        containerRef.current.scrollBy({
          top: isHorizontal ? 0 : scrollAmount,
          left: isHorizontal ? scrollAmount : 0,
          behavior: 'smooth'
        });
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        containerRef.current.scrollBy({
          top: isHorizontal ? 0 : -scrollAmount,
          left: isHorizontal ? -scrollAmount : 0,
          behavior: 'smooth'
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !itemsRef.current || !indicatorRef.current || !previewRef.current) return;
    if (plants.length === 0) return;

    let isHorizontal = window.innerWidth < 1024;
    let dimensions = { itemSize: 0, containerSize: 0, indicatorSize: 0 };
    let maxTranslate = 0;
    let currentTranslate = 0;
    let targetTranslate = 0;
    let animationFrameId: number;
    let touchStartY = 0;

    const items = itemsRef.current;
    const indicator = indicatorRef.current;
    const container = containerRef.current;
    const previewImage = previewRef.current;
    const itemElements = Array.from(items.querySelectorAll('.mm-item')) as HTMLElement[];

    function lerp(start: number, end: number, factor: number) {
        return start + (end - start) * factor;
    }

    function updateDimensions() {
        if (!itemElements[0] || !items || !indicator) return dimensions;
        return {
            itemSize: isHorizontal
                ? itemElements[0].getBoundingClientRect().width
                : itemElements[0].getBoundingClientRect().height,
            containerSize: isHorizontal
                ? items.scrollWidth
                : items.getBoundingClientRect().height,
            indicatorSize: isHorizontal
                ? indicator.getBoundingClientRect().width
                : indicator.getBoundingClientRect().height,
        };
    }

    function getItemInIndicator() {
        const indicatorRect = indicator.getBoundingClientRect();
        const indicatorCenter = isHorizontal
            ? indicatorRect.left + indicatorRect.width / 2
            : indicatorRect.top + indicatorRect.height / 2;

        let closestIndex = 0;
        let minDistance = Infinity;

        itemElements.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = isHorizontal
                ? itemRect.left + itemRect.width / 2
                : itemRect.top + itemRect.height / 2;

            const distance = Math.abs(indicatorCenter - itemCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        return closestIndex;
    }

    function updatePreviewImage(index: number) {
        if (activeIndexRef.current !== index) {
            activeIndexRef.current = index;
            setActiveIndex(index);
            const targetItem = itemElements[index]?.querySelector("img");
            if(targetItem) {
                const targetSrc = targetItem.getAttribute("data-full-src");
                if (targetSrc) {
                    previewImage.setAttribute("src", targetSrc);
                }
            }
        }
    }

    function animate() {
        currentTranslate = lerp(currentTranslate, targetTranslate, 0.1);

        const transform = isHorizontal
            ? `translateX(${currentTranslate}px)`
            : `translateY(${currentTranslate}px)`;
        items.style.transform = transform;

        const activeIndex = getItemInIndicator();
        updatePreviewImage(activeIndex);
        
        itemElements.forEach((item, index) => {
            const img = item.querySelector("img");
            if (img) {
                img.style.opacity = index === activeIndex ? "1" : "0.3";
            }
        });

        animationFrameId = requestAnimationFrame(animate);
    }

    dimensions = updateDimensions();
    maxTranslate = Math.max(0, (plants.length - 1) * dimensions.itemSize);
    targetTranslate = 0;
    currentTranslate = 0;

    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY;
        const scrollVelocity = Math.min(Math.max(delta * 0.5, -20), 20);
        targetTranslate = Math.min(
            Math.max(targetTranslate - scrollVelocity, -maxTranslate),
            0
        );
    };

    const handleTouchStart = (e: TouchEvent) => {
        if (isHorizontal) {
            touchStartY = e.touches[0].clientX;
        } else {
            touchStartY = e.touches[0].clientY;
        }
    };

    const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        const touchY = isHorizontal ? e.touches[0].clientX : e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        const scrollVelocity = Math.min(Math.max(deltaY * 0.5, -20), 20);

        targetTranslate = Math.min(
            Math.max(targetTranslate - scrollVelocity, -maxTranslate),
            0
        );
    };

    const handleResize = () => {
        isHorizontal = window.innerWidth < 1024;
        dimensions = updateDimensions();
        maxTranslate = Math.max(0, (plants.length - 1) * dimensions.itemSize);

        targetTranslate = Math.min(Math.max(targetTranslate, -maxTranslate), 0);
        currentTranslate = targetTranslate;

        const transform = isHorizontal
            ? `translateX(${currentTranslate}px)`
            : `translateY(${currentTranslate}px)`;
        items.style.transform = transform;
    };

    const handleItemClick = (index: number) => {
        targetTranslate = -index * dimensions.itemSize + (dimensions.indicatorSize - dimensions.itemSize) / 2;
        targetTranslate = Math.max(Math.min(targetTranslate, 0), -maxTranslate);
    };

    itemElements.forEach((item, index) => {
        item.addEventListener("click", () => handleItemClick(index));
    });

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("resize", handleResize);

    updatePreviewImage(0);
    animate();

    return () => {
        cancelAnimationFrame(animationFrameId);
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("resize", handleResize);
    };
  }, [plants]);

  const activePlant = plants[activeIndex]

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
    <div className="mm-container" ref={containerRef}>
      {/* Left Info Panel */}
      {activePlant && (
        <div 
          key={`info-${activePlant._id}`}
          className="absolute inset-x-0 lg:left-[8rem] lg:right-auto top-[6%] lg:top-1/2 bottom-[25vh] lg:bottom-auto lg:-translate-y-1/2 lg:w-[30vw] lg:max-w-[320px] z-20 flex flex-col justify-between lg:justify-center items-center lg:items-start animate-in fade-in duration-500 pointer-events-none lg:pointer-events-auto break-words px-6 lg:px-0"
        >
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="text-[#15803d] dark:text-[#08FF00] border-b-2 border-[#15803d] dark:border-[#08FF00] pb-0.5 text-[10px] lg:text-xs font-bold uppercase tracking-wider mb-2 lg:mb-3 inline-block transition-colors duration-300">
              {activePlant.habito || 'Planta'}
            </span>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground leading-tight italic drop-shadow-md mb-1 lg:mb-2 break-words whitespace-normal w-full transition-colors duration-300">
              {activePlant.nombre_cientifico || 'Especie por identificar'}
            </h2>
            {activePlant.nombres_comunes && (
              <p className="text-muted-foreground font-medium text-xs lg:text-sm mb-0 lg:mb-5 break-words whitespace-normal w-full transition-colors duration-300">
                {activePlant.nombres_comunes}
              </p>
            )}
          </div>
          <div className="pointer-events-auto mt-2 lg:mt-0 w-44">
            <AnimatedButton text="Ficha Técnica" onClick={() => onPlantClick(activePlant)} />
          </div>
        </div>
      )}

      <div className="mm-img-preview" onClick={() => activePlant && onPlantClick(activePlant)}>
        <img 
          ref={previewRef} 
          src={activePlant?.galeria?.[0] ? urlForImage(activePlant.galeria[0]).width(800).auto('format').url() : ''} 
          alt="Vista previa" 
        />
      </div>
      
      <div className="mm-minimap">
        <div className="mm-indicator" ref={indicatorRef}></div>
        <div className="mm-items" ref={itemsRef}>
          {plants.map(p => (
            <div key={p._id} className="mm-item">
              <img 
                src={p.galeria?.[0] ? urlForImage(p.galeria[0]).width(100).height(100).fit('crop').format('webp').url() : ''} 
                data-full-src={p.galeria?.[0] ? urlForImage(p.galeria[0]).width(800).auto('format').url() : ''}
                alt={p.nombre_cientifico || 'Planta'} 
                loading="lazy"
                style={{ background: !p.galeria?.[0] ? 'linear-gradient(135deg, #1a3a2a, #08130D)' : 'none' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
