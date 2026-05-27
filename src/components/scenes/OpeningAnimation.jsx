import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { StarField } from '../three/StarField';
import { PolaroidFrames } from '../three/PolaroidFrames';
import { useAudio } from '../../context/AudioContext';

/**
 * Opening animation: Three.js star zoom + floating polaroids.
 * Unmounts canvas after animation completes.
 */
export function OpeningAnimation({ onComplete }) {
  const { crossfadeTo } = useAudio();
  const completedRef = useRef(false);

  const handleZoomComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    // Crossfade to track 1 (romantic instrumental)
    crossfadeTo(1, 2000);
    // Slight delay then trigger main content
    setTimeout(() => onComplete?.(), 500);
  };

  return (
    <motion.div
      className="fixed inset-0 z-30 bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#000000' }}
      >
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <StarField onZoomComplete={handleZoomComplete} />
          <PolaroidFrames />
        </Suspense>
      </Canvas>

      {/* Overlay hint */}
      <motion.p
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-sm font-dancing tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 3, delay: 1, repeat: 1 }}
      >
        entering your world…
      </motion.p>
    </motion.div>
  );
}

export default OpeningAnimation;
