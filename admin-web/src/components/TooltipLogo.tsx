import React from 'react';
import { Leaf } from 'lucide-react';
import './TooltipLogo.css';

export function TooltipLogo() {
  return (
    <div className="tooltip-container flex items-center gap-2">
      <div className="bg-brand-green p-2 rounded-lg transition-colors">
        <Leaf className="w-5 h-5 text-white" />
      </div>
      <span className="font-bold text-lg text-foreground">Plant-Or</span>
      <span className="t-tooltip">Explora la riqueza botánica de la Amazonía con nuestro catálogo interactivo y geolocalizado, ideal tanto para curiosos como para expertos. ¡Sé parte del proyecto! Descarga nuestra aplicación, registra las plantas de tu entorno y ayúdanos a expandir el mapa de nuestra biodiversidad.</span>
    </div>
  );
}
