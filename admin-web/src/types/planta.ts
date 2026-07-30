export type PlantaEstado = 'En revisión' | 'Validado' | 'Observado' | 'Rechazado'

export interface Planta {
  _id: string
  _createdAt: string
  nombre_cientifico?: string
  nombres_comunes?: string
  familia?: string
  origen?: string
  pais_origen?: string
  habito?: string
  tipo_vida?: string
  estado_revision?: PlantaEstado
  motivo_observacion?: string
  autor?: string
  validador?: string
  fecha_revision?: string
  registrador_nombre?: string
  registrador_dni?: string
  registrador_email?: string
  registrador_curso?: string
  registrador_facultad?: string
  registrador_escuela?: string
  registrador_dia_clase?: string
  latitud?: number
  longitud?: number
  distrito?: string
  direccion?: string
  tipo_ubicacion_1?: string
  tipo_ubicacion_2?: string
  numero_casa?: string
  ubicacion_planta?: string
  numero_planta?: string
  galeria?: any[]
  arbol_datos?: any
  palmera_datos?: any
  arbusto_datos?: any
  liana_datos?: any
  hierba_datos?: any
  reproductivo?: any
  estado_fenologico?: string[]
  estado_individuo?: string[]
  valor_ornamental?: string[]
  impacto_urbano?: string[]
}
