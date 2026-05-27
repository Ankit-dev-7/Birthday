import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneWrapper } from '../layout/SceneWrapper';
import { useInterval } from '../../hooks/useInterval';
import quotes from '../../data/quotes';

export function AILoveQuotes() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useInterval(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIndex((i) => (i + 1) % quotes.length);
      setIsVisible(true);
    }, 600);
  }, 8000);

  const quote = quotes[index];

  return (
    <SceneWrapper id="love-quotes" className="py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-dancing text-4xl gradient-text mb-2">Words of Love</h2>
          <p className="text-white/40 text-sm">timeless words for a timeless love</p>
        </motion.div>

        <div className="glass-pink rounded-3xl p-10 min-h-[200px] flex flex-col items-center justify-center relative overflow-hidden">
          {/* Decorative quotes */}
          <span className="absolute top-4 left-6 text-soft-pink/20 text-6xl font-serif leading-none">"</span>
          <span className="absolute bottom-4 right-6 text-soft-pink/20 text-6xl font-serif leading-none">"</span>

          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <p className="font-dancing text-2xl md:text-3xl text-glowing-white/90 leading-relaxed mb-4">
                  {quote.text}
                </p>
                <p className="text-soft-pink/60 text-sm">— {quote.author}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex gap-1.5 mt-6">
            {quotes.map((_, i) => (
              <button
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  background: i === index ? '#FFB6C1' : 'rgba(255,255,255,0.15)',
                  boxShadow: i === index ? '0 0 6px #FFB6C1' : 'none',
                }}
                onClick={() => { setIndex(i); setIsVisible(true); }}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
}

export default AILoveQuotes;
