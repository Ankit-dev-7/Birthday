import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneWrapper } from '../layout/SceneWrapper';
import { useApp } from '../../context/AppContext';
import { drawConstellationLine, createSparkleBurst } from '../../animations/gsapTimelines';
import stars from '../../data/stars';
import config from '../../data/config';

const constellationStars = stars
  .filter((s) => s.isConstellation)
  .sort((a, b) => a.constellationOrder - b.constellationOrder);

const regularStars = stars.filter((s) => !s.isConstellation);

function StarDot({ star, onClick, isConstellationClicked }) {
  const sizeMap = { 1: 6, 2: 9, 3: 12, 4: 16 };
  const size = sizeMap[star.size] || 8;
  const delay = Math.random() * 3;

  return (
    <motion.button
      className="absolute rounded-full cursor-pointer focus:outline-none"
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
        width: size,
        height: size,
        background: star.isConstellation
          ? isConstellationClicked
            ? '#FFB6C1'
            : 'rgba(255,182,193,0.6)'
          : 'rgba(248,240,255,0.8)',
        boxShadow: star.isConstellation
          ? isConstellationClicked
            ? '0 0 12px #FFB6C1, 0 0 24px rgba(255,182,193,0.6)'
            : '0 0 6px rgba(255,182,193,0.4)'
          : '0 0 4px rgba(248,240,255,0.6)',
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        opacity: [0.6, 1, 0.6],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
      onClick={() => onClick(star)}
      aria-label={`Star: ${star.message}`}
    />
  );
}

export function NightSky() {
  const [activeMessage, setActiveMessage] = useState(null);
  const [activeStar, setActiveStar] = useState(null);
  const { constellationProgress, constellationComplete, addConstellationStar } = useApp();
  const svgRef = useRef(null);
  const sparkleRefs = useRef([]);

  const handleStarClick = (star) => {
    setActiveStar(star);
    setActiveMessage(star.message);

    if (star.isConstellation) {
      const expectedOrder = constellationProgress.length + 1;
      if (star.constellationOrder === expectedOrder) {
        addConstellationStar(star.id, constellationStars.length);

        // Draw line to previous star
        if (constellationProgress.length > 0 && svgRef.current) {
          const prevStar = constellationStars[constellationProgress.length - 1];
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          const container = svgRef.current.getBoundingClientRect();
          const x1 = (prevStar.x / 100) * container.width;
          const y1 = (prevStar.y / 100) * container.height;
          const x2 = (star.x / 100) * container.width;
          const y2 = (star.y / 100) * container.height;
          path.setAttribute('d', `M ${x1} ${y1} L ${x2} ${y2}`);
          path.setAttribute('stroke', '#FFB6C1');
          path.setAttribute('stroke-width', '1.5');
          path.setAttribute('fill', 'none');
          path.setAttribute('opacity', '0.7');
          svgRef.current.appendChild(path);
          drawConstellationLine(path, 0.6);
        }

        // Sparkle on completion
        if (constellationProgress.length + 1 >= constellationStars.length) {
          setTimeout(() => {
            const els = sparkleRefs.current.filter(Boolean);
            if (els.length) createSparkleBurst(els);
          }, 300);
        }
      }
    }
  };

  return (
    <SceneWrapper id="night-sky" className="py-20 px-4 min-h-screen relative overflow-hidden">
      {/* Deep space background */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, #0d0020 0%, #000000 100%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-dancing text-5xl md:text-6xl gradient-text mb-4">Our Night Sky</h2>
          <p className="text-white/40 text-sm">
            click the stars to discover messages •{' '}
            <span className="text-soft-pink/60">find the constellation to spell "{config.constellationName}"</span>
          </p>
        </motion.div>

        {/* Constellation progress */}
        <div className="text-center mb-4">
          <p className="text-white/30 text-xs">
            Constellation: {constellationProgress.length}/{constellationStars.length} stars found
            {constellationComplete && ' ✦ Complete!'}
          </p>
        </div>

        {/* Star field */}
        <div className="relative w-full" style={{ height: '60vh', minHeight: '400px' }}>
          {/* SVG for constellation lines */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 2 }}
          />

          {/* Regular stars */}
          {regularStars.map((star) => (
            <StarDot
              key={star.id}
              star={star}
              onClick={handleStarClick}
              isConstellationClicked={false}
            />
          ))}

          {/* Constellation stars */}
          {constellationStars.map((star) => (
            <StarDot
              key={star.id}
              star={star}
              onClick={handleStarClick}
              isConstellationClicked={constellationProgress.includes(star.id)}
            />
          ))}

          {/* Sparkle elements for completion */}
          {constellationComplete && constellationStars.map((star, i) => (
            <div
              key={`sparkle-${i}`}
              ref={(el) => (sparkleRefs.current[i] = el)}
              className="absolute pointer-events-none text-soft-pink text-lg"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >✦</div>
          ))}
        </div>

        {/* Constellation complete message */}
        <AnimatePresence>
          {constellationComplete && (
            <motion.div
              className="text-center mt-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
            >
              <p className="font-dancing text-3xl gradient-text">
                ✦ {config.constellationName} ✦
              </p>
              <p className="text-white/50 text-sm mt-2">You found our constellation 💜</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Star message tooltip */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass-pink rounded-2xl p-5 text-center relative">
              <button
                className="absolute top-2 right-3 text-white/30 hover:text-white/60 text-lg"
                onClick={() => setActiveMessage(null)}
                aria-label="Close"
              >×</button>
              <p className="text-2xl mb-2">✦</p>
              <p className="font-dancing text-lg text-glowing-white leading-snug">{activeMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SceneWrapper>
  );
}

export default NightSky;
