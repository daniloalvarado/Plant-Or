import React from 'react';
import './AnimatedButton.css';
import { Pointer } from 'lucide-react';

interface AnimatedButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export function AnimatedButton({ text, onClick, className = '' }: AnimatedButtonProps) {
  return (
    <button className={`btn-animated shadow-sm ${className}`} onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}>
      <div className="original flex items-center justify-center gap-2 w-full h-full">
        {text}
      </div>
      <div className="letters flex items-center justify-center gap-[1px]">
        {text.split('').map((char, index) => (
          <span 
            key={index} 
            style={{ 
              '--delay': `${index * 0.03}s` 
            } as React.CSSProperties}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </button>
  );
}
