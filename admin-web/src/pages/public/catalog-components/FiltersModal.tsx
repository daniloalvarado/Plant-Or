import React, { useState, useEffect } from 'react'
import { Filter, X, CheckCircle2 } from 'lucide-react'
import { FloraIcon } from '@/components/FloraIcon'

interface FiltersModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: () => void
  sanityFiltros: any[]
  activeFilters: Record<string, string[]>
  setActiveFilters: React.Dispatch<React.SetStateAction<Record<string, string[]>>>
}

export function FiltersModal({ isOpen, onClose, onApply, sanityFiltros, activeFilters, setActiveFilters }: FiltersModalProps) {
  const [isRendered, setIsRendered] = useState(isOpen)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true)
      setIsClosing(false)
    } else if (isRendered) {
      setIsClosing(true)
      const timer = setTimeout(() => {
        setIsRendered(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen, isRendered])

  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md p-4">
      <div className={`bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl ${isClosing ? 'modal-scale-y-out' : 'modal-scale-y-in'}`}>
        <div className="p-5 border-b border-border flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
            <Filter className="w-5 h-5 text-brand-green" />
            Filtros Dinámicos
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors cursor-pointer text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
          {Object.entries(
            sanityFiltros.reduce((acc: any, curr: any) => {
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
                          ? 'bg-brand-green/10 border-brand-green/50 text-brand-green' 
                          : 'bg-secondary/50 border-border text-foreground hover:bg-secondary'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-brand-green bg-brand-green' : 'border-muted-foreground/30'}`}>
                        {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm font-medium leading-tight truncate flex items-center gap-1.5">
                        {filtro.icono && <FloraIcon name={filtro.icono} className="w-4 h-4 flex-shrink-0" />}
                        <span className="truncate">{filtro.nombre_filtro}</span>
                      </span>
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
            onClick={onApply}
            className="px-6 py-2.5 bg-brand-green hover:bg-[#19a343] text-white font-bold rounded-lg transition-colors cursor-pointer shadow-none"
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  )
}
