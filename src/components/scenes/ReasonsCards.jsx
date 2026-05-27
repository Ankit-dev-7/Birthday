import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneWrapper } from '../layout/SceneWrapper';
import { ProgressDots } from '../ui/ProgressDots';
import { useApp } from '../../context/AppContext';
import reasons from '../../data/reasons';

const CARD_COLORS = {
  pink: { bg: 'rgba(255,182,193,0.12)', border: 'rgba(255,182,193,0.3)', glow: '#FFB6C1' },
  purple: { bg: 'rgba(196,159,255,0.12)', border: 'rgba(196,159,255,0.3)', glow: '#c49fff' },
  lavender: { bg: 'rgba(230,230,250,0.1)', border: 'rgba(230,230,250,0.25)', glow: '#E6E6FA' },
};

function ReasonCard({ reason, isRevealed, onReveal }) {
  const colors = CARD_COLORS[reason.color] || CARD_COLORS.pink;

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ perspective: '1000px', width: '100%', height: '180px' }}
      onClick={!isRevealed ? onReveal : undefined}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && !isRevealed && onReveal()}
      aria-label={isRevealed ? reason.text : 'Click to reveal a reason'}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          <span className="text-4xl">💜</span>
          <p className="text-white/40 text-sm tracking-widest uppercase">tap to reveal</p>
          <div className="w-8 h-0.5 bg-soft-pink/30 rounded-full" />
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3 p-6 text-center"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${colors.glow}22`,
          }}
        >
          <span className="text-3xl">{reason.emoji}</span>
          <p className="font-dancing text-lg text-glowing-white leading-snug">{reason.text}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function ReasonsCards() {
  const { revealedReasons, revealReason } = useApp();
  const [showCompletion, setShowCompletion] = useState(false);

  const handleReveal = (id) => {
    revealReason(id);
    // Play chime sound (web audio fallback)
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880 + Math.random() * 440;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } catch {}

    if (revealedReasons.size + 1 >= reasons.length) {
      setTimeout(() => setShowCompletion(true), 800);
    }
  };

  const revealedCount = revealedReasons.size;

  return (
    <SceneWrapper id="reasons" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-dancing text-5xl md:text-6xl gradient-text mb-4">
            Reasons I Love You
          </h2>
          <p className="text-white/50 text-sm">
            {revealedCount} of {reasons.length} revealed
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-10">
          <ProgressDots total={reasons.length} filled={revealedCount} />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <ReasonCard
                reason={reason}
                isRevealed={revealedReasons.has(reason.id)}
                onReveal={() => handleReveal(reason.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Completion overlay */}
        <AnimatePresence>
          {showCompletion && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCompletion(false)}
            >
              <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
              <motion.div
                className="relative z-10 text-center p-10 rounded-3xl glass-pink max-w-md mx-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15 }}
              >
                <div className="text-6xl mb-4">💜</div>
                <h3 className="font-dancing text-4xl gradient-text mb-4">
                  You found them all!
                </h3>
                <p className="text-white/70 leading-relaxed">
                  And there are a million more reasons I love you that I could never fit on a card.
                  You are simply everything.
                </p>
                <button
                  className="mt-6 px-6 py-2 rounded-full glass text-soft-pink text-sm border border-soft-pink/30"
                  onClick={() => setShowCompletion(false)}
                >
                  ♥ Thank you
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneWrapper>
  );
}

export default ReasonsCards;
