import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';

/**
 * Animated rain that morphs into falling hearts after 3 seconds.
 */
export function RainEffect({ active = true }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const { reducedMotion } = useApp();

  useEffect(() => {
    if (!active || reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    // Create drops
    const drops = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 3 + Math.random() * 5,
      length: 10 + Math.random() * 15,
      opacity: 0.3 + Math.random() * 0.5,
    }));

    startTimeRef.current = Date.now();

    const draw = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const morphProgress = Math.min(1, Math.max(0, (elapsed - 3) / 2)); // 0→1 over 2s starting at 3s

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drops.forEach((drop) => {
        drop.y += drop.speed;
        if (drop.y > canvas.height + 20) {
          drop.y = -20;
          drop.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.globalAlpha = drop.opacity * (1 - morphProgress * 0.3);

        if (morphProgress < 0.5) {
          // Draw rain line
          ctx.strokeStyle = `rgba(180, 200, 255, ${drop.opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x - 1, drop.y - drop.length);
          ctx.stroke();
        } else {
          // Draw heart
          ctx.fillStyle = `rgba(255, 182, 193, ${drop.opacity})`;
          ctx.font = `${12 + morphProgress * 6}px serif`;
          ctx.textAlign = 'center';
          ctx.fillText('♥', drop.x, drop.y);
        }

        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [active, reducedMotion]);

  if (!active || reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      aria-hidden="true"
    />
  );
}

export default RainEffect;
