import React from 'react';
import { motion } from 'framer-motion';

/**
 * Filled/empty dot progress indicator.
 * @param {number} total - total number of dots
 * @param {number} filled - number of filled dots
 * @param {string} color - dot color (Tailwind or hex)
 */
export function ProgressDots({ total, filled, color = '#FFB6C1', className = '' }) {
  return (
    <div
      className={`flex flex-wrap gap-1.5 justify-center ${className}`}
      role="progressbar"
      aria-valuenow={filled}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`${filled} of ${total} revealed`}
    >
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: 8,
            height: 8,
            backgroundColor: i < filled ? color : 'rgba(255,255,255,0.15)',
            boxShadow: i < filled ? `0 0 6px ${color}` : 'none',
          }}
          initial={false}
          animate={
            i < filled
              ? { scale: [1, 1.4, 1], transition: { duration: 0.3 } }
              : { scale: 1 }
          }
        />
      ))}
    </div>
  );
}

export default ProgressDots;
