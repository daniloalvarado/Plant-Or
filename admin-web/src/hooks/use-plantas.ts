import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'
import type { Planta } from '@/types/planta'
import { sendStatusEmail } from '@/lib/email-service'

const PLANTAS_QUERY = `*[_type == "planta" && !(_id in path("drafts.**"))] | order(_createdAt desc) {
  _id, _createdAt,
  nombre_cientifico, nombres_comunes, familia, habito, tipo_vida,
  estado_revision, motivo_observacion, autor, validador, fecha_revision,
  registrador_nombre, registrador_dni, registrador_email, registrador_curso,
  registrador_facultad, registrador_escuela, registrador_dia_clase,
  latitud, longitud, distrito, direccion, tipo_ubicacion_1, tipo_ubicacion_2,
  numero_casa, ubicacion_planta, numero_planta,
  galeria, arbol_datos, palmera_datos, arbusto_datos, liana_datos, hierba_datos,
  reproductivo, estado_fenologico, estado_individuo, valor_ornamental, impacto_urbano
}`

export function usePlantas() {
  const [plantas, setPlantas] = useState<Planta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPlantas = async () => {
    try {
      setLoading(true)
      const data = await client.fetch(PLANTAS_QUERY)
      setPlantas(data)
    } catch (e) {
      setError('Error al cargar los registros de Sanity.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlantas()
  }, [])

  return { plantas, loading, error, refetch: fetchPlantas }
}

export async function updatePlantaEstado(
  id: string,
  estado: string,
  motivo?: string,
  docenteName?: string
) {
  const patch: any = { 
    estado_revision: estado,
    fecha_revision: new Date().toISOString()
  }
  
  if (motivo) patch.motivo_observacion = motivo
  else patch.motivo_observacion = ''
  
  if (docenteName) patch.validador = docenteName
  
  const result = await client.patch(id).set(patch).commit()
  
  // Enviar email después de actualizar
  let emailSent = false;
  try {
    const doc = await client.fetch(`*[_id == $id][0]`, { id })
    if (doc?.registrador_email) {
      emailSent = await sendStatusEmail(
        doc.registrador_email,
        doc.registrador_nombre || 'Registrador',
        doc.nombres_comunes || doc.nombre_cientifico || 'Tu planta',
        estado,
        motivo,
        docenteName,
        id // codigo_registro
      ) ?? false;
    }
  } catch (e) {
    console.error('Error enviando email:', e)
  }
  
  return { result, emailSent }
}

export async function deletePlanta(id: string) {
  return await client.delete(id)
}
