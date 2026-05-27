import React from 'react';
import { motion } from 'framer-motion';

/**
 * Decorative animated divider between sections.
 */
export function SectionDivider({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center py-8 ${className}`}>
      {/* Left line */}
      <motion.div
        className="flex-1 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,182,193,0.4))' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      {/* Center ornament */}
      <motion.div
        className="mx-4 flex items-center gap-2"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <span className="text-soft-pink text-lg">✦</span>
        <span className="text-lavender text-xl">♥</span>
        <span className="text-soft-pink text-lg">✦</span>
      </motion.div>

      {/* Right line */}
      <motion.div
        className="flex-1 h-px"
        style={{ background: 'linear-gradient(to left, transparent, rgba(255,182,193,0.4))' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  );
}

export default SectionDivider;
