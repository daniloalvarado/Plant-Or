import React, { useState, useEffect } from 'react'
import { usePlantas, updatePlantaEstado, deletePlanta } from '@/hooks/use-plantas'
import { EstadoBadge } from '@/components/EstadoBadge'
import { Leaf, Search, Eye, CheckCircle, AlertCircle, XCircle, ChevronDown, ChevronUp, ChevronsUpDown, Filter, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom'
import { CustomSelect } from '@/components/CustomSelect'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useUser } from '@clerk/clerk-react'
import type { Planta } from '@/types/planta'
import { ValidacionModal } from '@/components/ValidacionModal'
import { DeleteModal } from '@/components/DeleteModal'
import { cn } from '@/lib/utils'

interface ValidacionesPageProps {
  filtroEstado?: string
}

export default function ValidacionesPage({ filtroEstado }: ValidacionesPageProps) {
  const { user } = useUser()
  const role = user?.publicMetadata?.role as string | undefined
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
  const [eliminarId, setEliminarId] = useState<string | null>(null)
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [search, filterEstado, filterHabito, sortField, sortDir])

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

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const SortIcon = ({ field }: { field: keyof Planta }) => {
    if (sortField !== field) return <ChevronsUpDown className="w-3 h-3 text-muted-foreground ml-1" />
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-muted-foreground ml-1" />
      : <ChevronDown className="w-3 h-3 text-muted-foreground ml-1" />
  }

  const confirmarEliminar = async () => {
    if (!eliminarId) return;
    try {
      setLoadingAction(eliminarId + '-eliminar')
      await deletePlanta(eliminarId)
      refetch()
    } catch (error) {
      console.error(error)
      alert('Error al eliminar el registro')
    } finally {
      setLoadingAction(null)
      setEliminarId(null)
    }
  }

  const handleAprobar = async (id: string) => {
    setLoadingAction(id + '-aprobar')
    await updatePlantaEstado(id, 'Validado', '', docenteName)
    await refetch()
    setLoadingAction(null)
    window.dispatchEvent(new Event('plant-validated'))
  }

  const handleRechazar = async (motivo: string) => {
    if (!rechazarId || !motivo.trim()) return
    setLoadingAction(rechazarId + '-rechazar')
    await updatePlantaEstado(rechazarId, 'Rechazado', motivo.trim(), docenteName)
    await refetch()
    setRechazarId(null)
    setLoadingAction(null)
    window.dispatchEvent(new Event('plant-validated'))
  }

  const handleObservar = async (motivo: string) => {
    if (!observarId || !motivo.trim()) return
    setLoadingAction(observarId + '-observar')
    await updatePlantaEstado(observarId, 'Observado', motivo.trim(), docenteName)
    await refetch()
    setObservarId(null)
    setLoadingAction(null)
    window.dispatchEvent(new Event('plant-validated'))
  }

  const habitosUnicos = [...new Set(plantas.map(p => p.habito).filter(Boolean))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cascade-container">
        <div className="cascade-container">
          <h1 className="text-3xl font-bold text-foreground cascade-item">
            {filtroEstado === 'Validado' ? 'Registros Aprobados' : 'Bandeja de Validación'}
          </h1>
          <p className="text-muted-foreground mt-1 cascade-item delay-1">
            {filtered.length} registro{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4 cascade-container">
        <div className="flex gap-3 cascade-container">
          <div className="relative flex-1 cascade-item delay-2">
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
            className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-accent transition-colors cursor-pointer cascade-item delay-3"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filtros</span>
          </button>
        </div>

        <div 
          className={cn(
            "flex flex-wrap items-center gap-3 transition-all duration-300",
            showFilters ? "max-h-[200px] pt-2 opacity-100 visible" : "max-h-0 opacity-0 invisible m-0 p-0"
          )}
        >
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
              <tbody className="cascade-container">
                {paginatedData.map((p) => (
                  <tr
                    key={p._id}
                    className="border-b border-border hover:bg-secondary/20 transition-colors group cascade-item"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{p.nombres_comunes || 'Nombre com�n no registrado'}</p>
                      {p.nombre_cientifico && <p className="text-xs text-muted-foreground italic">{p.nombre_cientifico}</p>}
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
                            onClick={() => navigate(`/admin/planta/${p._id}`)}
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
                        
                        {role === 'admin' && (
                          <div className="relative group/tooltip">
                            <button
                              onClick={() => setEliminarId(p._id)}
                              disabled={loadingAction === p._id + '-eliminar'}
                              className="p-1.5 rounded-lg hover:bg-red-500/20 text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-50 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover text-red-500 text-xs font-bold rounded border border-red-500/30 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                              Eliminar
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
            
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/5">
                <span className="text-sm text-muted-foreground">
                  Página <span className="font-medium text-foreground">{currentPage}</span> de <span className="font-medium text-foreground">{totalPages}</span>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-secondary text-foreground text-sm rounded-md hover:bg-accent disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-secondary text-foreground text-sm rounded-md hover:bg-accent disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modales Unificados */}
      <ValidacionModal
        isOpen={!!observarId}
        tipo="observar"
        loading={!!loadingAction}
        onClose={() => setObservarId(null)}
        onSubmit={(motivo) => {
          if (observarId) handleObservar(motivo);
        }}
      />
      <ValidacionModal
        isOpen={!!rechazarId}
        tipo="rechazar"
        loading={!!loadingAction}
        onClose={() => setRechazarId(null)}
        onSubmit={(motivo) => {
          if (rechazarId) handleRechazar(motivo);
        }}
      />
      <DeleteModal
        isOpen={!!eliminarId}
        loading={!!loadingAction}
        onClose={() => setEliminarId(null)}
        onConfirm={confirmarEliminar}
      />
    </div>
  )
}
