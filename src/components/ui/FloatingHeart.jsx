import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * A single floating heart that animates upward and fades out.
 * Removes itself from DOM after animation completes.
 */
export function FloatingHeart({ x = 0, y = 0, size = 24, color = '#FFB6C1', onDone }) {
  const [visible, setVisible] = useState(true);

  const randomX = (Math.random() - 0.5) * 60; // drift left/right

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed z-50 select-none"
          style={{ left: x, top: y, fontSize: size }}
          initial={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          animate={{ opacity: 0, y: -120, x: randomX, scale: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          onAnimationComplete={() => {
            setVisible(false);
            onDone?.();
          }}
        >
          <span style={{ color }}>♥</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Spawns a burst of floating hearts at a given position.
 */
export function HeartBurst({ x, y, count = 12, onDone }) {
  const [hearts, setHearts] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: `heart-${Date.now()}-${i}`,
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 20,
      size: 16 + Math.random() * 16,
      color: ['#FFB6C1', '#c49fff', '#E6E6FA', '#ff8fa3'][Math.floor(Math.random() * 4)],
    }))
  );

  const removeHeart = (id) => {
    setHearts((prev) => {
      const next = prev.filter((h) => h.id !== id);
      if (next.length === 0) onDone?.();
      return next;
    });
  };

  return (
    <>
      {hearts.map((h) => (
        <FloatingHeart
          key={h.id}
          x={h.x}
          y={h.y}
          size={h.size}
          color={h.color}
          onDone={() => removeHeart(h.id)}
        />
      ))}
    </>
  );
}

export default FloatingHeart;
