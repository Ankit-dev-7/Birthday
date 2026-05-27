import { useEffect, useRef } from 'react';

/**
 * A declarative setInterval hook that handles cleanup automatically.
 * @param {Function} callback - function to call on each interval
 * @param {number|null} delay - interval in ms; pass null to pause
 */
export function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  // Keep ref up to date without restarting the interval
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
