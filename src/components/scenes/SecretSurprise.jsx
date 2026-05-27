import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { SceneWrapper } from '../layout/SceneWrapper';
import { useApp } from '../../context/AppContext';
import { gsap } from 'gsap';

const SECRET_MESSAGE = "You are the most extraordinary person I have ever known. Every day with you is a gift I never take for granted. I love you more than words could ever hold — today, tomorrow, and in every lifetime that comes after this one. 💜";

const REVEAL_TEXT = "I Love You Forever";

export function SecretSurprise() {
  const { secretUnlocked, unlockSecret } = useApp();
  const [showReveal, setShowReveal] = useState(secretUnlocked);
  const leftHalfRef = useRef(null);
  const rightHalfRef = useRef(null);

  const fireConfetti = () => {
    const duration = 3500;
    const end = Date.now() + duration;
    const colors = ['#FFB6C1', '#c49fff', '#E6E6FA', '#ff8fa3', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const handleUnlock = () => {
    if (!secretUnlocked) {
      unlockSecret();
      // Animate heart halves
      if (leftHalfRef.current && rightHalfRef.current) {
        gsap.to(leftHalfRef.current, { rotation: -45, x: -20, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' });
        gsap.to(rightHalfRef.current, { rotation: 45, x: 20, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' });
      }
      setTimeout(() => {
        fireConfetti();
        setShowReveal(true);
      }, 400);
    } else {
      // Replay reveal
      fireConfetti();
      setShowReveal(true);
    }
  };

  return (
    <SceneWrapper id="secret-surprise" className="py-20 px-4 flex items-center justify-center min-h-screen">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-dancing text-5xl md:text-6xl gradient-text mb-4">
            A Secret For You
          </h2>
          <p className="text-white/50 text-sm">something locked away, just for you</p>
        </motion.div>

        {/* Locked heart button */}
        <AnimatePresence mode="wait">
          {!showReveal ? (
            <motion.div
              key="locked"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <motion.button
                className="relative w-32 h-32 flex items-center justify-center cursor-pointer"
                animate={{
                  filter: [
                    'drop-shadow(0 0 10px rgba(255,182,193,0.5))',
                    'drop-shadow(0 0 25px rgba(255,182,193,0.9))',
                    'drop-shadow(0 0 10px rgba(255,182,193,0.5))',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUnlock}
                aria-label="Unlock secret surprise"
              >
                {/* Heart halves */}
                <div className="relative text-8xl select-none">
                  <span ref={leftHalfRef} className="inline-block" style={{ clipPath: 'inset(0 50% 0 0)' }}>💜</span>
                  <span ref={rightHalfRef} className="absolute inset-0 inline-block" style={{ clipPath: 'inset(0 0 0 50%)' }}>💜</span>
                </div>
                {/* Lock icon */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl">🔒</div>
              </motion.button>

              <motion.p
                className="text-white/40 text-sm tracking-widest"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                tap the heart to unlock
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              className="flex flex-col items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Animated "I Love You Forever" */}
              <div className="flex flex-wrap justify-center gap-0">
                {REVEAL_TEXT.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    className="font-dancing text-4xl md:text-5xl"
                    style={{
                      color: char === ' ' ? 'transparent' : '#FFB6C1',
                      textShadow: char !== ' ' ? '0 0 20px rgba(255,182,193,0.8)' : 'none',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>

              {/* Floating heart */}
              <motion.div
                className="text-6xl"
                animate={{ y: [-8, 8, -8], scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                💜
              </motion.div>

              {/* Secret message */}
              <motion.div
                className="glass-pink rounded-2xl p-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <p className="font-dancing text-xl text-glowing-white/90 leading-relaxed text-center">
                  {SECRET_MESSAGE}
                </p>
              </motion.div>

              {/* Replay button */}
              <motion.button
                className="text-white/30 text-sm hover:text-soft-pink transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={fireConfetti}
              >
                ✦ celebrate again ✦
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneWrapper>
  );
}

export default SecretSurprise;
