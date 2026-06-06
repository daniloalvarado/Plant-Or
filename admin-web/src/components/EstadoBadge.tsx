import React from 'react'
import { cn } from '@/lib/utils'
import type { PlantaEstado } from '@/types/planta'

const estadoConfig: Record<PlantaEstado, { label: string; className: string }> = {
  'En revisión': { label: 'En revisión', className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  'Validado': { label: 'Validado', className: 'bg-[#1FC451]/10 text-[#1FC451] border-[#1FC451]/20' },
  'Observado': { label: 'Observado', className: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  'Rechazado': { label: 'Rechazado', className: 'bg-red-500/10 text-red-500 border-red-500/20' },
}

interface EstadoBadgeProps {
  estado?: string
  className?: string
}

export function EstadoBadge({ estado, className }: EstadoBadgeProps) {
  const config = estadoConfig[(estado as PlantaEstado)] ?? {
    label: estado || '—',
    className: 'bg-muted text-muted-foreground border-border'
  }

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      config.className,
      className
    )}>
      {config.label}
    </span>
  )
}
