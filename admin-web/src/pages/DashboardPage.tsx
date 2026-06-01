import React from 'react'
import { usePlantas } from '@/hooks/use-plantas'
import { Leaf, Clock, CheckCircle, AlertCircle, XCircle, Users, TrendingUp, Send } from 'lucide-react'
import { EstadoBadge } from '@/components/EstadoBadge'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { sendSemestralReportEmail } from '@/lib/email-service'
import { useState } from 'react'
import { toast } from 'sonner'

export default function DashboardPage() {
  const { plantas, loading } = usePlantas()
  const [isSendingReports, setIsSendingReports] = useState(false)

  if (loading) return <LoadingSpinner />

  const stats = {
    total: plantas.length,
    enRevision: plantas.filter(p => p.estado_revision === 'En revisión').length,
    validados: plantas.filter(p => p.estado_revision === 'Validado').length,
    observados: plantas.filter(p => p.estado_revision === 'Observado').length,
    rechazados: plantas.filter(p => p.estado_revision === 'Rechazado').length,
  }

  // Unique students
  const estudiantesMap = new Map<string, { nombre: string; count: number; aprobados: number }>()
  plantas.forEach(p => {
    const key = p.registrador_dni || p.autor || 'unknown'
    if (!estudiantesMap.has(key)) {
      estudiantesMap.set(key, { nombre: p.registrador_nombre || 'Sin nombre', count: 0, aprobados: 0 })
    }
    const entry = estudiantesMap.get(key)!
    entry.count++
    if (p.estado_revision === 'Validado') entry.aprobados++
  })

  const topEstudiantes = Array.from(estudiantesMap.entries())
    .map(([, v]) => v)
    .sort((a, b) => b.aprobados - a.aprobados)
    .slice(0, 5)

  // Recent activity
  const recientes = [...plantas].slice(0, 6)

  // Habits distribution
  const habitosMap = new Map<string, number>()
  plantas.forEach(p => {
    if (p.habito) habitosMap.set(p.habito, (habitosMap.get(p.habito) || 0) + 1)
  })

  const handleSendSemestralReports = async () => {
    if (!confirm("¿Estás seguro de que quieres despachar el reporte semestral a todos los estudiantes registrados? Esto podría enviar muchos correos electrónicos.")) return;
    
    setIsSendingReports(true);
    let successCount = 0;
    
    try {
      const studentStatsMap = new Map<string, {
        nombre: string;
        stats: { validados: number; observados: number; en_revision: number; rechazados: number; total: number }
      }>();

      plantas.forEach(p => {
        const email = p.registrador_email;
        if (!email) return;

        if (!studentStatsMap.has(email)) {
          studentStatsMap.set(email, {
            nombre: p.registrador_nombre || 'Estudiante',
            stats: { validados: 0, observados: 0, en_revision: 0, rechazados: 0, total: 0 }
          });
        }
        
        const entry = studentStatsMap.get(email)!;
        entry.stats.total++;
        if (p.estado_revision === 'Validado') entry.stats.validados++;
        else if (p.estado_revision === 'Observado') entry.stats.observados++;
        else if (p.estado_revision === 'En revisión') entry.stats.en_revision++;
        else if (p.estado_revision === 'Rechazado') entry.stats.rechazados++;
      });

      const totalStudents = studentStatsMap.size;
      
      for (const [email, data] of studentStatsMap.entries()) {
        const ok = await sendSemestralReportEmail(email, data.nombre, data.stats);
        if (ok) successCount++;
      }

      toast.success(`Reportes semestrales enviados (${successCount} de ${totalStudents} estudiantes)`);
    } catch (err) {
      console.error(err);
      toast.error("Ocurrió un error al despachar los reportes.");
    } finally {
      setIsSendingReports(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Resumen general del catálogo PLANT-OR</p>
        </div>
        <button
          onClick={handleSendSemestralReports}
          disabled={isSendingReports}
          className="flex items-center gap-2 px-4 py-2 bg-[#1FC451] hover:bg-[#15963c] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          {isSendingReports ? <LoadingSpinner text="Enviando..." /> : <><Send className="w-4 h-4" /> Despachar Reporte Semestral</>}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total registros', value: stats.total, icon: Leaf, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'En revisión', value: stats.enRevision, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
          { label: 'Validados', value: stats.validados, icon: CheckCircle, color: 'text-[#1FC451]', bg: 'bg-[#1FC451]/10' },
          { label: 'Observados', value: stats.observados, icon: AlertCircle, color: 'text-orange-400', bg: 'bg-orange-500/10' },
          { label: 'Rechazados', value: stats.rechazados, icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4">
            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h2 className="font-semibold text-foreground">Actividad Reciente</h2>
          </div>
          <div className="space-y-3">
            {recientes.map((p) => (
              <div key={p._id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {p.nombre_cientifico || p.nombres_comunes || 'Sin nombre'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {p.registrador_nombre} · {p.habito || '—'} · {p.registrador_curso || '—'}
                  </p>
                </div>
                <div className="flex items-center gap-3 ml-3">
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    {p._createdAt ? format(new Date(p._createdAt), "dd MMM", { locale: es }) : '—'}
                  </span>
                  <EstadoBadge estado={p.estado_revision} />
                </div>
              </div>
            ))}
            {recientes.length === 0 && (
              <p className="text-muted-foreground text-sm text-center py-4">Sin registros aún</p>
            )}
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-5">
          {/* Top Students */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-primary" />
              <h2 className="font-semibold text-foreground">Top Estudiantes</h2>
            </div>
            <div className="space-y-3">
              {topEstudiantes.map((est, i) => (
                <div key={i} className="flex items-center gap-3 py-1">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm font-medium text-foreground flex-1 truncate">{est.nombre}</p>
                  <span className="text-sm font-bold text-muted-foreground flex-shrink-0">{est.aprobados}/20</span>
                </div>
              ))}
              {topEstudiantes.length === 0 && (
                <p className="text-muted-foreground text-sm">Sin datos aún</p>
              )}
            </div>
          </div>

          {/* Habits Distribution */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-4 h-4 text-primary" />
              <h2 className="font-semibold text-foreground">Por Hábito</h2>
            </div>
            <div className="space-y-2">
              {Array.from(habitosMap.entries()).map(([habito, count]) => (
                <div key={habito} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{habito}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-border">
                      <div
                        className="h-1.5 rounded-full bg-primary"
                        style={{ width: `${(count / stats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-5 text-right">{count}</span>
                  </div>
                </div>
              ))}
              {habitosMap.size === 0 && <p className="text-muted-foreground text-sm">Sin datos</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
