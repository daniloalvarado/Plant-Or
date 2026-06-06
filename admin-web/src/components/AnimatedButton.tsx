import React from 'react';
import './AnimatedButton.css';
import { Pointer } from 'lucide-react';

interface AnimatedButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  icon?: boolean;
}

export function AnimatedButton({ text, onClick, className = '', icon = false }: AnimatedButtonProps) {
  return (
    <button className={`btn-animated shadow-sm ${className}`} onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}>
      <div className="original flex items-center justify-center gap-2 w-full h-full">
        {text}
        {icon && <Pointer className="w-4 h-4" />}
      </div>
      <div className="letters flex items-center justify-center gap-[1px]">
        {text.split('').map((char, index) => (
          <span 
            key={index} 
            style={{ 
              transitionDelay: `${index * 0.03}s` 
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
        {icon && (
           <span style={{ transitionDelay: `${text.length * 0.03}s`, marginLeft: '4px' }}>
             <Pointer className="w-4 h-4" />
           </span>
        )}
      </div>
    </button>
  );
}
