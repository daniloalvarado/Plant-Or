import React, { useState, useEffect } from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function DeleteModal({ isOpen, onClose, onConfirm, loading }: DeleteModalProps) {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setIsAnimatingOut(false);
    } else if (isRendered) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300); // Duración de la animación de cierre (0.3s)
      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered]);

  if (!isRendered) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 ${isAnimatingOut ? 'animate-out fade-out duration-300' : 'animate-in fade-in duration-300'}`}>
      <div className={`bg-card border border-border rounded-2xl p-6 w-full max-w-md space-y-6 shadow-2xl ${isAnimatingOut ? 'animate-collapse-y' : 'animate-expand-y'}`}>
        <div>
          <h3 className="text-xl font-bold text-red-600">Eliminar Definitivamente</h3>
          <p className="text-sm text-muted-foreground mt-2">
            ¿Estás seguro de que quieres eliminar completamente este registro de la base de datos de Sanity? Esta acción no se puede deshacer.
          </p>
        </div>
        
        <div className="flex gap-3 justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={!!loading}
            className="px-5 py-2 text-sm text-white font-bold rounded-lg transition-all disabled:opacity-50 cursor-pointer bg-red-600 hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
          >
            {loading ? 'Eliminando...' : 'Eliminar Registro'}
          </button>
        </div>
      </div>
    </div>
  );
}
