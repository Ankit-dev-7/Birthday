import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { randomInRange, computeParticleVelocityDelta } from '../../utils/mathUtils';

const PARTICLE_TYPES = ['star', 'petal', 'heart', 'butterfly'];
const EMOJIS = { star: '✦', petal: '🌸', heart: '♥', butterfly: '🦋' };
const COLORS = {
  star: '#f8f0ff',
  petal: '#FFB6C1',
  heart: '#ff8fa3',
  butterfly: '#c49fff',
};

function createParticle(canvasWidth, canvasHeight) {
  const type = PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)];
  return {
    type,
    x: randomInRange(0, canvasWidth),
    y: randomInRange(0, canvasHeight),
    vx: randomInRange(-0.3, 0.3),
    vy: randomInRange(-0.5, -0.1),
    size: randomInRange(8, 18),
    opacity: randomInRange(0.3, 0.8),
    rotation: randomInRange(0, 360),
    rotationSpeed: randomInRange(-1, 1),
    life: 1,
    decay: randomInRange(0.001, 0.003),
  };
}

export function ParticleSystem() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const cursorRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef(null);
  const { reducedMotion } = useApp();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Track cursor
    const onMouseMove = (e) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Determine particle count based on viewport
    const getCount = () => (window.innerWidth < 768 ? 60 : 180);

    // Initialise particles
    particlesRef.current = Array.from({ length: getCount() }, () =>
      createParticle(canvas.width, canvas.height)
    );

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        // Cursor proximity repulsion
        const delta = computeParticleVelocityDelta(p, cursorRef.current, 100, 1.5);
        p.vx += delta.vx * 0.05;
        p.vy += delta.vy * 0.05;

        // Dampen velocity
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Move
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.life -= p.decay;

        // Wrap around edges
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // Reset faded particles
        if (p.life <= 0) {
          particlesRef.current[i] = createParticle(canvas.width, canvas.height);
          return;
        }

        // Draw
        ctx.save();
        ctx.globalAlpha = p.opacity * p.life;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.font = `${p.size}px serif`;
        ctx.fillStyle = COLORS[p.type];
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(EMOJIS[p.type], 0, 0);
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  );
}

export default ParticleSystem;
