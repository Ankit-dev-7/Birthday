import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';

const EASTER_EGG_DATA = {
  'ee-1': {
    message: 'You found a secret! 🌸 Did you know I fell for you before I even realised it was happening?',
    animation: 'rainbow',
  },
  'ee-2': {
    message: 'Another secret! ✨ Every time I look at you, I think — how did I get this lucky?',
    animation: 'hearts',
  },
  'ee-3': {
    message: 'Last secret! 💜 You are, without question, the best thing that has ever happened to me.',
    animation: 'sparkle',
  },
};

/**
 * Wraps any decorative element to make it an easter egg.
 * Usage: <EasterEgg id="ee-1"><YourDecorativeElement /></EasterEgg>
 */
export function EasterEgg({ id, children, className = '' }) {
  const { triggeredEasterEggs, triggerEasterEgg } = useApp();
  const [showMessage, setShowMessage] = useState(false);
  const data = EASTER_EGG_DATA[id];

  const handleClick = () => {
    if (!data) return;
    triggerEasterEgg(id);
    setShowMessage(true);

    // Trigger animation based on type
    if (data.animation === 'rainbow') {
      confetti({ particleCount: 80, spread: 100, colors: ['#FFB6C1', '#c49fff', '#E6E6FA', '#ff8fa3'] });
    } else if (data.animation === 'hearts') {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 20,
            angle: 60 + i * 15,
            spread: 40,
            origin: { x: Math.random(), y: Math.random() * 0.5 },
            shapes: ['circle'],
            colors: ['#FFB6C1', '#ff8fa3'],
          });
        }, i * 200);
      }
    } else if (data.animation === 'sparkle') {
      confetti({ particleCount: 120, spread: 180, startVelocity: 20, colors: ['#f8f0ff', '#FFB6C1', '#c49fff'] });
    }

    setTimeout(() => setShowMessage(false), 4000);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className="cursor-pointer"
        onClick={handleClick}
        title={triggeredEasterEggs.has(id) ? '✦ found!' : undefined}
      >
        {children}
        {triggeredEasterEggs.has(id) && (
          <span className="absolute -top-1 -right-1 text-xs text-soft-pink/60">✦</span>
        )}
      </div>

      <AnimatePresence>
        {showMessage && data && (
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-sm w-full px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <div className="glass-pink rounded-2xl p-6 text-center">
              <p className="text-2xl mb-3">🥚</p>
              <p className="font-dancing text-xl text-glowing-white leading-relaxed">{data.message}</p>
              <button
                className="mt-4 text-white/30 text-sm hover:text-white/60"
                onClick={() => setShowMessage(false)}
              >
                close ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default EasterEgg;
