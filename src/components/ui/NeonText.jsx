import React from 'react';
import { motion } from 'framer-motion';

/**
 * Glowing neon text primitive.
 * @param {string} color - 'pink' | 'purple' | 'white' | 'gradient'
 * @param {string} as - HTML tag to render ('h1','h2','p','span', etc.)
 */
export function NeonText({
  children,
  color = 'pink',
  as: Tag = 'span',
  className = '',
  animate = false,
  ...props
}) {
  const colorClass = {
    pink: 'neon-pink',
    purple: 'neon-purple',
    white: 'neon-white',
    gradient: 'gradient-text',
  }[color] || 'neon-pink';

  const pulseAnimation = animate
    ? {
        animate: {
          textShadow: [
            '0 0 10px #FFB6C1, 0 0 20px #FFB6C1',
            '0 0 20px #FFB6C1, 0 0 40px #FFB6C1, 0 0 60px rgba(255,182,193,0.5)',
            '0 0 10px #FFB6C1, 0 0 20px #FFB6C1',
          ],
          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        },
      }
    : {};

  return (
    <motion.span
      as={Tag}
      className={`${colorClass} ${className}`}
      {...pulseAnimation}
      {...props}
    >
      {children}
    </motion.span>
  );
}

export default NeonText;
