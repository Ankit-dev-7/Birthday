import React, { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneWrapper } from '../layout/SceneWrapper';

// Lazy load Three.js gift box
const ThreeGiftBox = React.lazy(() =>
  import('@react-three/fiber').then((fiber) => {
    const { Canvas } = fiber;
    return import('../three/GiftBox3D').then(({ GiftBox3D }) => ({
      default: function ThreeCanvas({ onOpen }) {
        return (
          <Canvas camera={{ position: [0, 1, 4], fov: 50 }} style={{ height: '300px' }}>
            <ambientLight intensity={0.8} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#FFB6C1" />
            <pointLight position={[-5, 3, 3]} intensity={0.5} color="#c49fff" />
            <GiftBox3D onOpen={onOpen} />
          </Canvas>
        );
      },
    }));
  })
);

// CSS 3D fallback
function CSSGiftBox({ onOpen }) {
  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    if (!opened) { setOpened(true); setTimeout(onOpen, 600); }
  };

  return (
    <div className="flex justify-center items-center h-48 cursor-pointer" onClick={handleClick}>
      <motion.div
        className="relative w-32 h-32"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Box */}
        <div className="absolute inset-0 rounded-xl glass-pink border border-soft-pink/30 flex items-center justify-center text-5xl">
          🎁
        </div>
        {/* Lid */}
        <motion.div
          className="absolute -top-4 left-0 right-0 h-10 rounded-t-xl glass border border-soft-pink/30 flex items-center justify-center"
          animate={opened ? { rotateX: -120, y: -20, opacity: 0 } : { rotateX: 0 }}
          style={{ transformOrigin: 'bottom center' }}
          transition={{ duration: 0.6, ease: 'backOut' }}
        >
          <div className="w-full h-1 bg-soft-pink/50 rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}

const GIFT_MESSAGE = "Inside this box is every dream I have for us — every adventure we haven't taken yet, every laugh we haven't shared, every quiet morning still to come. The best gift I can give you is a lifetime of choosing you. 💜";

export function GiftBox() {
  const [opened, setOpened] = useState(false);
  const [webglSupported] = useState(() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch { return false; }
  });

  return (
    <SceneWrapper id="gift-box" className="py-16 px-4">
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-dancing text-4xl gradient-text mb-2">A Gift For You</h2>
          <p className="text-white/40 text-sm">click to open 🎁</p>
        </motion.div>

        <div className="glass-pink rounded-3xl p-8">
          {webglSupported ? (
            <Suspense fallback={<CSSGiftBox onOpen={() => setOpened(true)} />}>
              <ThreeGiftBox onOpen={() => setOpened(true)} />
            </Suspense>
          ) : (
            <CSSGiftBox onOpen={() => setOpened(true)} />
          )}

          <AnimatePresence>
            {opened && (
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <p className="font-dancing text-xl text-glowing-white/90 leading-relaxed">
                  {GIFT_MESSAGE}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SceneWrapper>
  );
}

export default GiftBox;
