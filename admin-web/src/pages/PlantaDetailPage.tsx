import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { client, urlFor } from '@/lib/sanity'
import type { Planta } from '@/types/planta'
import { EstadoBadge } from '@/components/EstadoBadge'
import { updatePlantaEstado } from '@/hooks/use-plantas'
import {
  ArrowLeft, MapPin, User, Leaf, Camera, CheckCircle,
  AlertCircle, XCircle, Loader2, Eye, ExternalLink
} from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useUser } from '@clerk/clerk-react'
import { toast } from 'sonner'

export default function PlantaDetailPage() {
  const { user } = useUser()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [planta, setPlanta] = useState<Planta | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImg, setSelectedImg] = useState<string | null>(null)
  const [observarOpen, setObservarOpen] = useState(false)
  const [rechazarOpen, setRechazarOpen] = useState(false)
  const [motivoTexto, setMotivoTexto] = useState('')
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    client.fetch(`*[_id == $id][0]`, { id }).then(data => {
      setPlanta(data)
      setLoading(false)
    })
  }, [id])

  const handleAction = async (accion: 'Validado' | 'Observado' | 'Rechazado', motivo?: string) => {
    if (!planta) return
    setActionLoading(true)
    const { emailSent } = await updatePlantaEstado(planta._id, accion, motivo, user?.fullName || 'Desconocido')
    const updated = await client.fetch(`*[_id == $id][0]`, { id: planta._id })
    setPlanta(updated)
    setActionLoading(false)
    setObservarOpen(false)
    setRechazarOpen(false)
    setMotivoTexto('')
    
    if (emailSent === false) {
      toast.error('Error al enviar correo', {
        description: 'La acción fue exitosa, pero no se pudo enviar el correo al estudiante (Error de red o falta de créditos).',
        duration: 5000,
      });
    } else {
      toast.success('¡Acción completada!', {
        description: `La planta fue marcada como ${accion.toLowerCase()} y el estudiante fue notificado.`,
        duration: 4000,
      });
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  if (!planta) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <p className="text-muted-foreground">Registro no encontrado.</p>
        <button onClick={() => navigate(-1)} className="text-primary text-sm hover:underline">Volver</button>
      </div>
    )
  }

  const images = planta.galeria || []

  const InfoRow = ({ label, value }: { label: string; value?: string | number | null }) => (
    value ? (
      <div className="flex justify-between py-1.5 border-b border-border last:border-0">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-xs text-foreground font-medium text-right max-w-[60%]">{value}</span>
      </div>
    ) : null
  )

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  )

  const habitoDatos = planta.habito === 'Árbol' ? planta.arbol_datos
    : planta.habito === 'Palmera' ? planta.palmera_datos
    : planta.habito === 'Arbusto' ? planta.arbusto_datos
    : planta.habito === 'Liana' ? planta.liana_datos
    : planta.habito === 'Hierba' ? planta.hierba_datos : null

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back + Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
          <h1 className="text-2xl font-bold text-foreground italic">
            {planta.nombre_cientifico || 'Sin nombre científico'}
          </h1>
          {planta.nombres_comunes && (
            <p className="text-muted-foreground">{planta.nombres_comunes}</p>
          )}
          <div className="mt-2 text-xs font-mono bg-white/5 border border-white/10 px-2 py-1 rounded inline-block text-zinc-400">
            Cód: {planta._id}
          </div>
        </div>
        <EstadoBadge estado={planta.estado_revision} className="mt-7" />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleAction('Validado')}
          disabled={actionLoading || planta.estado_revision === 'Validado'}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-[#1FC451]/10 text-[#1FC451] border border-[#1FC451]/20 hover:bg-[#1FC451]/20 transition-colors disabled:opacity-40"
        >
          {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
          Aprobar
        </button>
        <button
          onClick={() => setObservarOpen(true)}
          disabled={actionLoading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-colors disabled:opacity-40"
        >
          <AlertCircle className="w-4 h-4" />
          Observar
        </button>
        <button
          onClick={() => setRechazarOpen(true)}
          disabled={actionLoading || planta.estado_revision === 'Rechazado'}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors disabled:opacity-40"
        >
          <XCircle className="w-4 h-4" />
          Rechazar
        </button>
      </div>

      {/* Observation or Rejection notice */}
      {(planta.estado_revision === 'Observado' || planta.estado_revision === 'Rechazado') && planta.motivo_observacion && (
        <div className={`border rounded-xl p-4 ${planta.estado_revision === 'Observado' ? 'bg-orange-500/10 border-orange-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
          <div className="flex items-start gap-2">
            {planta.estado_revision === 'Observado' ? (
              <AlertCircle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            )}
            <div>
              <p className={`text-sm font-medium ${planta.estado_revision === 'Observado' ? 'text-orange-400' : 'text-red-500'}`}>
                Motivo de {planta.estado_revision.toLowerCase()} enviado al estudiante:
              </p>
              <p className="text-sm text-foreground mt-1">{planta.motivo_observacion}</p>
            </div>
          </div>
        </div>
      )}

      {/* Validation Log */}
      {planta.validador && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              Acción realizada por <span className="text-primary">{planta.validador}</span>
            </p>
            {planta.fecha_revision && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {format(new Date(planta.fecha_revision), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Photos */}
          {images.length > 0 && (
            <Section title="Fotografías">
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {images.map((img, i) => {
                  const imgUrl = urlFor(img)
                  const labels = ['Planta completa', 'Hoja', 'Flor', 'Fruto', 'Semilla']
                  return (
                    <div
                      key={i}
                      className="relative group cursor-pointer"
                      onClick={() => setSelectedImg(imgUrl)}
                    >
                      <img
                        src={imgUrl}
                        alt={labels[i] || `Foto ${i + 1}`}
                        className="w-full aspect-square object-cover rounded-lg border border-border hover:border-primary transition-colors"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 text-center truncate">{labels[i] || ''}</p>
                    </div>
                  )
                })}
              </div>
            </Section>
          )}

          {/* Botanical Data */}
          {habitoDatos && (
            <Section title={`Datos de ${planta.habito}`}>
              <div className="grid grid-cols-2 gap-x-6">
                {Object.entries(habitoDatos).map(([k, v]) => (
                  <InfoRow key={k} label={k.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} value={Array.isArray(v) ? v.join(', ') : String(v)} />
                ))}
              </div>
            </Section>
          )}

          {/* Reproductive Data */}
          {planta.reproductivo && Object.keys(planta.reproductivo).length > 0 && (
            <Section title="Datos Reproductivos">
              <div className="grid grid-cols-2 gap-x-6">
                {Object.entries(planta.reproductivo).map(([k, v]) => (
                  <InfoRow key={k} label={k.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} value={Array.isArray(v) ? v.join(', ') : String(v)} />
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Personal Data */}
          <Section title="Datos del Estudiante">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{planta.registrador_nombre || '—'}</p>
                <p className="text-xs text-muted-foreground">{planta.registrador_email || ''}</p>
              </div>
            </div>
            <InfoRow label="DNI" value={planta.registrador_dni} />
            <InfoRow label="Curso" value={planta.registrador_curso} />
            <InfoRow label="Facultad" value={planta.registrador_facultad} />
            <InfoRow label="Escuela" value={planta.registrador_escuela} />
            <InfoRow label="Día de clase" value={planta.registrador_dia_clase} />
            <InfoRow label="N° planta" value={planta.numero_planta ? `${planta.numero_planta} de 20` : undefined} />
            {planta._createdAt && (
              <InfoRow label="Registrado" value={format(new Date(planta._createdAt), "dd MMM yyyy, HH:mm", { locale: es })} />
            )}
          </Section>

          {/* Identification */}
          <Section title="Identificación Botánica">
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">{planta.habito || '—'}</span>
            </div>
            <InfoRow label="Familia" value={planta.familia} />
            <InfoRow label="Tipo de vida" value={planta.tipo_vida} />
            {planta.estado_fenologico?.length ? <InfoRow label="Estado fenológico" value={planta.estado_fenologico.join(', ')} /> : null}
            {planta.valor_ornamental?.length ? <InfoRow label="Valor ornamental" value={planta.valor_ornamental.join(', ')} /> : null}
            {planta.impacto_urbano?.length ? <InfoRow label="Impacto urbano" value={planta.impacto_urbano.join(', ')} /> : null}
          </Section>

          {/* Location */}
          <Section title="Ubicación">
            <div className="flex items-start gap-2 mb-3">
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">{planta.direccion || 'Sin dirección'}</p>
            </div>
            {planta.estado_revision === 'Validado' && planta.distrito && (
              <InfoRow label="Distrito" value={planta.distrito} />
            )}
            <InfoRow label="Tipo ubicación 1" value={planta.tipo_ubicacion_1} />
            <InfoRow label="Tipo ubicación 2" value={planta.tipo_ubicacion_2} />
            <InfoRow label="N° de casa" value={planta.numero_casa} />
            <InfoRow label="Sustrato" value={planta.ubicacion_planta} />
            {planta.latitud && planta.longitud && (
              <a
                href={`https://www.google.com/maps?q=${planta.latitud},${planta.longitud}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 mt-3 text-xs text-primary hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
                Ver en Google Maps
              </a>
            )}
          </Section>
        </div>
      </div>

      {/* Image Lightbox */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <img src={selectedImg} alt="Vista ampliada" className="max-w-full max-h-full rounded-xl object-contain" />
        </div>
      )}

      {/* Observar Modal */}
      {observarOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#0A0A0A] border border-zinc-800 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <div>
              <h3 className="text-xl font-bold text-[#F97316]">Observar Registro</h3>
              <p className="text-sm text-zinc-400 mt-1">El estudiante verá este mensaje en su aplicación móvil para poder corregirlo.</p>
            </div>
            <textarea
              value={motivoTexto}
              onChange={e => setMotivoTexto(e.target.value)}
              placeholder="Describe lo que falta o debe corregirse (ej. 'La foto de la hoja está borrosa')..."
              rows={4}
              className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] resize-none transition-all"
            />
            <div className="flex gap-3 justify-end pt-2">
              <button onClick={() => setObservarOpen(false)} className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">Cancelar</button>
              <button
                onClick={() => handleAction('Observado', motivoTexto)}
                disabled={!motivoTexto.trim() || actionLoading}
                className="px-5 py-2 text-sm bg-[#c2410c] text-white font-bold rounded-lg hover:bg-[#9a3412] shadow-[0_0_15px_rgba(194,65,12,0.3)] transition-all disabled:opacity-50"
              >
                {actionLoading ? 'Enviando...' : 'Enviar Observación'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rechazar Modal */}
      {rechazarOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#0A0A0A] border border-zinc-800 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <div>
              <h3 className="text-xl font-bold text-red-600">¿Rechazar Registro?</h3>
              <p className="text-sm text-zinc-400 mt-1">El estudiante verá el motivo del rechazo en su aplicación móvil.</p>
            </div>
            <textarea
              value={motivoTexto}
              onChange={e => setMotivoTexto(e.target.value)}
              placeholder="Describe por qué se rechaza este registro de forma definitiva..."
              rows={4}
              className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 resize-none transition-all"
            />
            <div className="flex gap-3 justify-end pt-2">
              <button onClick={() => setRechazarOpen(false)} className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">Cancelar</button>
              <button
                onClick={() => handleAction('Rechazado', motivoTexto)}
                disabled={!motivoTexto.trim() || actionLoading}
                className="px-5 py-2 text-sm bg-[#991b1b] text-white font-bold rounded-lg hover:bg-[#7f1d1d] shadow-[0_0_15px_rgba(153,27,27,0.3)] transition-all disabled:opacity-50"
              >
                {actionLoading ? 'Rechazando...' : 'Rechazar Registro'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
