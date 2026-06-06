import React from 'react'

interface LoadingSpinnerProps {
  text?: string
}

export function LoadingSpinner({ text = 'Cargando registros...' }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-5">
        {/* Wave bars */}
        <div className="flex items-end gap-1.5" style={{ height: 36 }}>
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="bg-loading-spinner"
              style={{
                width: 6,
                borderRadius: 3,
                animation: 'wave 1.1s ease-in-out infinite',
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
      <style>{`
        @keyframes wave {
          0%, 100% { height: 10px; opacity: 0.4; }
          50%       { height: 34px; opacity: 1;   }
        }
      `}</style>
    </div>
  )
}
