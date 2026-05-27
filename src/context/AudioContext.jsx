import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { Howl } from 'howler';
import tracks from '../data/tracks';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [trackError, setTrackError] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const howlRef = useRef(null);
  const fadeTimerRef = useRef(null);

  // Build a Howl for a given track index
  const createHowl = useCallback((index) => {
    if (howlRef.current) {
      howlRef.current.unload();
    }
    setTrackError(false);
    const track = tracks[index];
    if (!track) return;

    const howl = new Howl({
      src: [track.src],
      html5: true,
      volume: volume,
      loop: false,
      onend: () => {
        // Auto-advance to next track
        setCurrentIndex((prev) => {
          const next = (prev + 1) % tracks.length;
          return next;
        });
      },
      onloaderror: () => setTrackError(true),
      onplayerror: () => setTrackError(true),
      onplay: () => {
        setIsPlaying(true);
        setAudioEnabled(true);
      },
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
    });

    howlRef.current = howl;
    return howl;
  }, [volume]);

  // When currentIndex changes, load new track (lazy — only create Howl, don't auto-play)
  useEffect(() => {
    createHowl(currentIndex);
    // Don't auto-play on index change — only play if user has enabled audio
    return () => {
      if (howlRef.current) {
        howlRef.current.stop();
      }
    };
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const play = useCallback(() => {
    if (!howlRef.current) {
      createHowl(currentIndex);
    }
    try {
      howlRef.current?.play();
      setAudioEnabled(true);
    } catch {
      setTrackError(true);
    }
  }, [currentIndex, createHowl]);

  const pause = useCallback(() => {
    howlRef.current?.pause();
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    const nextIndex = (currentIndex + 1) % tracks.length;
    // Fade out current
    if (howlRef.current) {
      howlRef.current.fade(volume, 0, 300);
      fadeTimerRef.current = setTimeout(() => {
        howlRef.current?.stop();
        setCurrentIndex(nextIndex);
      }, 300);
    } else {
      setCurrentIndex(nextIndex);
    }
  }, [currentIndex, volume]);

  const prev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    if (howlRef.current) {
      howlRef.current.fade(volume, 0, 300);
      fadeTimerRef.current = setTimeout(() => {
        howlRef.current?.stop();
        setCurrentIndex(prevIndex);
      }, 300);
    } else {
      setCurrentIndex(prevIndex);
    }
  }, [currentIndex, volume]);

  // Crossfade: fade current track out, fade new track in
  const crossfadeTo = useCallback((newIndex, duration = 2000) => {
    if (howlRef.current) {
      howlRef.current.fade(volume, 0, duration);
      setTimeout(() => {
        howlRef.current?.stop();
        setCurrentIndex(newIndex);
        // New howl will auto-play if audioEnabled
      }, duration);
    } else {
      setCurrentIndex(newIndex);
    }
  }, [volume]);

  const mute = useCallback(() => {
    howlRef.current?.mute(true);
    setIsMuted(true);
  }, []);

  const unmute = useCallback(() => {
    howlRef.current?.mute(false);
    setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) unmute();
    else mute();
  }, [isMuted, mute, unmute]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeout(fadeTimerRef.current);
      howlRef.current?.unload();
    };
  }, []);

  const value = {
    tracks,
    currentIndex,
    currentTrack: tracks[currentIndex],
    isPlaying,
    isMuted,
    volume,
    trackError,
    audioEnabled,
    play,
    pause,
    togglePlay,
    next,
    prev,
    crossfadeTo,
    mute,
    unmute,
    toggleMute,
    setAudioEnabled,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}

export default AudioContext;
