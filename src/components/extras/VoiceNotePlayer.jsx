import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SceneWrapper } from '../layout/SceneWrapper';

// Place your voice recording at public/audio/voice-note.mp3
const VOICE_NOTE_SRC = '/audio/voice-note.mp3';

export function VoiceNotePlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime / (audio.duration || 1));
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => { setIsPlaying(false); setProgress(0); };
    const onError = () => setError(true);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else { audio.play().catch(() => setError(true)); setIsPlaying(true); }
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <SceneWrapper id="voice-note" className="py-16 px-4">
      <div className="max-w-md mx-auto text-center">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-dancing text-4xl gradient-text mb-2">A Message For You</h2>
          <p className="text-white/40 text-sm">press play to hear my voice 🎙️</p>
        </motion.div>

        <motion.div
          className="glass-pink rounded-3xl p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <audio ref={audioRef} src={VOICE_NOTE_SRC} preload="metadata" />

          {/* Waveform visualizer (decorative) */}
          <div className="flex items-center justify-center gap-1 h-12 mb-6" aria-hidden="true">
            {Array.from({ length: 30 }, (_, i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full bg-soft-pink/60"
                animate={isPlaying ? {
                  height: [4, 8 + Math.random() * 24, 4],
                } : { height: 4 }}
                transition={{
                  duration: 0.4 + Math.random() * 0.4,
                  repeat: isPlaying ? Infinity : 0,
                  delay: i * 0.03,
                  ease: 'easeInOut',
                }}
                style={{ minHeight: 4 }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div
            className="w-full h-1.5 rounded-full bg-white/10 mb-4 cursor-pointer overflow-hidden"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const ratio = (e.clientX - rect.left) / rect.width;
              if (audioRef.current) {
                audioRef.current.currentTime = ratio * duration;
              }
            }}
          >
            <motion.div
              className="h-full rounded-full bg-soft-pink"
              style={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Time */}
          <div className="flex justify-between text-white/30 text-xs mb-6">
            <span>{formatTime((audioRef.current?.currentTime) || 0)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Play button */}
          {error ? (
            <p className="text-white/40 text-sm">Voice note not available yet — add your recording to public/audio/voice-note.mp3</p>
          ) : (
            <motion.button
              className="w-16 h-16 rounded-full glass border border-soft-pink/40 flex items-center justify-center text-2xl mx-auto"
              style={{ boxShadow: isPlaying ? '0 0 20px rgba(255,182,193,0.5)' : 'none' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause voice note' : 'Play voice note'}
            >
              {isPlaying ? '⏸' : '▶'}
            </motion.button>
          )}
        </motion.div>
      </div>
    </SceneWrapper>
  );
}

export default VoiceNotePlayer;
