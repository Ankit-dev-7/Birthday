import React from 'react';
import { motion } from 'framer-motion';
import { SceneWrapper } from '../layout/SceneWrapper';
import { AuroraEffect } from '../effects/AuroraEffect';

export function EndingScene() {
  return (
    <SceneWrapper id="ending" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Aurora background */}
      <AuroraEffect />

      {/* Deep space base */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse at center, #0d0020 0%, #000000 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Main quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <p
            className="font-dancing text-4xl md:text-6xl lg:text-7xl text-glowing-white leading-relaxed"
            style={{
              textShadow: '0 0 40px rgba(255,182,193,0.4), 0 0 80px rgba(196,159,255,0.2)',
            }}
          >
            In every universe,
            <br />
            <span className="gradient-text">I'd still choose you.</span>
          </p>
        </motion.div>

        {/* Floating heart */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div
            className="text-7xl"
            animate={{ y: [-10, 10, -10], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 20px rgba(255,182,193,0.8))' }}
          >
            💜
          </motion.div>

          <motion.p
            className="font-dancing text-3xl md:text-4xl"
            style={{
              color: '#FFB6C1',
              textShadow: '0 0 20px rgba(255,182,193,0.6)',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            Happy Birthday My Love ❤️
          </motion.p>

          {/* Decorative stars */}
          <motion.div
            className="flex gap-4 text-soft-pink/40 text-2xl mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 3 }}
          >
            {['✦', '♥', '✦', '♥', '✦'].map((s, i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                {s}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint at very bottom */}
        <motion.p
          className="mt-20 text-white/20 text-xs tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 4 }}
        >
          made with love, just for you
        </motion.p>
      </div>
    </SceneWrapper>
  );
}

export default EndingScene;
