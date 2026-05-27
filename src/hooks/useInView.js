import { useState, useEffect, useRef } from 'react';

/**
 * Intersection Observer hook.
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - 0–1, default 0.1
 * @param {boolean} options.once - if true, stops observing after first intersection
 * @returns [ref, isInView]
 */
export function useInView({ threshold = 0.1, once = true } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, isInView];
}

export default useInView;
