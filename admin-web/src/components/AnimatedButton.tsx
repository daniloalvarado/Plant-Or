import React from 'react';
import './AnimatedButton.css';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  text?: string;
  initialText?: string;
  hoverText?: string;
  onClick?: () => void;
  className?: string;
}

export function AnimatedButton({ text, initialText, hoverText, onClick, className = '' }: AnimatedButtonProps) {
  const displayInitial = initialText || text || '';
  const displayHover = hoverText || text || '';
  const longestText = displayHover.length > displayInitial.length ? displayHover : displayInitial;

  return (
    <button 
      className={cn("btn-animated-new", className)} 
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <div className="content-wrapper">
        <div className="hover-underline-animation">
          <div className="text-wrapper">
            <div className="placeholder">
              {longestText}
            </div>
            <div className="original text-gradient-green">
              {displayInitial}
            </div>
            <div className="letters text-gradient-green">
              {displayHover.split('').map((char, index) => (
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
          </div>
        </div>
        <svg id="arrow-horizontal" xmlns="http://www.w3.org/2000/svg" width={30} height={10} viewBox="0 0 46 16">
          <path id="Path_10" data-name="Path 10" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" transform="translate(30)" fill="currentColor" />
        </svg>
      </div>
    </button>
  );
}
