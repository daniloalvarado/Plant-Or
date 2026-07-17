import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, Save, Loader2, RotateCcw } from 'lucide-react';
import { client } from '@/lib/sanity';
import { CustomDatePicker } from '@/components/CustomDatePicker';
import { CustomSelect } from '@/components/CustomSelect';

interface ConfiguracionCierreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConfiguracionCierreModal({ isOpen, onClose }: ConfiguracionCierreModalProps) {
  const [rol, setRol] = useState<'Estudiantes' | 'Ciudadanos' | 'Ambos'>('Ambos');
  const [cierre, setCierre] = useState('');
  
  const [cierreEstudiantesOriginal, setCierreEstudiantesOriginal] = useState<string | null>(null);
  const [cierreCiudadanosOriginal, setCierreCiudadanosOriginal] = useState<string | null>(null);

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
        
        let estTime = '';
        let ciuTime = '';
        
        if (config.cierre_estudiantes) {
          const d = new Date(config.cierre_estudiantes);
          const tzOffset = d.getTimezoneOffset() * 60000;
          estTime = (new Date(d.getTime() - tzOffset)).toISOString().slice(0, 16);
        }
        if (config.cierre_ciudadanos) {
          const d = new Date(config.cierre_ciudadanos);
          const tzOffset = d.getTimezoneOffset() * 60000;
          ciuTime = (new Date(d.getTime() - tzOffset)).toISOString().slice(0, 16);
        }
        
        setCierreEstudiantesOriginal(estTime);
        setCierreCiudadanosOriginal(ciuTime);
        
        if (estTime === ciuTime && estTime !== '') {
           setRol('Ambos');
           setCierre(estTime);
        } else if (estTime) {
           setRol('Estudiantes');
           setCierre(estTime);
        } else if (ciuTime) {
           setRol('Ciudadanos');
           setCierre(ciuTime);
        } else {
           setRol('Ambos');
           setCierre('');
        }
      }
    } catch (error) {
      console.error('Error fetching config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCierreChange = (val: string) => {
    setCierre(val);
    if (rol === 'Estudiantes') setCierreEstudiantesOriginal(val);
    if (rol === 'Ciudadanos') setCierreCiudadanosOriginal(val);
    if (rol === 'Ambos') {
      setCierreEstudiantesOriginal(val);
      setCierreCiudadanosOriginal(val);
    }
  };

  const handleRolChange = (newRol: string) => {
    const r = newRol as 'Estudiantes' | 'Ciudadanos' | 'Ambos';
    setRol(r);
    if (r === 'Estudiantes') setCierre(cierreEstudiantesOriginal || '');
    if (r === 'Ciudadanos') setCierre(cierreCiudadanosOriginal || '');
    if (r === 'Ambos') setCierre(cierreEstudiantesOriginal || cierreCiudadanosOriginal || '');
  };

  const handleSave = async () => {
    if (!docId) return;
    setSaving(true);
    try {
      const patch: any = {};
      
      if (cierreEstudiantesOriginal) {
        patch.cierre_estudiantes = new Date(cierreEstudiantesOriginal).toISOString();
      } else {
        patch.cierre_estudiantes = null;
      }

      if (cierreCiudadanosOriginal) {
        patch.cierre_ciudadanos = new Date(cierreCiudadanosOriginal).toISOString();
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
    <div className={`fixed inset-0 z-[100] overflow-y-auto bg-background/80 backdrop-blur-sm ${isAnimatingOut ? 'animate-out fade-out duration-300' : 'animate-in fade-in duration-300'}`}>
      <div className="flex min-h-full items-center justify-center p-4 pt-10 pb-48">
        <div className={`bg-card border border-border rounded-2xl p-6 w-full max-w-xl shadow-2xl ${isAnimatingOut ? 'animate-collapse-y' : 'animate-expand-y'}`}>
          <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Programar Cierre
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Define la fecha y hora límite para aceptar registros. Pasada esta hora (en hora local de Perú), la app móvil bloqueará nuevos envíos automáticamente.
            </p>

            <div className="space-y-4">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-foreground">Seleccionar Rol</label>
                <CustomSelect
                  options={[
                    { value: 'Ambos', label: 'Ambos' },
                    { value: 'Estudiantes', label: 'Estudiantes' },
                    { value: 'Ciudadanos', label: 'Ciudadanos' }
                  ]}
                  value={rol}
                  onChange={handleRolChange}
                  placeholder="Elige un rol..."
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-foreground">Fecha y Hora de Cierre</label>
                <div className="flex items-center gap-2">
                  <CustomDatePicker
                    type="datetime-local"
                    value={cierre}
                    onChange={handleCierreChange}
                    className="flex-1"
                  />
                  <div className="relative group/tooltip flex-shrink-0">
                    <button 
                      onClick={() => handleCierreChange('')}
                      className="p-3 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover text-red-500 text-xs font-bold rounded border border-red-500/30 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                      Restablecer (sin límite)
                    </span>
                  </div>
                </div>
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
        </div>
      </div>
    </div>
  );
}
