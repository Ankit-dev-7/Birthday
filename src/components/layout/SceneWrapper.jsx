import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

/**
 * Common wrapper for all scene sections.
 * Provides Intersection Observer detection and a data-scene attribute for GSAP targeting.
 *
 * @param {string} id - scene identifier (used as data-scene and HTML id)
 * @param {number} threshold - IntersectionObserver threshold (0–1)
 * @param {boolean} once - stop observing after first intersection
 * @param {React.ReactNode|Function} children - can be a render function receiving isInView
 * @param {string} className - additional CSS classes
 */
export function SceneWrapper({
  id,
  threshold = 0.1,
  once = true,
  children,
  className = '',
  ...props
}) {
  const [ref, isInView] = useInView({ threshold, once });

  return (
    <section
      ref={ref}
      id={id}
      data-scene={id}
      className={`scene ${className}`}
      {...props}
    >
      {typeof children === 'function' ? children(isInView) : children}
    </section>
  );
}

export default SceneWrapper;
