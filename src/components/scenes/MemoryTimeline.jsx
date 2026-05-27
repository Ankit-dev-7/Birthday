import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { HeartBurst } from '../ui/FloatingHeart';
import { SceneWrapper } from '../layout/SceneWrapper';
import { fadeInLeft, fadeInRight } from '../../animations/framerVariants';
import memories from '../../data/memories';

function MemoryCard({ memory, index, onOpen }) {
  const isLeft = index % 2 === 0;
  const variant = isLeft ? fadeInLeft : fadeInRight;

  return (
    <motion.div
      className={`relative flex w-full md:w-1/2 ${isLeft ? 'md:pr-8 md:self-start' : 'md:pl-8 md:self-end md:ml-auto'}`}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Timeline dot */}
      <div className="hidden md:flex absolute top-6 items-center justify-center"
        style={{ [isLeft ? 'right' : 'left']: '-1.25rem' }}>
        <motion.div
          className="w-4 h-4 rounded-full bg-soft-pink border-2 border-deep-purple"
          style={{ boxShadow: '0 0 10px #FFB6C1' }}
          whileInView={{ scale: [0, 1.3, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <GlassCard
        variant="pink"
        hover
        onClick={() => onOpen(memory, index)}
        className="w-full cursor-pointer group"
        layoutId={`memory-card-${memory.id}`}
      >
        {/* Photo */}
        <div className="relative overflow-hidden rounded-xl mb-4 aspect-video bg-deep-purple/50">
          <img
            src={memory.photos[0]}
            alt={memory.caption}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-4xl">${memory.emoji || '💜'}</div>`;
            }}
          />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-soft-pink/70 text-xs font-mono">{memory.date}</span>
          <span className="text-white/30 text-xs">•</span>
          <span className="text-lavender/70 text-xs">📍 {memory.location}</span>
        </div>

        <h3 className="font-dancing text-xl text-glowing-white mb-2 group-hover:text-soft-pink transition-colors">
          {memory.emoji} {memory.caption}
        </h3>
        <p className="text-white/60 text-sm line-clamp-2">{memory.description}</p>

        <div className="mt-3 text-soft-pink/50 text-xs">tap to open ✦</div>
      </GlassCard>
    </motion.div>
  );
}

function ExpandedMemory({ memory, onClose, burstPos }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <motion.div
        className="relative z-10 w-full max-w-2xl"
        layoutId={`memory-card-${memory.id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <GlassCard variant="pink" className="overflow-hidden">
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl z-10"
            onClick={onClose}
            aria-label="Close"
          >×</button>

          {/* Photo */}
          <div className="relative overflow-hidden rounded-xl mb-6 aspect-video bg-deep-purple/50">
            <img
              src={memory.photos[0]}
              alt={memory.caption}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-6xl">${memory.emoji || '💜'}</div>`;
              }}
            />
          </div>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-soft-pink text-sm font-mono">{memory.date}</span>
            <span className="text-white/30">•</span>
            <span className="text-lavender text-sm">📍 {memory.location}</span>
          </div>

          <h2 className="font-dancing text-3xl text-glowing-white mb-4">
            {memory.emoji} {memory.caption}
          </h2>
          <p className="text-white/80 leading-relaxed">{memory.description}</p>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

export function MemoryTimeline() {
  const [expanded, setExpanded] = useState(null);
  const [burstPos, setBurstPos] = useState(null);
  const [bursts, setBursts] = useState([]);

  const handleOpen = (memory, index) => {
    setExpanded(memory);
    // Spawn heart burst at center of screen
    const id = Date.now();
    setBursts((prev) => [...prev, { id, x: window.innerWidth / 2, y: window.innerHeight / 2 }]);
  };

  const handleClose = () => setExpanded(null);

  return (
    <SceneWrapper id="memory-timeline" className="py-20 px-4">
      {/* Heart bursts */}
      {bursts.map((b) => (
        <HeartBurst
          key={b.id}
          x={b.x}
          y={b.y}
          count={20}
          onDone={() => setBursts((prev) => prev.filter((p) => p.id !== b.id))}
        />
      ))}

      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-dancing text-5xl md:text-6xl gradient-text mb-4">
            Our Story
          </h2>
          <p className="text-white/50 text-sm tracking-widest uppercase">
            every moment, treasured forever
          </p>
        </motion.div>

        {/* Timeline line */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-soft-pink/30 to-transparent -translate-x-1/2" />

          <LayoutGroup>
            <div className="flex flex-col gap-12">
              {memories.map((memory, index) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  index={index}
                  onOpen={handleOpen}
                />
              ))}
            </div>

            <AnimatePresence>
              {expanded && (
                <ExpandedMemory
                  memory={expanded}
                  onClose={handleClose}
                />
              )}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </div>
    </SceneWrapper>
  );
}

export default MemoryTimeline;
