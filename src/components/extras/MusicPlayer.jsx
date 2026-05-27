import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';

function EqualizerBars({ isPlaying }) {
  return (
    <div className="flex items-end gap-0.5 h-5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-1 rounded-full bg-soft-pink"
          style={{
            height: isPlaying ? undefined : '4px',
            animation: isPlaying
              ? `eqBar ${0.6 + i * 0.1}s ease-in-out infinite alternate`
              : 'none',
            animationDelay: `${i * 0.08}s`,
            minHeight: '4px',
            maxHeight: '20px',
          }}
        />
      ))}
    </div>
  );
}

export function MusicPlayer() {
  const { currentTrack, isPlaying, togglePlay, next, prev, trackError, isMuted, toggleMute } = useAudio();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <style>{`
        @keyframes eqBar {
          from { height: 4px; }
          to { height: 20px; }
        }
        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.div
              key="expanded"
              className="glass-pink rounded-2xl p-4 w-64"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Vinyl disc */}
              <div className="flex justify-center mb-4">
                <div
                  className="relative w-20 h-20 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 50%, #1a0533, #2d1b4e, #1a0533)',
                    border: '2px solid rgba(255,182,193,0.3)',
                    animation: isPlaying ? 'vinylSpin 3s linear infinite' : 'none',
                    boxShadow: isPlaying ? '0 0 20px rgba(255,182,193,0.3)' : 'none',
                  }}
                >
                  {/* Grooves */}
                  {[28, 22, 16].map((r) => (
                    <div
                      key={r}
                      className="absolute rounded-full border border-white/5"
                      style={{
                        width: r * 2,
                        height: r * 2,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  ))}
                  {/* Center hole */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-soft-pink/60" />
                </div>
              </div>

              {/* Track info */}
              {trackError ? (
                <p className="text-center text-white/40 text-xs mb-3">Music unavailable</p>
              ) : (
                <div className="text-center mb-3">
                  <p className="text-glowing-white text-sm font-medium truncate">
                    {currentTrack?.title || 'No track'}
                  </p>
                  <p className="text-white/50 text-xs truncate">{currentTrack?.artist}</p>
                </div>
              )}

              {/* Equalizer */}
              <div className="flex justify-center mb-3">
                <EqualizerBars isPlaying={isPlaying && !trackError} />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={prev}
                  className="text-white/60 hover:text-soft-pink transition-colors text-lg"
                  aria-label="Previous track"
                >⏮</button>
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-soft-pink hover:scale-110 transition-transform border border-soft-pink/30"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <button
                  onClick={next}
                  className="text-white/60 hover:text-soft-pink transition-colors text-lg"
                  aria-label="Next track"
                >⏭</button>
                <button
                  onClick={toggleMute}
                  className="text-white/60 hover:text-soft-pink transition-colors text-sm"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? '🔇' : '🔊'}
                </button>
              </div>

              {/* Collapse button */}
              <button
                onClick={() => setExpanded(false)}
                className="absolute top-2 right-3 text-white/30 hover:text-white/60 text-lg"
                aria-label="Collapse player"
              >×</button>
            </motion.div>
          ) : (
            <motion.button
              key="collapsed"
              className="glass-pink rounded-full w-12 h-12 flex items-center justify-center border border-soft-pink/30 hover:scale-110 transition-transform"
              style={{
                boxShadow: isPlaying ? '0 0 15px rgba(255,182,193,0.4)' : 'none',
                animation: isPlaying ? 'vinylSpin 3s linear infinite' : 'none',
              }}
              onClick={() => setExpanded(true)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              aria-label="Open music player"
            >
              🎵
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default MusicPlayer;
