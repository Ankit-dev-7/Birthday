import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneWrapper } from '../layout/SceneWrapper';
import mapLocations from '../../data/mapLocations';

// Illustrated SVG map — no tile server needed, works offline
// Locations are plotted as percentage positions on a stylised world silhouette

// Simple bounding box for UK-centric demo (adjust for your locations)
const MAP_BOUNDS = { minLat: 49, maxLat: 59, minLng: -8, maxLng: 3 };

function latLngToPercent(lat, lng) {
  const x = ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * 100;
  const y = ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 100;
  return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
}

function MapMarker({ location, onClick, isActive }) {
  const { x, y } = latLngToPercent(location.lat, location.lng);

  return (
    <motion.button
      className="absolute -translate-x-1/2 -translate-y-full"
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={() => onClick(location)}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      aria-label={location.name}
    >
      <motion.div
        className="flex flex-col items-center"
        animate={isActive ? { y: [-4, 0, -4] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Heart pin */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
          style={{
            background: isActive ? '#FFB6C1' : 'rgba(255,182,193,0.3)',
            border: `2px solid ${isActive ? '#FFB6C1' : 'rgba(255,182,193,0.5)'}`,
            boxShadow: isActive ? '0 0 15px rgba(255,182,193,0.7)' : '0 0 6px rgba(255,182,193,0.3)',
          }}
        >
          {location.emoji || '♥'}
        </div>
        {/* Pin stem */}
        <div className="w-0.5 h-2 bg-soft-pink/50" />
        {/* Pin dot */}
        <div className="w-1 h-1 rounded-full bg-soft-pink/50" />
      </motion.div>
    </motion.button>
  );
}

export function MemoryMap() {
  const [activeLocation, setActiveLocation] = useState(null);

  return (
    <SceneWrapper id="memory-map" className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-dancing text-4xl gradient-text mb-2">Our Places</h2>
          <p className="text-white/40 text-sm">every place we've been together</p>
        </motion.div>

        <div className="glass-pink rounded-3xl p-6 overflow-hidden">
          {/* Map container */}
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{
              height: '400px',
              background: 'linear-gradient(135deg, #0d0020 0%, #1a0533 50%, #0d0020 100%)',
              border: '1px solid rgba(255,182,193,0.1)',
            }}
          >
            {/* Grid lines (decorative) */}
            <svg className="absolute inset-0 w-full h-full opacity-10" aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => (
                <line key={`h${i}`} x1="0" y1={`${(i + 1) * 12.5}%`} x2="100%" y2={`${(i + 1) * 12.5}%`}
                  stroke="#FFB6C1" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 8 }, (_, i) => (
                <line key={`v${i}`} x1={`${(i + 1) * 12.5}%`} y1="0" x2={`${(i + 1) * 12.5}%`} y2="100%"
                  stroke="#FFB6C1" strokeWidth="0.5" />
              ))}
            </svg>

            {/* Connection lines between locations */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
              {mapLocations.slice(0, -1).map((loc, i) => {
                const from = latLngToPercent(loc.lat, loc.lng);
                const to = latLngToPercent(mapLocations[i + 1].lat, mapLocations[i + 1].lng);
                return (
                  <line
                    key={i}
                    x1={`${from.x}%`} y1={`${from.y}%`}
                    x2={`${to.x}%`} y2={`${to.y}%`}
                    stroke="rgba(255,182,193,0.2)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                );
              })}
            </svg>

            {/* Markers */}
            {mapLocations.map((loc) => (
              <MapMarker
                key={loc.id}
                location={loc}
                onClick={setActiveLocation}
                isActive={activeLocation?.id === loc.id}
              />
            ))}

            {/* Tooltip */}
            <AnimatePresence>
              {activeLocation && (
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-pink rounded-xl p-4 max-w-xs w-full text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    className="absolute top-2 right-3 text-white/30 hover:text-white/60"
                    onClick={() => setActiveLocation(null)}
                    aria-label="Close"
                  >×</button>
                  <p className="text-soft-pink font-semibold text-sm mb-1">
                    {activeLocation.emoji} {activeLocation.name}
                  </p>
                  <p className="text-white/70 text-xs leading-relaxed">{activeLocation.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Location list */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {mapLocations.map((loc) => (
              <button
                key={loc.id}
                className={`px-3 py-1.5 rounded-full text-xs transition-all duration-200 ${
                  activeLocation?.id === loc.id
                    ? 'bg-soft-pink/20 border border-soft-pink/50 text-soft-pink'
                    : 'glass border border-white/10 text-white/50 hover:text-white/80'
                }`}
                onClick={() => setActiveLocation(activeLocation?.id === loc.id ? null : loc)}
              >
                {loc.emoji} {loc.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
}

export default MemoryMap;
