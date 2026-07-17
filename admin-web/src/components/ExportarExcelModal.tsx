import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Download, Loader2 } from 'lucide-react';
import { CustomSelect } from '@/components/CustomSelect';
import { CustomDatePicker } from '@/components/CustomDatePicker';
import * as XLSX from 'xlsx';
import type { Planta } from '@/types/planta';

interface ExportarExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  plantas: Planta[]; // Solo los validados
}

export function ExportarExcelModal({ isOpen, onClose, plantas }: ExportarExcelModalProps) {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [rol, setRol] = useState<'Todos' | 'Estudiante' | 'Ciudadano'>('Todos');
  const [estado, setEstado] = useState<'Todos' | 'En revisión' | 'Validado' | 'Observado' | 'Rechazado'>('Todos');
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setIsAnimatingOut(false);
    } else if (isRendered) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered]);

  const handleExport = async () => {
    setExporting(true);
    try {
      // 1. Filtrar las plantas por fecha y rol
      const inicio = fechaInicio ? new Date(fechaInicio).getTime() : 0;
      const fin = fechaFin ? new Date(fechaFin).getTime() : Infinity;
      
      const plantasFiltradas = plantas.filter(p => {
        const fechaPlanta = p._createdAt ? new Date(p._createdAt).getTime() : 0;
        const matchFecha = fechaPlanta >= inicio && fechaPlanta <= fin;
        
        let matchRol = true;
        if (rol !== 'Todos') {
          const isEstudiante = !!p.registrador_curso || !!p.registrador_facultad;
          if (rol === 'Estudiante' && !isEstudiante) matchRol = false;
          if (rol === 'Ciudadano' && isEstudiante) matchRol = false;
        }

        let matchEstado = true;
        if (estado !== 'Todos' && p.estado_revision !== estado) {
          matchEstado = false;
        }

        return matchFecha && matchRol && matchEstado;
      });

      // 2. Agrupar por persona (email o dni)
      const agrupado: Record<string, {
        nombres: string;
        dni: string;
        curso: string;
        rol: string;
        total: number;
      }> = {};

      plantasFiltradas.forEach(p => {
        // Usamos el email como key si existe, si no, el nombre
        const key = p.registrador_email || p.registrador_nombre || 'Desconocido';
        
        if (!agrupado[key]) {
          const isEstudiante = !!p.registrador_curso || !!p.registrador_facultad;
          
          // Fallback a email si no hay nombre o dni
          const nombreDisplay = p.registrador_nombre ? p.registrador_nombre : (p.registrador_email || '—');
          
          agrupado[key] = {
            nombres: nombreDisplay,
            dni: p.registrador_dni || '—',
            curso: p.registrador_curso || '—',
            rol: isEstudiante ? 'Estudiante' : 'Ciudadano',
            total: 0
          };
        }
        agrupado[key].total++;
      });

      // 3. Preparar datos para Excel
      const excelData = Object.values(agrupado).map(usuario => ({
        "Nombres y Apellidos": usuario.nombres,
        "DNI": usuario.dni,
        "Curso": usuario.curso,
        "Tipo de Usuario": usuario.rol,
        "Total de Registros": usuario.total
      }));

      // Si no hay datos
      if (excelData.length === 0) {
        alert("No hay registros validados en ese rango de fechas o para ese rol.");
        setExporting(false);
        return;
      }

      // 4. Generar y descargar Excel
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      
      // Auto-ajustar ancho de columnas
      const wscols = [
        { wch: 40 }, // Nombres
        { wch: 15 }, // DNI
        { wch: 30 }, // Curso
        { wch: 15 }, // Rol
        { wch: 25 }, // Total
      ];
      worksheet['!cols'] = wscols;

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");
      
      const fileName = `Reporte_Plantas_${rol}_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, fileName);

      onClose();
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al exportar el reporte.");
    } finally {
      setExporting(false);
    }
  };

  if (!isRendered) return null;

  return (
    <div className={`fixed inset-0 z-[100] overflow-y-auto bg-background/80 backdrop-blur-sm ${isAnimatingOut ? 'animate-out fade-out duration-300' : 'animate-in fade-in duration-300'}`}>
      <div className="flex min-h-full items-start justify-center p-4 pt-[10vh] pb-[35vh]">
        <div className={`bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl ${isAnimatingOut ? 'animate-collapse-y' : 'animate-expand-y'}`}>
          <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Exportar Reporte Excel
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Fecha de Inicio (Desde)</label>
            <CustomDatePicker
              value={fechaInicio}
              onChange={setFechaInicio}
              className="w-full"
              maxDate={new Date()}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Fecha de Fin (Hasta)</label>
            <CustomDatePicker
              value={fechaFin}
              onChange={setFechaFin}
              className="w-full"
              maxDate={new Date()}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Filtrar por Rol</label>
            <CustomSelect
              value={rol}
              onChange={(val) => setRol(val as any)}
              options={[
                { value: 'Todos', label: 'Ambos (Estudiantes y Ciudadanos)' },
                { value: 'Estudiante', label: 'Solo Estudiantes' },
                { value: 'Ciudadano', label: 'Solo Ciudadanos' }
              ]}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Filtrar por Estado</label>
            <CustomSelect
              value={estado}
              onChange={(val) => setEstado(val as any)}
              options={[
                { value: 'Todos', label: 'Todos los estados' },
                { value: 'En revisión', label: 'En revisión' },
                { value: 'Validado', label: 'Validado' },
                { value: 'Observado', label: 'Observado' },
                { value: 'Rechazado', label: 'Rechazado' }
              ]}
              className="w-full"
            />
          </div>

          <div className="flex justify-end pt-4 gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-colors"
              disabled={exporting}
            >
              Cancelar
            </button>
            <button
              onClick={handleExport}
              disabled={exporting}
              className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center gap-2"
            >
              {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Descargar Excel
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
