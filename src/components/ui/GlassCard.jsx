import React from 'react';
import { motion } from 'framer-motion';

/**
 * Glassmorphism card primitive.
 * Wraps children in a frosted-glass styled container.
 */
export function GlassCard({
  children,
  className = '',
  variant = 'default', // 'default' | 'pink' | 'purple'
  hover = false,
  onClick,
  layoutId,
  ...props
}) {
  const variantClass = {
    default: 'glass',
    pink: 'glass-pink',
    purple: 'glass-purple',
  }[variant] || 'glass';

  const hoverProps = hover
    ? { whileHover: { scale: 1.02, transition: { duration: 0.2 } } }
    : {};

  return (
    <motion.div
      className={`${variantClass} rounded-2xl p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      layoutId={layoutId}
      {...hoverProps}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;
