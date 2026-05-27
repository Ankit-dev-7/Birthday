import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { getDuration, getCountdown } from '../utils/timeUtils';

// Feature: romantic-birthday-website, Property 9: getDuration/getCountdown decompose time correctly
describe('getDuration', () => {
  it('hours in [0,23], minutes in [0,59], seconds in [0,59] for any past date', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 365 * 5 }),
        (daysAgo) => {
          const startDate = new Date(Date.now() - daysAgo * 86400 * 1000).toISOString();
          const result = getDuration(startDate);
          expect(result.hours).toBeGreaterThanOrEqual(0);
          expect(result.hours).toBeLessThanOrEqual(23);
          expect(result.minutes).toBeGreaterThanOrEqual(0);
          expect(result.minutes).toBeLessThanOrEqual(59);
          expect(result.seconds).toBeGreaterThanOrEqual(0);
          expect(result.seconds).toBeLessThanOrEqual(59);
          expect(result.days).toBeGreaterThanOrEqual(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('total seconds decomposition is consistent', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 365 * 3 }),
        (daysAgo) => {
          const startDate = new Date(Date.now() - daysAgo * 86400 * 1000).toISOString();
          const { days, hours, minutes, seconds, totalSeconds } = getDuration(startDate);
          const reconstructed = days * 86400 + hours * 3600 + minutes * 60 + seconds;
          expect(Math.abs(reconstructed - totalSeconds)).toBeLessThanOrEqual(1);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('getCountdown', () => {
  it('returns positive values for future dates', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 365 }),
        (daysAhead) => {
          const targetDate = new Date(Date.now() + daysAhead * 86400 * 1000).toISOString();
          const result = getCountdown(targetDate);
          expect(result.isPast).toBe(false);
          expect(result.totalSeconds).toBeGreaterThan(0);
          expect(result.hours).toBeGreaterThanOrEqual(0);
          expect(result.hours).toBeLessThanOrEqual(23);
          expect(result.minutes).toBeGreaterThanOrEqual(0);
          expect(result.minutes).toBeLessThanOrEqual(59);
          expect(result.seconds).toBeGreaterThanOrEqual(0);
          expect(result.seconds).toBeLessThanOrEqual(59);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('returns isPast=true for past dates', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 365 }),
        (daysAgo) => {
          const pastDate = new Date(Date.now() - daysAgo * 86400 * 1000).toISOString();
          const result = getCountdown(pastDate);
          expect(result.isPast).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});
