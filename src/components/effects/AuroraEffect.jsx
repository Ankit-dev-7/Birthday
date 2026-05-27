import React, { useRef, useEffect } from 'react';
import { setupAuroraParallax } from '../../animations/gsapTimelines';
import { useApp } from '../../context/AppContext';

/**
 * Aurora borealis background effect using layered CSS animations.
 * Used in the EndingScene.
 */
export function AuroraEffect({ className = '' }) {
  const containerRef = useRef(null);
  const layerRefs = useRef([]);
  const { reducedMotion } = useApp();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;
    const layers = layerRefs.current.filter(Boolean);
    setupAuroraParallax(layers, containerRef.current);
  }, [reducedMotion]);

  const layers = [
    {
      colors: 'rgba(0,255,150,0.25), rgba(100,0,200,0.3), transparent',
      duration: '12s',
      delay: '0s',
      top: '10%',
      width: '120%',
      height: '40%',
    },
    {
      colors: 'rgba(150,0,255,0.2), rgba(255,100,200,0.25), transparent',
      duration: '18s',
      delay: '-4s',
      top: '20%',
      width: '110%',
      height: '35%',
    },
    {
      colors: 'rgba(0,200,255,0.15), rgba(200,0,150,0.2), transparent',
      duration: '15s',
      delay: '-8s',
      top: '30%',
      width: '130%',
      height: '30%',
    },
    {
      colors: 'rgba(255,150,0,0.1), rgba(0,100,255,0.15), transparent',
      duration: '20s',
      delay: '-12s',
      top: '5%',
      width: '100%',
      height: '50%',
    },
  ];

  return (
    <>
      <style>{`
        @keyframes auroraWave {
          0%   { background-position: 0% 50%; transform: translateX(0) skewX(0deg); }
          25%  { background-position: 50% 0%; transform: translateX(-5%) skewX(2deg); }
          50%  { background-position: 100% 50%; transform: translateX(5%) skewX(-2deg); }
          75%  { background-position: 50% 100%; transform: translateX(-3%) skewX(1deg); }
          100% { background-position: 0% 50%; transform: translateX(0) skewX(0deg); }
        }
        .aurora-layer {
          position: absolute;
          left: -10%;
          border-radius: 50%;
          filter: blur(40px);
          background-size: 300% 300%;
          animation: auroraWave var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
          will-change: transform;
        }
      `}</style>
      <div
        ref={containerRef}
        className={`absolute inset-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        {layers.map((layer, i) => (
          <div
            key={i}
            ref={(el) => (layerRefs.current[i] = el)}
            className="aurora-layer"
            style={{
              top: layer.top,
              width: layer.width,
              height: layer.height,
              background: `linear-gradient(135deg, ${layer.colors})`,
              '--duration': layer.duration,
              '--delay': layer.delay,
              opacity: reducedMotion ? 0.4 : 1,
            }}
          />
        ))}
      </div>
    </>
  );
}

export default AuroraEffect;
