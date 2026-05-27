import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SceneWrapper } from '../layout/SceneWrapper';
import { useInView } from '../../hooks/useInView';
import { useApp } from '../../context/AppContext';
import { gsap } from 'gsap';
import config from '../../data/config';

const LETTER_LINES = [
  `My dearest ${config.partnerName},`,
  '',
  'I have been trying to find the right words for a long time now.',
  'Words that could hold the weight of everything I feel for you.',
  'But every time I try, language falls short.',
  'Because what I feel for you is bigger than any sentence I could write.',
  '',
  'I remember the first time I saw you.',
  'The way you smiled — not at me, just at something in the world —',
  'and I thought: I want to be near that kind of light.',
  'I had no idea then that you would become my favourite light.',
  'The one I look for in every room.',
  '',
  'You have this way of making everything feel softer.',
  'Hard days feel manageable when I know I get to come home to you.',
  'Ordinary moments become extraordinary just because you are in them.',
  'A Tuesday evening becomes a memory I will carry forever',
  'simply because you were laughing beside me.',
  '',
  'I love the way you love.',
  'Fiercely, quietly, completely.',
  'I love how you notice the small things.',
  'How you remember what matters to people.',
  'How you give so much of yourself without even realising it.',
  '',
  'I want you to know that being loved by you',
  'is the greatest privilege of my life.',
  'You make me want to be better.',
  'Not because you ask me to,',
  'but because you deserve someone who tries.',
  '',
  'On this birthday, I want you to know:',
  'You are seen. You are cherished. You are adored.',
  'Every single day, in every universe,',
  'I would choose you.',
  '',
  'Happy Birthday, my love.',
  'Thank you for existing.',
  'Thank you for being mine.',
  '',
  `Forever yours,`,
  config.yourName,
];

function Candle() {
  return (
    <div className="relative flex flex-col items-center select-none" aria-hidden="true">
      {/* Flame */}
      <div className="relative w-4 h-8 mb-0">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-6 rounded-full animate-flicker"
          style={{
            background: 'radial-gradient(ellipse at 50% 80%, #fff7a0, #ffb347, #ff6b35, transparent)',
            boxShadow: '0 0 12px 4px rgba(255,180,50,0.6), 0 0 24px 8px rgba(255,120,0,0.3)',
            transformOrigin: 'bottom center',
          }}
        />
        {/* Inner flame */}
        <div
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-3 rounded-full animate-flicker"
          style={{
            background: 'radial-gradient(ellipse, #ffffff, #fff7a0)',
            animationDelay: '0.2s',
          }}
        />
      </div>
      {/* Wick */}
      <div className="w-0.5 h-2 bg-gray-700 rounded-full" />
      {/* Candle body */}
      <div
        className="w-6 h-20 rounded-b-sm"
        style={{
          background: 'linear-gradient(to right, #f8e8d0, #fff5e6, #f0d8b8)',
          boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.1)',
        }}
      />
      {/* Wax drip */}
      <div
        className="absolute top-10 right-0 w-1.5 h-4 rounded-b-full"
        style={{ background: '#fff5e6' }}
      />
      {/* Glow */}
      <div
        className="absolute inset-0 -top-4 rounded-full pointer-events-none animate-pulse"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(255,180,50,0.2) 0%, transparent 70%)',
          width: '80px',
          height: '120px',
          left: '-28px',
        }}
      />
    </div>
  );
}

export function LoveLetter() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const paperRef = useRef(null);
  const [paperOpen, setPaperOpen] = useState(false);
  const { reducedMotion } = useApp();

  useEffect(() => {
    if (!isInView || paperOpen) return;

    if (reducedMotion) {
      setPaperOpen(true);
      return;
    }

    if (!paperRef.current) return;

    gsap.fromTo(
      paperRef.current,
      { scaleY: 0, transformOrigin: 'top center', opacity: 0 },
      {
        scaleY: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        onComplete: () => setPaperOpen(true),
      }
    );
  }, [isInView, reducedMotion, paperOpen]);

  return (
    <SceneWrapper id="love-letter" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-dancing text-5xl md:text-6xl gradient-text mb-4">
            A Letter For You
          </h2>
        </motion.div>

        {/* Letter + Candle layout */}
        <div ref={ref} className="flex gap-6 items-start justify-center">
          {/* Candle */}
          <div className="hidden sm:block flex-shrink-0 mt-8">
            <Candle />
          </div>

          {/* Paper */}
          <div
            ref={paperRef}
            className="flex-1 relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(248,240,255,0.06) 0%, rgba(255,182,193,0.04) 100%)',
              border: '1px solid rgba(255,182,193,0.15)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
              transformOrigin: 'top center',
            }}
          >
            {/* Paper texture lines */}
            <div className="absolute inset-0 pointer-events-none opacity-5"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(255,182,193,0.5) 27px, rgba(255,182,193,0.5) 28px)',
                backgroundPositionY: '40px',
              }}
            />

            <div className="relative p-8 md:p-12">
              {LETTER_LINES.map((line, i) => (
                <motion.p
                  key={i}
                  className={`font-dancing leading-relaxed ${
                    i === 0
                      ? 'text-2xl text-soft-pink mb-4'
                      : line === ''
                      ? 'mb-3'
                      : i >= LETTER_LINES.length - 2
                      ? 'text-xl text-soft-pink mt-2'
                      : 'text-lg text-glowing-white/85'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={paperOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{
                    duration: 0.4,
                    delay: reducedMotion ? 0 : i * 0.08,
                    ease: 'easeOut',
                  }}
                >
                  {line || '\u00A0'}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Second candle (right side, desktop) */}
          <div className="hidden md:block flex-shrink-0 mt-8">
            <Candle />
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
}

export default LoveLetter;
