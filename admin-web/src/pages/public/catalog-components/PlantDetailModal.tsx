import React, { useRef, useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Leaf, MapPin } from 'lucide-react'
import type { Planta } from '@/types/planta'
import { urlForImage } from '@/lib/sanity'

export function PlantDetailModal({ plant, isOpen, onClose, onShowOnMap }: { plant: Planta | null, isOpen: boolean, onClose: () => void, onShowOnMap: (p: Planta) => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isRendered, setIsRendered] = useState(isOpen)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const lastPlant = useRef(plant)

  if (plant) lastPlant.current = plant
  const currentPlant = plant || lastPlant.current

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true)
      setIsAnimatingOut(false)
    } else if (isRendered) {
      setIsAnimatingOut(true)
      const timer = setTimeout(() => {
        setIsRendered(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen, isRendered])

  if (!isRendered || !currentPlant) return null;

  const scrollLeft = () => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ left: -scrollContainerRef.current.clientWidth, behavior: 'smooth' })
  }
  const scrollRight = () => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ left: scrollContainerRef.current.clientWidth, behavior: 'smooth' })
  }

  return (
    <div 
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 transition-opacity duration-300 ${isAnimatingOut ? 'opacity-0' : 'opacity-100'}`} 
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-5xl h-full max-h-[85vh] bg-card rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative border border-border origin-center ${isAnimatingOut ? 'animate-collapse-y' : 'animate-expand-y'}`}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full transition-colors cursor-pointer z-[9999] modal-close-btn">
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images */}
        <div className="w-full md:w-1/2 h-[40vh] md:h-full bg-black relative group flex-shrink-0">
          {currentPlant.galeria && currentPlant.galeria.length > 0 ? (
            <>
              <div ref={scrollContainerRef} className="w-full h-full relative overflow-x-auto flex snap-x snap-mandatory custom-scrollbar no-scrollbar bg-black touch-pan-x">
                {currentPlant.galeria.map((foto, index) => (
                  <img key={index} src={urlForImage(foto).width(800).auto('format').url()} draggable={false} className="w-full h-full object-contain flex-shrink-0 snap-center select-none" alt="Foto de planta" />
                ))}
              </div>
              
              {currentPlant.galeria.length > 1 && (
                <>
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white z-10 border border-white/10 shadow-lg">
                    {currentPlant.galeria.length} FOTOS
                  </div>
                  <button onClick={scrollLeft} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 dark:bg-white/10 dark:hover:bg-white/30 rounded-full text-white backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all cursor-pointer border border-white/20 z-10">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={scrollRight} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 dark:bg-white/10 dark:hover:bg-white/30 rounded-full text-white backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all cursor-pointer border border-white/20 z-10">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none lg:hidden" />
            </>
          ) : (
             <div className="w-full h-full bg-secondary flex items-center justify-center p-8">
               <div className="text-center">
                 <Leaf className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                 <h2 className="text-xl font-bold text-foreground italic mb-2">Sin foto</h2>
               </div>
             </div>
          )}
          
          {/* Main Title overlay on image for Mobile */}
          <div className="absolute bottom-4 left-6 right-6 z-10 lg:hidden">
            <span className="text-white border-b-2 border-white pb-0.5 text-xs font-bold uppercase tracking-wider mb-2 inline-block drop-shadow-md">
              {currentPlant.habito || 'Planta'}
            </span>
            <h2 className="text-2xl font-bold text-white leading-tight drop-shadow-md">{currentPlant.nombres_comunes || 'Nombre com�n no registrado'}</h2>
            {currentPlant.nombre_cientifico && (<p className="text-white/80 font-medium italic drop-shadow-md">{currentPlant.nombre_cientifico}</p>)}
          </div>
        </div>

        {/* Right Side: Info */}
        <div className="w-full md:w-1/2 flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar relative bg-card">
          
          <div className="hidden md:block border-b border-border pb-4">
              <span className="text-custom-green border-b-2 border-custom-green pb-0.5 text-xs font-bold uppercase tracking-wider mb-3 inline-block">
              {currentPlant.habito || 'Planta'}
            </span>
            <h2 className="text-3xl font-bold text-foreground leading-tight">{currentPlant.nombres_comunes || 'Nombre com�n no registrado'}</h2>
            {currentPlant.nombre_cientifico && (<p className="text-muted-foreground font-medium italic mt-1 text-lg">{currentPlant.nombre_cientifico}</p>)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 rounded-xl p-4 border border-border">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Familia</span>
              <p className="text-foreground font-medium mt-1">{currentPlant.familia || 'No especificada'}</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 border border-border">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Tipo de vida</span>
              <p className="text-foreground font-medium mt-1">{currentPlant.tipo_vida || 'No especificado'}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-custom-green uppercase tracking-wider border-b border-border pb-2">
              Ubicación Registrada
            </h3>
            <p className="text-foreground/80 text-sm leading-relaxed">
              <span className="font-semibold text-foreground">Distrito:</span> {currentPlant.distrito || '—'}<br/>
              <span className="font-semibold text-foreground">Dirección:</span> {currentPlant.direccion || '—'} {currentPlant.numero_casa}<br/>
              <span className="font-semibold text-foreground">Referencia:</span> {currentPlant.ubicacion_planta || '—'}
            </p>
            {currentPlant.latitud && currentPlant.longitud && (
              <button
                onClick={() => onShowOnMap(currentPlant)}
                className="flex items-center gap-1.5 mt-3 text-sm font-bold text-custom-green hover:underline cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                Ver en el mapa interactivo
              </button>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-custom-green uppercase tracking-wider border-b border-border pb-2">
              Evaluación Botánica
            </h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
              {currentPlant.estado_fenologico && currentPlant.estado_fenologico.length > 0 && (
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Fenología</span>
                  <span className="text-foreground text-sm font-medium">{currentPlant.estado_fenologico.join(', ')}</span>
                </div>
              )}
              {currentPlant.estado_individuo && currentPlant.estado_individuo.length > 0 && (
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Estado Individuo</span>
                  <span className="text-foreground text-sm font-medium">{currentPlant.estado_individuo.join(', ')}</span>
                </div>
              )}
              {currentPlant.valor_ornamental && currentPlant.valor_ornamental.length > 0 && (
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Valor Ornamental</span>
                  <span className="text-foreground text-sm font-medium">{currentPlant.valor_ornamental.join(', ')}</span>
                </div>
              )}
              {currentPlant.impacto_urbano && currentPlant.impacto_urbano.length > 0 && (
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Impacto Urbano</span>
                  <span className="text-foreground text-sm font-medium">{currentPlant.impacto_urbano.join(', ')}</span>
                </div>
              )}
              
              {/* Habit specific data */}
              {Object.entries({
                'Árbol': currentPlant.arbol_datos,
                'Palmera': currentPlant.palmera_datos,
                'Arbusto': currentPlant.arbusto_datos,
                'Liana': currentPlant.liana_datos,
                'Hierba': currentPlant.hierba_datos,
              }[currentPlant.habito || ''] || {}).map(([key, value]) => {
                if (!value || value === '' || value === 'Por identificar' || key === '_type') return null;
                const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                return (
                  <div key={key} className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{formattedKey}</span>
                    <span className="text-foreground text-sm font-medium">{String(value)}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Registrado por: {currentPlant.registrador_nombre || 'Anónimo'} • {new Date(currentPlant._createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

