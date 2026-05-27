import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneWrapper } from '../layout/SceneWrapper';
import { useApp } from '../../context/AppContext';
import { randomInRange, pointInCircle } from '../../utils/mathUtils';

const GAME_DURATION = 30;
const WIN_SCORE = 15;
const HEART_RADIUS = 20;

function createHeart(canvasWidth) {
  return {
    id: Math.random(),
    x: randomInRange(HEART_RADIUS, canvasWidth - HEART_RADIUS),
    y: -HEART_RADIUS,
    speed: randomInRange(2, 6),
    size: randomInRange(20, 36),
    caught: false,
    opacity: 1,
  };
}

export function MiniGame() {
  const canvasRef = useRef(null);
  const heartsRef = useRef([]);
  const rafRef = useRef(null);
  const lastSpawnRef = useRef(0);
  const gameActiveRef = useRef(false);

  const [gameState, setGameState] = useState('idle'); // idle | playing | ended
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [showHiddenMsg, setShowHiddenMsg] = useState(false);
  const scoreRef = useRef(0);

  const { incrementGameScore, completeGame, resetGame } = useApp();

  const startGame = () => {
    scoreRef.current = 0;
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setShowHiddenMsg(false);
    heartsRef.current = [];
    gameActiveRef.current = true;
    setGameState('playing');
  };

  const endGame = useCallback(() => {
    gameActiveRef.current = false;
    cancelAnimationFrame(rafRef.current);
    setGameState('ended');
    completeGame();
    if (scoreRef.current >= WIN_SCORE) setShowHiddenMsg(true);
  }, [completeGame]);

  // Countdown timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(id); endGame(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [gameState, endGame]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const loop = (timestamp) => {
      if (!gameActiveRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn hearts
      if (timestamp - lastSpawnRef.current > 600) {
        heartsRef.current.push(createHeart(canvas.width));
        lastSpawnRef.current = timestamp;
      }

      // Update & draw
      heartsRef.current = heartsRef.current.filter((h) => {
        if (h.caught) return false;
        h.y += h.speed;
        if (h.y > canvas.height + HEART_RADIUS) return false;

        ctx.save();
        ctx.globalAlpha = h.opacity;
        ctx.font = `${h.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('💜', h.x, h.y);
        ctx.restore();
        return true;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gameState]);

  // Click/tap handler
  const handleCanvasClick = useCallback((e) => {
    if (!gameActiveRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const point = { x: clientX - rect.left, y: clientY - rect.top };

    let caught = false;
    heartsRef.current = heartsRef.current.map((h) => {
      if (!caught && pointInCircle(point, { x: h.x, y: h.y, r: HEART_RADIUS + h.size / 2 })) {
        caught = true;
        scoreRef.current += 1;
        setScore(scoreRef.current);
        incrementGameScore();
        return { ...h, caught: true };
      }
      return h;
    });
  }, [incrementGameScore]);

  const handleRestart = () => {
    resetGame();
    startGame();
  };

  return (
    <SceneWrapper id="mini-game" className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-dancing text-5xl md:text-6xl gradient-text mb-4">Catch the Hearts</h2>
          <p className="text-white/50 text-sm">catch {WIN_SCORE}+ hearts to unlock a secret message 💜</p>
        </motion.div>

        {/* Game area */}
        <div className="relative">
          {/* HUD */}
          {gameState === 'playing' && (
            <div className="flex justify-between items-center mb-3 px-2">
              <span className="text-soft-pink font-dancing text-2xl">Score: {score}</span>
              <span className={`font-mono text-lg ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white/60'}`}>
                {timeLeft}s
              </span>
            </div>
          )}

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full rounded-2xl glass cursor-crosshair touch-none"
            style={{ height: '400px', display: gameState === 'playing' ? 'block' : 'none' }}
            onClick={handleCanvasClick}
            onTouchStart={handleCanvasClick}
          />

          {/* Idle state */}
          <AnimatePresence>
            {gameState === 'idle' && (
              <motion.div
                className="glass-pink rounded-2xl p-12 flex flex-col items-center gap-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="text-6xl animate-float">💜</div>
                <p className="text-white/60">Hearts will fall from the sky. Catch as many as you can in 30 seconds!</p>
                <motion.button
                  className="px-8 py-3 rounded-full glass border border-soft-pink/40 text-soft-pink font-dancing text-xl hover:scale-105 transition-transform"
                  style={{ boxShadow: '0 0 20px rgba(255,182,193,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                >
                  Start Playing ♥
                </motion.button>
              </motion.div>
            )}

            {/* Result screen */}
            {gameState === 'ended' && (
              <motion.div
                className="glass-pink rounded-2xl p-10 flex flex-col items-center gap-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-5xl">{score >= WIN_SCORE ? '🎉' : '💜'}</div>
                <h3 className="font-dancing text-4xl gradient-text">
                  {score >= WIN_SCORE ? 'You won!' : 'Nice try!'}
                </h3>
                <p className="text-white/70 text-lg">You caught <span className="text-soft-pink font-bold">{score}</span> hearts</p>

                {showHiddenMsg && (
                  <motion.div
                    className="glass rounded-xl p-6 max-w-sm text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="font-dancing text-xl text-glowing-white">
                      Just like you catch every falling piece of my heart — effortlessly, completely, always. 💜
                    </p>
                  </motion.div>
                )}

                <button
                  className="px-6 py-2 rounded-full glass border border-soft-pink/30 text-soft-pink text-sm hover:scale-105 transition-transform"
                  onClick={handleRestart}
                >
                  Play Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SceneWrapper>
  );
}

export default MiniGame;
