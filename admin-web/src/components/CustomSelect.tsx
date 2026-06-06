import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
  className?: string
}

export function CustomSelect({ value, onChange, options, placeholder = 'Seleccionar...', className }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(o => o.value === value)

  return (
    <div className={cn("relative min-w-[200px]", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground hover:bg-secondary/50 focus:outline-none focus:ring-1 focus:ring-[#15803d] dark:focus:ring-primary focus:border-[#15803d] dark:focus:border-primary transition-colors cursor-pointer"
      >
        <span className={cn("truncate", !selectedOption && "text-muted-foreground")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      <div 
        className={cn(
          "absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-2xl overflow-hidden transition-all duration-200",
          isOpen 
            ? "opacity-100 translate-y-0 visible pointer-events-auto" 
            : "opacity-0 -translate-y-2 invisible pointer-events-none"
        )}
      >
        <ul className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={cn(
                "flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors",
                value === option.value
                  ? "bg-[#15803d]/10 dark:bg-primary/10 text-[#15803d] dark:text-primary font-medium"
                  : "text-foreground hover:bg-secondary"
              )}
            >
              <span className="truncate">{option.label}</span>
              {value === option.value && <Check className="w-4 h-4 flex-shrink-0" />}
            </li>
          ))}
          {options.length === 0 && (
            <li className="px-3 py-2 text-sm text-muted-foreground text-center">Sin opciones</li>
          )}
        </ul>
      </div>
    </div>
  )
}
