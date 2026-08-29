import React, { useEffect, useState } from 'react'
import './InitialLoader.css'

interface InitialLoaderProps {
  onComplete: () => void;
}

export function InitialLoader({ onComplete }: InitialLoaderProps) {
  const [svgContent, setSvgContent] = useState<string>('')
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    fetch('/loader/iquitos.svg')
      .then(res => res.text())
      .then(text => {
        // Inject class to animate the path
        const modified = text.replace('<path ', '<path class="loader-map-path" ')
        
        // Remove explicit width/height to make it responsive inside its container
        const responsiveSvg = modified
          .replace(/width="[0-9]+"/, 'width="100%"')
          .replace(/height="[0-9]+"/, 'height="100%"')

        setSvgContent(responsiveSvg)
      })
      .catch(err => console.error('Failed to load iquitos.svg', err))
  }, [])

  useEffect(() => {
    // Wait for animations to finish before starting fade out
    // Text Reveal (PLANT-OR): 0.0s - 0.5s
    // Map draw: 0.5s - 3.0s
    // Pins appear: 3.0s - 3.4s
    // Text Split (IQUITOS): 3.5s - 4.0s
    // Total wait before fade out: 4.5s
    const timer = setTimeout(() => {
      setIsFadingOut(true)
      setTimeout(onComplete, 500) // 500ms fade out transition
    }, 4500)

    return () => clearTimeout(timer)
  }, [onComplete])

  // Fixed decorative pins locations (strictly inside the main map shape)
  const fixedPins = [
    { id: 1, top: '45%', left: '35%', animationClass: 'pin-pop-1' },
    { id: 2, top: '50%', left: '45%', animationClass: 'pin-pop-2' },
    { id: 3, top: '65%', left: '30%', animationClass: 'pin-pop-3' },
    { id: 4, top: '30%', left: '40%', animationClass: 'pin-pop-4' },
    { id: 5, top: '35%', left: '55%', animationClass: 'pin-pop-5' },
  ]

  return (
    <div className={`initial-loader-container ${isFadingOut ? 'fade-out' : ''}`}>
      {/* Container limits SVG size to avoid filling the whole screen unproportionally */}
      <div className="absolute inset-0 max-w-5xl max-h-[80vh] mx-auto my-auto w-full h-full pointer-events-none opacity-20 dark:opacity-30 flex items-center justify-center">
        <div 
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
        
        {/* Pins container superimposed on the SVG container to align coordinates roughly */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {fixedPins.map(pin => (
            <div 
              key={pin.id} 
              className={`loader-pin-wrapper ${pin.animationClass}`}
              style={{ top: pin.top, left: pin.left }}
            >
              {/* Uses the exact same style as markers in LazyCatalogMap */}
              <div className="custom-map-marker">
                <div></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-reveal-container">
        <h2 className="split-text">
          PLANT-OR
          <span>PLANT-OR</span>
          <span>PLANT-OR</span>
          <span>IQUITOS</span>
        </h2>
      </div>
    </div>
  )
}
