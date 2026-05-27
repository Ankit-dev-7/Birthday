import React, { useEffect, useState } from 'react';
import { useCursorPosition } from '../../hooks/useCursorPosition';

/**
 * Mouse-following radial glow effect.
 * Hidden on touch devices (no cursor).
 */
export function CursorGlow() {
  const { x, y } = useCursorPosition(0.15);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const check = () => setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isTouch) return null;

  return (
    <div
      className="fixed pointer-events-none z-50"
      aria-hidden="true"
      style={{
        left: x - 100,
        top: y - 100,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(255,182,193,0.15) 0%, rgba(196,159,255,0.08) 40%, transparent 70%)',
        transform: 'translate3d(0,0,0)',
        willChange: 'transform',
        mixBlendMode: 'screen',
      }}
    />
  );
}

export default CursorGlow;
