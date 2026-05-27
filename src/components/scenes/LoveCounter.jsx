import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneWrapper } from '../layout/SceneWrapper';
import { useInterval } from '../../hooks/useInterval';
import { getDuration, getCountdown, pad, isFuture } from '../../utils/timeUtils';
import config from '../../data/config';

function CountUnit({ value, label }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="glass-pink rounded-2xl px-6 py-4 min-w-[80px] text-center"
        style={{ boxShadow: '0 0 20px rgba(255,182,193,0.15)' }}
      >
        <motion.span
          key={value}
          className="font-dancing text-5xl md:text-6xl block"
          style={{
            color: '#FFB6C1',
            textShadow: '0 0 15px rgba(255,182,193,0.8), 0 0 30px rgba(255,182,193,0.4)',
          }}
          initial={{ opacity: 0.6, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {pad(value)}
        </motion.span>
      </div>
      <span className="text-white/50 text-xs tracking-widest uppercase">{label}</span>
    </motion.div>
  );
}

export function LoveCounter() {
  const isCountdown = isFuture(config.relationshipStartDate);
  const [time, setTime] = useState(() =>
    isCountdown
      ? getCountdown(config.relationshipStartDate)
      : getDuration(config.relationshipStartDate)
  );

  useInterval(() => {
    setTime(
      isCountdown
        ? getCountdown(config.relationshipStartDate)
        : getDuration(config.relationshipStartDate)
    );
  }, 1000);

  return (
    <SceneWrapper id="love-counter" className="py-20 px-4 flex items-center justify-center">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-dancing text-5xl md:text-6xl gradient-text mb-4">
            {isCountdown ? 'Counting Down To Us' : 'We\'ve Been Together For'}
          </h2>
          <p className="text-white/40 text-sm tracking-widest">
            {isCountdown ? 'the adventure begins soon…' : 'every second, a treasure'}
          </p>
        </motion.div>

        {/* Counter units */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <CountUnit value={time.days} label="days" />
          <span className="text-soft-pink/40 text-4xl font-dancing mb-6">:</span>
          <CountUnit value={time.hours} label="hours" />
          <span className="text-soft-pink/40 text-4xl font-dancing mb-6">:</span>
          <CountUnit value={time.minutes} label="minutes" />
          <span className="text-soft-pink/40 text-4xl font-dancing mb-6">:</span>
          <CountUnit value={time.seconds} label="seconds" />
        </div>

        {/* Romantic note */}
        <motion.p
          className="mt-12 font-dancing text-2xl text-white/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          …and every single one has been worth it 💜
        </motion.p>
      </div>
    </SceneWrapper>
  );
}

export default LoveCounter;
