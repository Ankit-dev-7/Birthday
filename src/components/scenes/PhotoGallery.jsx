import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneWrapper } from '../layout/SceneWrapper';
import photos from '../../data/photos';

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%231a0533'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23FFB6C1' font-size='40'%3E%E2%99%A5%3C/text%3E%3C/svg%3E";

function GalleryPhoto({ photo, index, onOpen }) {
  const isFloating = index % 5 === 0;

  return (
    <motion.div
      className={`break-inside-avoid mb-4 cursor-pointer group relative overflow-hidden rounded-xl ${isFloating ? 'animate-float-slow' : ''}`}
      style={{ animationDelay: `${index * 0.3}s` }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.03, zIndex: 10 }}
      onClick={() => onOpen(index)}
      layoutId={`photo-${photo.id}`}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        className="w-full h-auto block rounded-xl transition-all duration-500 group-hover:brightness-110"
        loading="lazy"
        decoding="async"
        onError={(e) => { e.target.src = PLACEHOLDER; }}
        style={{
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
        style={{ background: 'linear-gradient(to top, rgba(26,5,51,0.8) 0%, transparent 60%)' }}>
        {photo.caption && (
          <p className="text-white/90 text-sm font-dancing">{photo.caption}</p>
        )}
      </div>
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,182,193,0.4), 0 0 20px rgba(255,182,193,0.2)' }} />
    </motion.div>
  );
}

function Lightbox({ photos, activeIndex, onClose, onNext, onPrev }) {
  const photo = photos[activeIndex];

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onNext, onPrev, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Blurred backdrop */}
      <div className="absolute inset-0 backdrop-blur-xl bg-black/70" />

      {/* Image */}
      <motion.div
        className="relative z-10 max-w-4xl max-h-[85vh] mx-4"
        layoutId={`photo-${photo.id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-w-full max-h-[80vh] object-contain rounded-2xl"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(255,182,193,0.1)' }}
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />
        {photo.caption && (
          <p className="text-center text-white/70 font-dancing text-xl mt-3">{photo.caption}</p>
        )}
      </motion.div>

      {/* Navigation */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:scale-110 transition-all"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous photo"
      >‹</button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:scale-110 transition-all"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next photo"
      >›</button>

      {/* Close */}
      <button
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white text-xl"
        onClick={onClose}
        aria-label="Close lightbox"
      >×</button>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white/40 text-sm">
        {activeIndex + 1} / {photos.length}
      </div>
    </motion.div>
  );
}

export function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleOpen = (index) => setLightboxIndex(index);
  const handleClose = () => setLightboxIndex(null);
  const handleNext = useCallback(() => setLightboxIndex((i) => (i + 1) % photos.length), []);
  const handlePrev = useCallback(() => setLightboxIndex((i) => (i - 1 + photos.length) % photos.length), []);

  return (
    <SceneWrapper id="photo-gallery" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-dancing text-5xl md:text-6xl gradient-text mb-4">Our Gallery</h2>
          <p className="text-white/50 text-sm tracking-widest uppercase">moments frozen in time</p>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {photos.map((photo, index) => (
            <GalleryPhoto
              key={photo.id}
              photo={photo}
              index={index}
              onOpen={handleOpen}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            activeIndex={lightboxIndex}
            onClose={handleClose}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </SceneWrapper>
  );
}

export default PhotoGallery;
