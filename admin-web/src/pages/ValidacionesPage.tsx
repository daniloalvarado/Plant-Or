import React, { useState } from 'react'
import { usePlantas, updatePlantaEstado } from '@/hooks/use-plantas'
import { EstadoBadge } from '@/components/EstadoBadge'
import { Leaf, Search, Eye, CheckCircle, AlertCircle, XCircle, ChevronDown, ChevronUp, ChevronsUpDown, Filter } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom'
import { CustomSelect } from '@/components/CustomSelect'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useUser } from '@clerk/clerk-react'
import type { Planta } from '@/types/planta'

interface ValidacionesPageProps {
  filtroEstado?: string
}

export default function ValidacionesPage({ filtroEstado }: ValidacionesPageProps) {
  const { user } = useUser()
  const docenteName = user?.fullName || user?.primaryEmailAddress?.emailAddress || 'Docente'
  const { plantas, loading, refetch } = usePlantas()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filterEstado, setFilterEstado] = useState(filtroEstado || '')
  const [filterHabito, setFilterHabito] = useState('')
  const [sortField, setSortField] = useState<keyof Planta>('_createdAt')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [observarId, setObservarId] = useState<string | null>(null)
  const [rechazarId, setRechazarId] = useState<string | null>(null)
  const [motivoTexto, setMotivoTexto] = useState('')
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const handleSort = (field: keyof Planta) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('asc') }
  }

  const filtered = plantas
    .filter(p => {
      const q = search.toLowerCase()
      const matchSearch = !q || [p.nombre_cientifico, p.nombres_comunes, p.registrador_nombre, p.registrador_curso]
        .some(v => v?.toLowerCase().includes(q))
      const matchEstado = !filterEstado || p.estado_revision === filterEstado
      const matchHabito = !filterHabito || p.habito === filterHabito
      return matchSearch && matchEstado && matchHabito
    })
    .sort((a, b) => {
      const av = (a as any)[sortField] ?? ''
      const bv = (b as any)[sortField] ?? ''
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    })

  const SortIcon = ({ field }: { field: keyof Planta }) => {
    if (sortField !== field) return <ChevronsUpDown className="w-3 h-3 text-muted-foreground ml-1" />
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-primary ml-1" />
      : <ChevronDown className="w-3 h-3 text-primary ml-1" />
  }

  const handleAprobar = async (id: string) => {
    setLoadingAction(id + '-aprobar')
    await updatePlantaEstado(id, 'Validado', '', docenteName)
    await refetch()
    setLoadingAction(null)
  }

  const handleRechazar = async () => {
    if (!rechazarId || !motivoTexto.trim()) return
    setLoadingAction(rechazarId + '-rechazar')
    await updatePlantaEstado(rechazarId, 'Rechazado', motivoTexto.trim(), docenteName)
    await refetch()
    setRechazarId(null)
    setMotivoTexto('')
    setLoadingAction(null)
  }

  const handleObservar = async () => {
    if (!observarId || !motivoTexto.trim()) return
    setLoadingAction(observarId + '-observar')
    await updatePlantaEstado(observarId, 'Observado', motivoTexto.trim(), docenteName)
    await refetch()
    setObservarId(null)
    setMotivoTexto('')
    setLoadingAction(null)
  }

  const habitosUnicos = [...new Set(plantas.map(p => p.habito).filter(Boolean))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {filtroEstado === 'Validado' ? 'Registros Aprobados' : 'Bandeja de Validación'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {filtered.length} registro{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre, estudiante, curso..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-accent transition-colors cursor-pointer"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filtros</span>
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <CustomSelect
              value={filterEstado}
              onChange={setFilterEstado}
              options={[
                { value: '', label: 'Todos los estados' },
                { value: 'En revisión', label: 'En revisión' },
                { value: 'Validado', label: 'Validado' },
                { value: 'Observado', label: 'Observado' },
                { value: 'Rechazado', label: 'Rechazado' }
              ]}
            />
            <CustomSelect
              value={filterHabito}
              onChange={setFilterHabito}
              options={[
                { value: '', label: 'Todos los hábitos' },
                ...habitosUnicos.map(h => ({ value: h, label: h }))
              ]}
            />
            <button
              onClick={() => { setFilterEstado(''); setFilterHabito(''); setSearch('') }}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Limpiar
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  {[
                    { label: 'Planta', field: 'nombre_cientifico' as keyof Planta },
                    { label: 'Hábito', field: 'habito' as keyof Planta },
                    { label: 'Estudiante', field: 'registrador_nombre' as keyof Planta },
                    { label: 'Curso', field: 'registrador_curso' as keyof Planta },
                    { label: 'Fecha', field: '_createdAt' as keyof Planta },
                    { label: 'Estado', field: 'estado_revision' as keyof Planta },
                  ].map(col => (
                    <th
                      key={col.field}
                      onClick={() => handleSort(col.field)}
                      className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                    >
                      <div className="flex items-center">
                        {col.label}
                        <SortIcon field={col.field} />
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr
                    key={p._id}
                    className="border-b border-border hover:bg-secondary/20 transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground italic">{p.nombre_cientifico || '—'}</p>
                      <p className="text-xs text-muted-foreground">{p.nombres_comunes || ''}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.habito || '—'}</td>
                    <td className="px-4 py-3">
                      <p className="text-foreground">{p.registrador_nombre || '—'}</p>
                      <p className="text-xs text-muted-foreground">{p.registrador_dni || ''}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{p.registrador_curso || '—'}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {p._createdAt ? format(new Date(p._createdAt), 'dd/MM/yy', { locale: es }) : '—'}
                    </td>
                    <td className="px-4 py-3"><EstadoBadge estado={p.estado_revision} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <div className="relative group/tooltip">
                          <button
                            onClick={() => navigate(`/planta/${p._id}`)}
                            className="p-1.5 rounded-lg hover:bg-[#1FC451]/10 text-muted-foreground hover:text-[#1FC451] transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#12221A] text-[#1FC451] text-xs rounded border border-[#1FC451]/30 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                            Ver detalle
                          </span>
                        </div>
                        
                        {p.estado_revision !== 'Validado' && (
                          <div className="relative group/tooltip">
                            <button
                              onClick={() => handleAprobar(p._id)}
                              disabled={loadingAction === p._id + '-aprobar'}
                              className="p-1.5 rounded-lg hover:bg-[#1FC451]/10 text-muted-foreground hover:text-[#1FC451] transition-colors disabled:opacity-50 cursor-pointer"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover text-[#1FC451] text-xs font-bold rounded border border-[#1FC451]/30 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                              Aprobar
                            </span>
                          </div>
                        )}
                        
                        {p.estado_revision !== 'Observado' && p.estado_revision !== 'Rechazado' && (
                          <div className="relative group/tooltip">
                            <button
                              onClick={() => setObservarId(p._id)}
                              className="p-1.5 rounded-lg hover:bg-orange-500/10 text-muted-foreground hover:text-orange-400 transition-colors cursor-pointer"
                            >
                              <AlertCircle className="w-4 h-4" />
                            </button>
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover text-orange-400 text-xs font-bold rounded border border-orange-500/30 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                              Observar
                            </span>
                          </div>
                        )}
                        
                        {p.estado_revision !== 'Rechazado' && (
                          <div className="relative group/tooltip">
                            <button
                              onClick={() => setRechazarId(p._id)}
                              disabled={loadingAction === p._id + '-rechazar'}
                              className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-50 cursor-pointer"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover text-red-500 text-xs font-bold rounded border border-red-500/30 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                              Rechazar
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                <Leaf className="w-8 h-8 mb-2 opacity-30" />
                <p className="text-sm">No hay registros que coincidan</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Observar Modal */}
      {observarId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <div>
              <h3 className="text-xl font-bold text-[#F97316]">Observar Registro</h3>
              <p className="text-sm text-muted-foreground mt-1">El estudiante verá este mensaje en su aplicación móvil para poder corregirlo.</p>
            </div>
            <textarea
              value={motivoTexto}
              onChange={e => setMotivoTexto(e.target.value)}
              placeholder="Describe lo que falta o debe corregirse (ej. 'La foto de la hoja está borrosa')..."
              rows={4}
              className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] resize-none transition-all"
            />
            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => { setObservarId(null); setMotivoTexto('') }}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleObservar}
                disabled={!motivoTexto.trim() || !!loadingAction}
                className="px-5 py-2 text-sm bg-[#c2410c] text-white font-bold rounded-lg hover:bg-[#9a3412] shadow-[0_0_15px_rgba(194,65,12,0.3)] transition-all disabled:opacity-50 cursor-pointer"
              >
                {loadingAction ? 'Enviando...' : 'Enviar Observación'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rechazar Modal */}
      {rechazarId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <div>
              <h3 className="text-xl font-bold text-red-600">¿Rechazar Registro?</h3>
              <p className="text-sm text-muted-foreground mt-1">El estudiante verá el motivo del rechazo en su aplicación móvil.</p>
            </div>
            <textarea
              value={motivoTexto}
              onChange={e => setMotivoTexto(e.target.value)}
              placeholder="Describe por qué se rechaza este registro de forma definitiva..."
              rows={4}
              className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 resize-none transition-all"
            />
            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => { setRechazarId(null); setMotivoTexto('') }}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleRechazar}
                disabled={!motivoTexto.trim() || !!loadingAction}
                className="px-5 py-2 text-sm bg-[#991b1b] text-white font-bold rounded-lg hover:bg-[#7f1d1d] shadow-[0_0_15px_rgba(153,27,27,0.3)] transition-all disabled:opacity-50 cursor-pointer"
              >
                {loadingAction ? 'Rechazando...' : 'Rechazar Registro'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
