/**
 * Time utility functions for the Love Counter and Countdown Timer.
 */

/**
 * Calculate elapsed duration from a start date to now.
 * @param {string|Date} startDate - ISO date string or Date object
 * @returns {{ days: number, hours: number, minutes: number, seconds: number, totalSeconds: number }}
 */
export function getDuration(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  const totalMs = Math.max(0, now - start);
  const totalSeconds = Math.floor(totalMs / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, totalSeconds };
}

/**
 * Calculate remaining time until a target date.
 * @param {string|Date} targetDate - ISO date string or Date object
 * @returns {{ days: number, hours: number, minutes: number, seconds: number, totalSeconds: number, isPast: boolean }}
 */
export function getCountdown(targetDate) {
  const target = new Date(targetDate);
  const now = new Date();
  const totalMs = target - now;

  if (totalMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0, isPast: true };
  }

  const totalSeconds = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, totalSeconds, isPast: false };
}

/**
 * Format a number with leading zero if < 10.
 * @param {number} n
 * @returns {string}
 */
export function pad(n) {
  return String(n).padStart(2, '0');
}

/**
 * Returns true if the given date is in the future.
 * @param {string|Date} date
 * @returns {boolean}
 */
export function isFuture(date) {
  return new Date(date) > new Date();
}
