import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { randomInterval } from '../../utils/audioUtils';

const MESSAGES = [
  { from: 'Baby 💜', text: 'I was just thinking about you…', time: 'now' },
  { from: 'Baby 💜', text: 'You make everything better 🌸', time: 'now' },
  { from: 'Baby 💜', text: 'I love you so much it\'s ridiculous', time: 'now' },
  { from: 'Baby 💜', text: 'Can\'t stop smiling because of you ✨', time: 'now' },
  { from: 'Baby 💜', text: 'You\'re my favourite person ever 💜', time: 'now' },
  { from: 'Baby 💜', text: 'Happy Birthday my love 🎂', time: 'now' },
  { from: 'Baby 💜', text: 'Every day with you is a gift 🎁', time: 'now' },
  { from: 'Baby 💜', text: 'I choose you. Always. 💜', time: 'now' },
];

export function LoveMessagesPopup() {
  const [visible, setVisible] = useState(false);
  const [currentMsg, setCurrentMsg] = useState(null);
  const [msgIndex, setMsgIndex] = useState(0);

  const showNext = useCallback(() => {
    const msg = MESSAGES[msgIndex % MESSAGES.length];
    setCurrentMsg(msg);
    setMsgIndex((i) => i + 1);
    setVisible(true);
    setTimeout(() => setVisible(false), 5000);
  }, [msgIndex]);

  useEffect(() => {
    // First popup after 8 seconds
    const first = setTimeout(showNext, 8000);
    return () => clearTimeout(first);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!visible) {
      const delay = randomInterval(15000, 45000);
      const timer = setTimeout(showNext, delay);
      return () => clearTimeout(timer);
    }
  }, [visible, showNext]);

  return (
    <AnimatePresence>
      {visible && currentMsg && (
        <motion.div
          className="fixed top-6 right-6 z-50 max-w-xs"
          initial={{ opacity: 0, x: 120, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 120, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <div
            className="glass-pink rounded-2xl p-4 cursor-pointer"
            onClick={() => setVisible(false)}
            style={{ boxShadow: '0 8px 32px rgba(255,182,193,0.2)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-soft-pink/20 flex items-center justify-center text-sm">💜</div>
              <div>
                <p className="text-soft-pink text-xs font-semibold">{currentMsg.from}</p>
                <p className="text-white/30 text-xs">{currentMsg.time}</p>
              </div>
              <button
                className="ml-auto text-white/30 hover:text-white/60 text-sm"
                onClick={() => setVisible(false)}
                aria-label="Dismiss"
              >×</button>
            </div>
            {/* Message */}
            <p className="text-glowing-white/90 text-sm font-dancing text-lg leading-snug">
              {currentMsg.text}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoveMessagesPopup;
