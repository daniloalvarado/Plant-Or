import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, Save, Loader2, RotateCcw } from 'lucide-react';
import { client } from '@/lib/sanity';
import { CustomDatePicker } from '@/components/CustomDatePicker';

interface ConfiguracionCierreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConfiguracionCierreModal({ isOpen, onClose }: ConfiguracionCierreModalProps) {
  const [cierreEstudiantes, setCierreEstudiantes] = useState('');
  const [cierreCiudadanos, setCierreCiudadanos] = useState('');
  const [docId, setDocId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setIsAnimatingOut(false);
      fetchConfig();
    } else if (isRendered) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered]);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const config = await client.fetch(`*[_type == "configuracion"][0]`);
      if (config) {
        setDocId(config._id);
        // Convert sanity datetime to local datetime-local format (YYYY-MM-DDThh:mm)
        if (config.cierre_estudiantes) {
          const d = new Date(config.cierre_estudiantes);
          // Adjust for timezone offset to show local time in the input
          const tzOffset = d.getTimezoneOffset() * 60000;
          const localISOTime = (new Date(d.getTime() - tzOffset)).toISOString().slice(0, 16);
          setCierreEstudiantes(localISOTime);
        }
        if (config.cierre_ciudadanos) {
          const d = new Date(config.cierre_ciudadanos);
          const tzOffset = d.getTimezoneOffset() * 60000;
          const localISOTime = (new Date(d.getTime() - tzOffset)).toISOString().slice(0, 16);
          setCierreCiudadanos(localISOTime);
        }
      }
    } catch (error) {
      console.error('Error fetching config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!docId) return;
    setSaving(true);
    try {
      const patch: any = {};
      
      if (cierreEstudiantes) {
        // Convert back to UTC ISO string
        patch.cierre_estudiantes = new Date(cierreEstudiantes).toISOString();
      } else {
        patch.cierre_estudiantes = null;
      }

      if (cierreCiudadanos) {
        patch.cierre_ciudadanos = new Date(cierreCiudadanos).toISOString();
      } else {
        patch.cierre_ciudadanos = null;
      }

      await client.patch(docId).set(patch).commit();
      onClose();
    } catch (error) {
      console.error('Error saving config:', error);
      alert('Hubo un error al guardar la configuración.');
    } finally {
      setSaving(false);
    }
  };

  if (!isRendered) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 ${isAnimatingOut ? 'animate-out fade-out duration-300' : 'animate-in fade-in duration-300'}`}>
      <div className={`bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl ${isAnimatingOut ? 'animate-collapse-y' : 'animate-expand-y'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Programar Cierre
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Define la fecha y hora límite para aceptar registros. Pasada esta hora (en hora local de Perú), la app móvil bloqueará nuevos envíos automáticamente.
            </p>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">Cierre para Estudiantes</label>
              <div className="flex items-center gap-2">
                <CustomDatePicker
                  type="datetime-local"
                  value={cierreEstudiantes}
                  onChange={setCierreEstudiantes}
                  className="flex-1"
                />
                <button 
                  onClick={() => setCierreEstudiantes('')}
                  title="Restablecer (Sin límite)"
                  className="p-3 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors flex-shrink-0"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">Cierre para Ciudadanos</label>
              <div className="flex items-center gap-2">
                <CustomDatePicker
                  type="datetime-local"
                  value={cierreCiudadanos}
                  onChange={setCierreCiudadanos}
                  className="flex-1"
                />
                <button 
                  onClick={() => setCierreCiudadanos('')}
                  title="Restablecer (Sin límite)"
                  className="p-3 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors flex-shrink-0"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-4 gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-colors"
                disabled={saving}
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Guardar Cambios
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
