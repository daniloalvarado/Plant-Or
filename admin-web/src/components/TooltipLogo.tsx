import React from 'react';
import { Leaf } from 'lucide-react';
import './TooltipLogo.css';

export function TooltipLogo() {
  return (
    <div className="tooltip-container flex items-center gap-2">
      <div className="bg-[#1FC451] p-2 rounded-lg">
        <Leaf className="w-5 h-5 text-black" />
      </div>
      <span className="font-bold text-lg text-foreground">Plant-OR</span>
      <span className="t-tooltip">Catálogo interactivo con la flora amazónica registrada y validada por nuestros estudiantes.</span>
    </div>
  );
}
