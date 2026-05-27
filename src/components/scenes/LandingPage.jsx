import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHRASES = [
  'Hey baby…',
  'Today is not just another day…',
  "It's the day the universe gave me you.",
];

export function LandingPage({ onReveal }) {
  const textRef = useRef(null);
  const [displayText, setDisplayText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [showMuteHint, setShowMuteHint] = useState(false);
  const phaseRef = useRef(0);
  const charRef = useRef(0);
  const timerRef = useRef(null);

  // Pure JS typing animation — no GSAP dependency
  useEffect(() => {
    let cancelled = false;

    const typePhrase = (phraseIndex) => {
      if (cancelled || phraseIndex >= PHRASES.length) {
        if (!cancelled) {
          setTimeout(() => setShowButton(true), 600);
        }
        return;
      }

      const phrase = PHRASES[phraseIndex];
      let charIndex = 0;

      const typeChar = () => {
        if (cancelled) return;
        if (charIndex <= phrase.length) {
          setDisplayText(phrase.slice(0, charIndex));
          charIndex++;
          timerRef.current = setTimeout(typeChar, 55);
        } else {
          // Pause then clear (except last phrase)
          if (phraseIndex < PHRASES.length - 1) {
            timerRef.current = setTimeout(() => {
              if (cancelled) return;
              // Clear text
              let clearIndex = phrase.length;
              const clearChar = () => {
                if (cancelled) return;
                if (clearIndex >= 0) {
                  setDisplayText(phrase.slice(0, clearIndex));
                  clearIndex--;
                  timerRef.current = setTimeout(clearChar, 25);
                } else {
                  timerRef.current = setTimeout(() => typePhrase(phraseIndex + 1), 300);
                }
              };
              clearChar();
            }, 1600);
          } else {
            // Last phrase — just show button
            timerRef.current = setTimeout(() => setShowButton(true), 800);
          }
        }
      };

      typeChar();
    };

    // Start after brief delay
    timerRef.current = setTimeout(() => typePhrase(0), 500);

    return () => {
      cancelled = true;
      clearTimeout(timerRef.current);
    };
  }, []);

  // Show mute hint after 3s
  useEffect(() => {
    const t = setTimeout(() => setShowMuteHint(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black"
      style={{ zIndex: 100 }}
    >
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Mute hint */}
      <AnimatePresence>
        {showMuteHint && (
          <motion.div
            className="absolute top-6 right-6 text-white/30 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 110 }}
          >
            🎵 add music to public/audio/
          </motion.div>
        )}
      </AnimatePresence>

      {/* Typing text */}
      <div className="relative text-center px-6 max-w-2xl" style={{ zIndex: 101 }}>
        <p
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: 'clamp(1.5rem, 5vw, 3rem)',
            color: '#f8f0ff',
            textShadow: '0 0 30px rgba(255,182,193,0.5)',
            lineHeight: 1.6,
            minHeight: '4rem',
          }}
        >
          {displayText}
          {/* Blinking cursor */}
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1em',
              background: '#FFB6C1',
              marginLeft: '4px',
              verticalAlign: 'middle',
              animation: 'blink 1s step-end infinite',
            }}
          />
        </p>
      </div>

      {/* CTA Button */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            className="mt-16"
            style={{ zIndex: 101 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.button
              onClick={onReveal}
              style={{
                padding: '16px 40px',
                borderRadius: '9999px',
                fontFamily: '"Dancing Script", cursive',
                fontSize: '1.25rem',
                color: '#ffffff',
                background: 'rgba(255,182,193,0.12)',
                border: '1px solid rgba(255,182,193,0.5)',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer',
              }}
              animate={{
                boxShadow: [
                  '0 0 15px rgba(255,182,193,0.4), 0 0 30px rgba(255,182,193,0.2)',
                  '0 0 30px rgba(255,182,193,0.8), 0 0 60px rgba(255,182,193,0.4)',
                  '0 0 15px rgba(255,182,193,0.4), 0 0 30px rgba(255,182,193,0.2)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              Open Your Surprise 💜
            </motion.button>

            <motion.p
              className="text-center mt-4"
              style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              tap to begin
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient decorative symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {['♥', '✦', '✦', '♥', '✦', '♥'].map((sym, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: `${10 + i * 16}%`,
              top: `${15 + (i % 3) * 25}%`,
              fontSize: `${10 + i * 3}px`,
              color: 'rgba(255,182,193,0.15)',
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            {sym}
          </span>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
