import React from 'react'
import { Trees, TreePine, Leaf, Flower2, Sprout, Bean, Wheat, Droplets, MountainSnow, Palmtree, HelpCircle } from 'lucide-react'

interface FloraIconProps {
  name?: string
  className?: string
}

export const FLORA_ICONS = [
  { value: 'tree', label: 'Árbol' },
  { value: 'tree-outline', label: 'Árbol (Contorno)' },
  { value: 'pine-tree', label: 'Pino' },
  { value: 'pine-tree-box', label: 'Pino (Caja)' },
  { value: 'leaf', label: 'Hoja' },
  { value: 'leaf-maple', label: 'Hoja de Arce' },
  { value: 'flower', label: 'Flor' },
  { value: 'flower-outline', label: 'Flor (Contorno)' },
  { value: 'flower-tulip', label: 'Tulipán' },
  { value: 'sprout', label: 'Brote' },
  { value: 'sprout-outline', label: 'Brote (Contorno)' },
  { value: 'seed', label: 'Semilla' },
  { value: 'seed-outline', label: 'Semilla (Contorno)' },
  { value: 'grass', label: 'Pasto' },
  { value: 'mushroom', label: 'Hongo' },
  { value: 'mushroom-outline', label: 'Hongo (Contorno)' },
  { value: 'water', label: 'Agua' },
  { value: 'water-outline', label: 'Agua (Contorno)' },
  { value: 'nature', label: 'Naturaleza' },
  { value: 'palm-tree', label: 'Palmera' }
]

export function FloraIcon({ name, className = "w-4 h-4" }: FloraIconProps) {
  if (!name) return null

  switch (name) {
    case 'tree':
    case 'tree-outline':
      return <Trees className={className} />
    case 'pine-tree':
    case 'pine-tree-box':
      return <TreePine className={className} />
    case 'leaf':
    case 'leaf-maple':
      return <Leaf className={className} />
    case 'flower':
    case 'flower-outline':
    case 'flower-tulip':
      return <Flower2 className={className} />
    case 'sprout':
    case 'sprout-outline':
      return <Sprout className={className} />
    case 'seed':
    case 'seed-outline':
      return <Bean className={className} />
    case 'grass':
      return <Wheat className={className} />
    case 'water':
    case 'water-outline':
      return <Droplets className={className} />
    case 'nature':
      return <MountainSnow className={className} />
    case 'palm-tree':
      return <Palmtree className={className} />
    default:
      return <HelpCircle className={className} />
  }
}
