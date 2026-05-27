import { useState, useEffect, useRef } from 'react';

/**
 * Tracks the cursor position with a smooth lerp (easing) applied via RAF.
 * Returns { x, y } — the smoothed cursor position in pixels.
 * @param {number} lerpFactor - 0–1, lower = smoother/slower. Default 0.15 (~50ms lag)
 */
export function useCursorPosition(lerpFactor = 0.15) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rawPos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      rawPos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const dx = rawPos.current.x - smoothPos.current.x;
      const dy = rawPos.current.y - smoothPos.current.y;

      // Only update state if movement is significant (avoid unnecessary re-renders)
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        smoothPos.current = {
          x: smoothPos.current.x + dx * lerpFactor,
          y: smoothPos.current.y + dy * lerpFactor,
        };
        setPosition({ ...smoothPos.current });
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [lerpFactor]);

  return position;
}

export default useCursorPosition;
