import React, { useState, useEffect, useCallback } from 'react'
import { client } from '@/lib/sanity'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { SlidersHorizontal, Plus, Trash2, ToggleLeft, ToggleRight, RefreshCw, Filter, BarChart2 } from 'lucide-react'
import { CustomSelect } from '@/components/CustomSelect'

const CATEGORIAS = ['Hábito', 'Tipo de vida', 'Forma', 'Color', 'Tamaño', 'Textura', 'Estructura']

const FLORA_ICONS = [
  { value: 'tree', label: '🌳 Árbol' },
  { value: 'tree-outline', label: '🌳 Árbol (Contorno)' },
  { value: 'pine-tree', label: '🌲 Pino' },
  { value: 'pine-tree-box', label: '🌲 Pino (Caja)' },
  { value: 'leaf', label: '🍃 Hoja' },
  { value: 'leaf-maple', label: '🍁 Hoja de Arce' },
  { value: 'flower', label: '🌸 Flor' },
  { value: 'flower-outline', label: '💮 Flor (Contorno)' },
  { value: 'flower-tulip', label: '🌷 Tulipán' },
  { value: 'sprout', label: '🌱 Brote' },
  { value: 'sprout-outline', label: '🌱 Brote (Contorno)' },
  { value: 'seed', label: '🌰 Semilla' },
  { value: 'seed-outline', label: '🌰 Semilla (Contorno)' },
  { value: 'grass', label: '🌾 Pasto/Hierba' },
  { value: 'mushroom', label: '🍄 Hongo' },
  { value: 'mushroom-outline', label: '🍄 Hongo (Contorno)' },
  { value: 'water', label: '💧 Agua' },
  { value: 'water-outline', label: '💧 Agua (Contorno)' },
  { value: 'nature', label: '🏞️ Naturaleza' },
  { value: 'palm-tree', label: '🌴 Palmera' }
]

const ICON_TO_EMOJI: Record<string, string> = {
  'tree': '🌳', 'tree-outline': '🌳',
  'pine-tree': '🌲', 'pine-tree-box': '🌲',
  'leaf': '🍃', 'leaf-maple': '🍁',
  'flower': '🌸', 'flower-outline': '💮', 'flower-tulip': '🌷',
  'sprout': '🌱', 'sprout-outline': '🌱',
  'seed': '🌰', 'seed-outline': '🌰',
  'grass': '🌾',
  'mushroom': '🍄', 'mushroom-outline': '🍄',
  'water': '💧', 'water-outline': '💧',
  'nature': '🏞️',
  'palm-tree': '🌴'
}

interface Filtro {
  _id: string
  nombre_filtro: string
  categoria: string
  dato_tecnico: string
  icono?: string
  activo: boolean
  tipo_seleccion?: string
  orden?: number
}

const EMPTY_FORM = { nombre_filtro: '', categoria: CATEGORIAS[0], dato_tecnico: '', icono: '', tipo_seleccion: 'Selección única', orden: 1 }

export default function FiltrosPage() {
  const [filtros, setFiltros] = useState<Filtro[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formError, setFormError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todas')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  
  // Stats
  const [frequentData, setFrequentData] = useState<Record<string, Record<string, number>>>({})
  const [loadingStats, setLoadingStats] = useState(false)
  const [showStats, setShowStats] = useState(false)

  const fetchFiltros = useCallback(async () => {
    setLoading(true)
    try {
      const data = await client.fetch(
        `*[_type == "filtro"] | order(orden asc, categoria asc, nombre_filtro asc) {
          _id, nombre_filtro, categoria, dato_tecnico, icono, activo, tipo_seleccion, orden
        }`
      )
      setFiltros(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchFiltros() }, [fetchFiltros])

  const handleSave = async () => {
    setFormError('')
    if (!form.nombre_filtro.trim() || !form.dato_tecnico.trim()) {
      setFormError('El nombre visible y el dato técnico son obligatorios.')
      return
    }

    // 1. Validar dato técnico existente
    let currentStats = frequentData;
    if (Object.keys(currentStats).length === 0) {
      // Fetch temporario si no se ha cargado "Ver datos reales"
      try {
        const data = await client.fetch(`*[_type == "planta" && !(_id in path("drafts.**")) && estado_revision == "Validado"]`);
        const stats: Record<string, Record<string, number>> = {};
        data.forEach((planta: any) => {
          const processValue = (key: string, val: any) => {
            if (!val) return;
            if (!stats[key]) stats[key] = {};
            if (Array.isArray(val)) {
              val.forEach(v => { if (v && typeof v === 'string') stats[key][v] = 1; });
            } else if (typeof val === 'string') {
              stats[key][val] = 1;
            }
          };
          if (planta.estado_fenologico) processValue('estado_fenologico', planta.estado_fenologico);
          if (planta.impacto_urbano) processValue('impacto_urbano', planta.impacto_urbano);
          if (planta.valor_ornamental) processValue('valor_ornamental', planta.valor_ornamental);
          if (planta.estado_individuo) processValue('estado_individuo', planta.estado_individuo);
          if (planta.habito) processValue('habito', planta.habito);
          if (planta.tipo_vida) processValue('tipo_vida', planta.tipo_vida);
          ['arbol_datos', 'palmera_datos', 'arbusto_datos', 'liana_datos', 'hierba_datos'].forEach(block => {
            if (planta[block]) Object.entries(planta[block]).forEach(([k, v]) => processValue(k, v));
          });
        });
        currentStats = stats;
      } catch (e) { console.error(e); }
    }

    if (Object.keys(currentStats).length > 0) {
      const allDataValues = Object.values(currentStats).flatMap(v => Object.keys(v));
      if (!allDataValues.includes(form.dato_tecnico)) {
        setFormError('Error: El dato técnico ingresado no existe en los registros actuales.');
        return;
      }
    }

    // 2. Validar que no se repita el dato técnico en otro filtro
    const isDatoRepetido = filtros.some(f => f.dato_tecnico === form.dato_tecnico && f._id !== editingId);
    if (isDatoRepetido) {
      setFormError('Error: Este dato técnico ya está asignado a otro filtro creado.');
      return;
    }

    // 3. Validar orden único por categoría
    const isOrdenRepetido = filtros.some(f => f.categoria === form.categoria && Number(f.orden) === Number(form.orden) && f._id !== editingId);
    if (isOrdenRepetido) {
      setFormError(`Error: El orden de aparición ${form.orden} ya está en uso dentro de la categoría "${form.categoria}".`);
      return;
    }

    // 4. Validar nombre visible único por categoría
    const isNombreRepetido = filtros.some(f => f.categoria === form.categoria && f.nombre_filtro.trim().toLowerCase() === form.nombre_filtro.trim().toLowerCase() && f._id !== editingId);
    if (isNombreRepetido) {
      setFormError(`Error: El nombre visible "${form.nombre_filtro}" ya está en uso dentro de la categoría "${form.categoria}". Por favor elige otro.`);
      return;
    }

    setSaving(true)
    try {
      if (editingId) {
        await client.patch(editingId).set({
          nombre_filtro: form.nombre_filtro,
          categoria: form.categoria,
          dato_tecnico: form.dato_tecnico,
          icono: form.icono,
          tipo_seleccion: form.tipo_seleccion,
          orden: form.orden
        }).commit()
      } else {
        await client.create({
          _type: 'filtro',
          ...form,
          activo: true
        })
      }

      // 5. Update ALL other filters in this category with the new tipo_seleccion
      const filtersInCategory = filtros.filter(f => f.categoria === form.categoria && f._id !== editingId)
      if (filtersInCategory.some(f => f.tipo_seleccion !== form.tipo_seleccion)) {
        const patchPromises = filtersInCategory.map(f => 
          client.patch(f._id).set({ tipo_seleccion: form.tipo_seleccion }).commit()
        )
        await Promise.all(patchPromises)
      }

      setForm(EMPTY_FORM)
      setEditingId(null)
      setShowForm(false)
      await fetchFiltros()
    } catch (e) {
      setFormError('Error al guardar el filtro. Intenta de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  const startEdit = (filtro: Filtro) => {
    setForm({
      nombre_filtro: filtro.nombre_filtro || '',
      categoria: filtro.categoria || CATEGORIAS[0],
      dato_tecnico: filtro.dato_tecnico || '',
      icono: filtro.icono || '',
      tipo_seleccion: filtro.tipo_seleccion || 'Selección única',
      orden: filtro.orden || 1
    })
    setEditingId(filtro._id)
    setShowForm(true)
    // scroll to form
    setTimeout(() => {
      document.getElementById('filtro-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 50)
  }

  const toggleActivo = async (filtro: Filtro) => {
    // Optimistic update - update UI immediately
    const newState = !filtro.activo
    setFiltros(prev => prev.map(f => f._id === filtro._id ? { ...f, activo: newState } : f))
    try {
      await client.patch(filtro._id).set({ activo: newState }).commit()
    } catch (e) {
      // Revert on error
      console.error(e)
      setFiltros(prev => prev.map(f => f._id === filtro._id ? { ...f, activo: !newState } : f))
    }
  }

  const confirmDelete = (id: string) => {
    setDeleteConfirmId(id)
  }

  const handleDelete = async () => {
    if (!deleteConfirmId) return
    setDeletingId(deleteConfirmId)
    try {
      await client.delete(deleteConfirmId)
      setFiltros(prev => prev.filter(f => f._id !== deleteConfirmId))
      if (editingId === deleteConfirmId) {
        setShowForm(false)
        setEditingId(null)
        setForm(EMPTY_FORM)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setDeletingId(null)
      setDeleteConfirmId(null)
    }
  }

  const categorias = ['Todas', ...CATEGORIAS]
  const filtrosFiltrados = categoriaSeleccionada === 'Todas'
    ? filtros
    : filtros.filter(f => f.categoria === categoriaSeleccionada)

  const activosCount = filtros.filter(f => f.activo).length

  const fetchStats = async () => {
    if (Object.keys(frequentData).length > 0) {
      setShowStats(!showStats)
      return
    }
    setLoadingStats(true)
    try {
      const data = await client.fetch(
        `*[_type == "planta" && !(_id in path("drafts.**"))] { 
          arbol_datos, palmera_datos, arbusto_datos, liana_datos, hierba_datos, estado_fenologico, impacto_urbano, valor_ornamental, estado_individuo, habito, tipo_vida 
        }`
      )
      const stats: Record<string, Record<string, number>> = {}
      
      data.forEach((planta: any) => {
        const processValue = (key: string, val: any) => {
          if (!val) return
          if (!stats[key]) stats[key] = {}
          if (Array.isArray(val)) {
            val.forEach(v => {
              if (v && typeof v === 'string') {
                stats[key][v] = (stats[key][v] || 0) + 1
              }
            })
          } else if (typeof val === 'string') {
            stats[key][val] = (stats[key][val] || 0) + 1
          }
        }
  
        if (planta.estado_fenologico) processValue('estado_fenologico', planta.estado_fenologico)
        if (planta.impacto_urbano) processValue('impacto_urbano', planta.impacto_urbano)
        if (planta.valor_ornamental) processValue('valor_ornamental', planta.valor_ornamental)
        if (planta.estado_individuo) processValue('estado_individuo', planta.estado_individuo)
        if (planta.habito) processValue('habito', planta.habito)
        if (planta.tipo_vida) processValue('tipo_vida', planta.tipo_vida)
        
        const blocks = ['arbol_datos', 'palmera_datos', 'arbusto_datos', 'liana_datos', 'hierba_datos']
        blocks.forEach(block => {
          if (planta[block]) {
            Object.entries(planta[block]).forEach(([k, v]) => processValue(k, v))
          }
        })
      })
      setFrequentData(stats)
      setShowStats(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingStats(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 cascade-container">
        <div className="cascade-container">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2 cascade-item">
            <SlidersHorizontal className="w-6 h-6 text-primary" />
            Módulo de Filtros Dinámicos
          </h1>
          <p className="text-sm text-muted-foreground mt-1 cascade-item delay-1">
            Crea y gestiona los filtros de búsqueda que verán los usuarios en la app móvil.
            Traduce datos técnicos a lenguaje simple.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 sm:mt-0 mt-2 cascade-container">
          <div className="relative group/tooltip cascade-item delay-2">
            <button
              onClick={fetchFiltros}
              className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded border border-border opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
              Recargar
            </span>
          </div>
          <button
            onClick={fetchStats}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground text-sm border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer cascade-item delay-3"
          >
            {loadingStats ? <RefreshCw className="w-4 h-4 animate-spin" /> : <BarChart2 className="w-4 h-4" />}
            {showStats ? "Ocultar Datos Reales" : "Ver Datos Reales"}
          </button>
          <button
            onClick={() => { 
              setForm(EMPTY_FORM); 
              setEditingId(null); 
              setShowForm(true); 
              setTimeout(() => {
                document.getElementById('filtro-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }, 50)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#1FC451] text-white text-sm font-bold rounded-lg transition-colors cursor-pointer cascade-item delay-4"
          >
            <Plus className="w-4 h-4" />
            Nuevo filtro
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 cascade-container">
        {[
          { label: 'Total filtros', value: filtros.length, color: 'text-foreground' },
          { label: 'Activos', value: activosCount, color: 'text-primary' },
          { label: 'Inactivos', value: filtros.length - activosCount, color: 'text-muted-foreground' },
          { label: 'Categorías', value: new Set(filtros.map(f => f.categoria)).size, color: 'text-foreground' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4 cascade-item">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Explanation card */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-muted-foreground cascade-item delay-5">
        <p className="font-semibold text-primary mb-1">¿Cómo funciona este módulo?</p>
        <p>
          Los estudiantes registran datos técnicos (ej. <code className="bg-white/10 px-1 rounded">Ramificación verticilada</code>).
          Tú defines aquí cómo se verá ese valor en la app: <strong className="text-foreground">Nombre visible</strong> (ej. "Ramas como hélice"),
          a qué <strong className="text-foreground">Categoría</strong> pertenece, y puedes activarlo o desactivarlo.
        </p>
      </div>

      {/* Stats Viewer */}
      {showStats && (
        <div className="bg-card border border-primary/30 rounded-xl p-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 shadow-[0_0_15px_rgba(31,196,81,0.1)]">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[#1FC451] flex items-center gap-2 text-lg">
              <BarChart2 className="w-5 h-5" />
              Valores Reales Registrados
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Copia exactamente estos valores técnicos en el campo "Dato técnico" al crear tus filtros. Muestra el top 5 de respuestas más comunes en toda la base de datos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {Object.entries(frequentData)
              .sort((a, b) => Object.keys(b[1]).length - Object.keys(a[1]).length)
              .map(([key, counts]) => (
              <div key={key} className="bg-background border border-border rounded-lg p-3 hover:border-muted-foreground/30 transition-colors">
                <h3 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-3 pb-2 border-b border-border">
                  {key.replace(/_/g, ' ')}
                </h3>
                <div className="space-y-2">
                  {Object.entries(counts)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5) // top 5
                    .map(([val, count]) => (
                    <div key={val} className="flex justify-between items-center text-xs group">
                      <span className="text-muted-foreground truncate pr-2 group-hover:text-foreground transition-colors" title={val}>{val}</span>
                      <span className="bg-muted text-[#1FC451] px-2 py-0.5 rounded font-mono font-bold">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create form */}
      {showForm && (
        <div id="filtro-form" className="bg-card border border-border rounded-xl p-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            {editingId ? <SlidersHorizontal className="w-4 h-4 text-primary" /> : <Plus className="w-4 h-4 text-primary" />}
            {editingId ? 'Editar filtro' : 'Crear nuevo filtro'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Nombre visible (para el usuario) *
              </label>
              <input
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ej. Ramas hacia arriba"
                value={form.nombre_filtro}
                onChange={e => setForm(f => ({ ...f, nombre_filtro: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Dato técnico (en base de datos) *
              </label>
              <input
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ej. Erecta"
                value={form.dato_tecnico}
                onChange={e => setForm(f => ({ ...f, dato_tecnico: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Categoría *
              </label>
              <CustomSelect
                value={form.categoria}
                onChange={(val) => {
                  const existingFilter = filtros.find(f => f.categoria === val);
                  setForm(f => ({ ...f, categoria: val, tipo_seleccion: existingFilter?.tipo_seleccion || f.tipo_seleccion }))
                }}
                options={CATEGORIAS.map(c => ({ value: c, label: c }))}
                placeholder="Seleccionar categoría..."
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Ícono de Flora (Opcional)
              </label>
              <CustomSelect
                value={form.icono}
                onChange={(val) => setForm(f => ({ ...f, icono: val }))}
                options={[{ value: '', label: 'Ninguno' }, ...FLORA_ICONS]}
                placeholder="Seleccionar ícono..."
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Tipo de Selección *
              </label>
              <CustomSelect
                value={form.tipo_seleccion}
                onChange={(val) => setForm(f => ({ ...f, tipo_seleccion: val }))}
                options={[
                  { value: 'Selección única', label: 'Selección única' },
                  { value: 'Selección múltiple', label: 'Selección múltiple' }
                ]}
                placeholder="Tipo..."
              />
              <p className="text-[10px] text-orange-400 mt-1 leading-tight">
                Cambiar esto afectará a todos los filtros en "{form.categoria}".
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Orden de aparición (1 primero)
              </label>
              <input
                type="number"
                min="1"
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                value={form.orden}
                onChange={e => setForm(f => ({ ...f, orden: parseInt(e.target.value) || 1 }))}
              />
            </div>
          </div>

          {formError && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {formError}
            </p>
          )}

          <div className="flex gap-3 justify-end mt-4">
            <button
              onClick={() => { setShowForm(false); setForm(EMPTY_FORM); setEditingId(null); setFormError('') }}
              className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 text-sm bg-green-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
            >
              {saving ? 'Guardando...' : (editingId ? 'Guardar Cambios' : 'Crear filtro')}
            </button>
          </div>
        </div>
      )}

      {/* Filter by category */}
      <div className="flex flex-wrap gap-2 cascade-container">
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            className={`cascade-item px-3 py-1.5 text-xs font-medium rounded-full border transition-colors cursor-pointer ${
              categoriaSeleccionada === cat
                ? 'bg-primary text-primary-foreground border-primary font-bold'
                : 'border-border text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-border/50'
            }`}
          >
            {cat}
            {cat !== 'Todas' && (
              <span className={`ml-1 ${categoriaSeleccionada === cat ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
                ({filtros.filter(f => f.categoria === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Filters list */}
      {loading ? (
        <LoadingSpinner text="Cargando filtros..." />
      ) : filtrosFiltrados.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Filter className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p className="font-medium">No hay filtros en esta categoría</p>
          <p className="text-sm mt-1">Crea tu primer filtro con el botón de arriba.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Group by categoria */}
          {(categoriaSeleccionada === 'Todas' ? CATEGORIAS.filter(c => filtros.some(f => f.categoria === c)) : [categoriaSeleccionada]).map(cat => {
            const items = filtrosFiltrados.filter(f => f.categoria === cat)
            if (items.length === 0) return null
            return (
              <div key={cat} className="space-y-1 cascade-container">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest pt-3 pb-1 px-1 cascade-item">{cat}</p>
                {items.map(filtro => (
                  <div
                    key={filtro._id}
                    className={`cascade-item flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      filtro.activo
                        ? 'bg-card border-border'
                        : 'bg-card/50 border-border/50 opacity-60'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {filtro.nombre_filtro}
                        </p>
                        {filtro.activo ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-700 dark:text-green-400 border border-green-500/40 font-medium flex-shrink-0">Activo</span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-700 dark:text-red-400 border border-red-500/40 font-medium flex-shrink-0">Inactivo</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Dato técnico: <code className="bg-white/5 px-1 rounded">{filtro.dato_tecnico}</code>
                        {filtro.icono && (
                          <span className="inline-flex items-center gap-1 ml-1">
                            · Ícono: 
                            <span className="text-sm ml-0.5">{ICON_TO_EMOJI[filtro.icono] || ''}</span>
                            <code className="bg-white/5 px-1 rounded">{filtro.icono}</code>
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {/* Edit */}
                      <div className="relative group">
                        <button
                          onClick={() => startEdit(filtro)}
                          className="p-2 rounded-lg text-zinc-500 hover:bg-blue-500/10 hover:text-blue-400 transition-colors cursor-pointer"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                        </button>
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-blue-950 text-blue-400 text-xs rounded border border-blue-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                          Editar
                        </span>
                      </div>
                      {/* Toggle active */}
                      <div className="relative group">
                        <button
                          onClick={() => toggleActivo(filtro)}
                          className={`p-2 rounded-lg transition-colors cursor-pointer ${
                            filtro.activo
                              ? 'text-green-400 hover:bg-green-500/10'
                              : 'text-red-400 hover:bg-red-500/10'
                          }`}
                        >
                          {filtro.activo
                            ? <ToggleRight className="w-5 h-5" />
                            : <ToggleLeft className="w-5 h-5" />
                          }
                        </button>
                        <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg ${
                          filtro.activo
                            ? 'bg-green-950 text-green-400 border-green-800'
                            : 'bg-red-950 text-red-400 border-red-800'
                        }`}>
                          {filtro.activo ? 'Desactivar' : 'Activar'}
                        </span>
                      </div>
                      {/* Delete */}
                      <div className="relative group">
                        <button
                          onClick={() => confirmDelete(filtro._id)}
                          disabled={deletingId === filtro._id}
                          className="p-2 rounded-lg text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-red-950 text-red-400 text-xs rounded border border-red-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                          Eliminar
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}

      {/* Modal de eliminación */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-card border border-border p-6 rounded-xl w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="font-bold text-lg mb-2 text-foreground flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-500" />
              Eliminar Filtro
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              ¿Estás seguro de que deseas eliminar este filtro definitivamente? Esta acción no se puede deshacer y afectará las búsquedas en la app.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setDeleteConfirmId(null)} 
                className="px-4 py-2 text-sm font-medium text-foreground bg-secondary hover:bg-secondary/80 rounded-lg transition-colors cursor-pointer"
                disabled={deletingId !== null}
              >
                Cancelar
              </button>
              <button 
                onClick={handleDelete} 
                className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                disabled={deletingId !== null}
              >
                {deletingId ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
