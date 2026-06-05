import React, { useState, useEffect } from 'react';

interface ValidacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (motivo: string) => void;
  tipo: 'observar' | 'rechazar';
  loading?: boolean;
}

export function ValidacionModal({ isOpen, onClose, onSubmit, tipo, loading }: ValidacionModalProps) {
  const [motivoTexto, setMotivoTexto] = useState('');
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setIsAnimatingOut(false);
      setMotivoTexto('');
    } else if (isRendered) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300); // Duración de la animación de cierre (0.3s)
      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered]);

  if (!isRendered) return null;

  const isObservar = tipo === 'observar';

  const title = isObservar ? 'Observar Registro' : '¿Rechazar Registro?';
  const titleColor = isObservar ? 'text-[#F97316]' : 'text-red-600';
  const subtitle = isObservar
    ? 'El estudiante verá este mensaje en su aplicación móvil y en su correo para poder corregirlo.'
    : 'El estudiante verá el motivo del rechazo en su aplicación móvil y en su correo.';
  const placeholder = isObservar
    ? "Describe lo que falta o debe corregirse (ej. 'La foto de la hoja está borrosa')..."
    : "Describe por qué se rechaza este registro de forma definitiva...";
  const focusBorder = isObservar ? 'focus:border-[#F97316] focus:ring-[#F97316]' : 'focus:border-red-600 focus:ring-red-600';
  const buttonBg = isObservar ? 'bg-[#c2410c] hover:bg-[#9a3412]' : 'bg-red-600 hover:bg-red-700';
  const buttonShadow = isObservar ? 'shadow-[0_0_15px_rgba(194,65,12,0.3)]' : 'shadow-[0_0_15px_rgba(220,38,38,0.3)]';
  const buttonText = isObservar ? 'Enviar Observación' : 'Rechazar Definitivamente';

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 ${isAnimatingOut ? 'animate-out fade-out duration-300' : 'animate-in fade-in duration-300'}`}>
      <div className={`bg-card border border-border rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl ${isAnimatingOut ? 'animate-collapse-y' : 'animate-expand-y'}`}>
        <div>
          <h3 className={`text-xl font-bold ${titleColor}`}>{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <textarea
          value={motivoTexto}
          onChange={e => setMotivoTexto(e.target.value)}
          placeholder={placeholder}
          rows={14}
          className={`w-full px-4 py-3 bg-input border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 resize-none transition-all max-h-[60vh] min-h-[300px] overflow-y-auto custom-scrollbar ${focusBorder}`}
        />
        <div className="flex gap-3 justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSubmit(motivoTexto)}
            disabled={!motivoTexto.trim() || !!loading}
            className={`px-5 py-2 text-sm text-white font-bold rounded-lg transition-all disabled:opacity-50 cursor-pointer ${buttonBg} ${buttonShadow}`}
          >
            {loading ? 'Enviando...' : buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
