import { describe, it, expect } from 'vitest';
import { countEmptySlots, countFilledSlots } from './slot-matcher';
import type { AllocatedSlot } from '../types';

describe('slot-matcher', () => {
  describe('countEmptySlots', () => {
    it('returns 0 for empty array', () => {
      expect(countEmptySlots([])).toBe(0);
    });

    it('counts slots without unitId as empty', () => {
      const slots: AllocatedSlot[] = [
        { slotIndex: 0, definition: { role: 'command', count: 1, primeCount: 0 }, isPrime: false },
        {
          slotIndex: 1,
          definition: { role: 'troops', count: 2, primeCount: 0 },
          isPrime: false,
          unitId: 'unit-1',
        },
        { slotIndex: 2, definition: { role: 'troops', count: 2, primeCount: 0 }, isPrime: false },
      ];
      expect(countEmptySlots(slots)).toBe(2);
    });
  });

  describe('countFilledSlots', () => {
    it('returns 0 for empty array', () => {
      expect(countFilledSlots([])).toBe(0);
    });

    it('counts slots with unitId as filled', () => {
      const slots: AllocatedSlot[] = [
        { slotIndex: 0, definition: { role: 'command', count: 1, primeCount: 0 }, isPrime: false },
        {
          slotIndex: 1,
          definition: { role: 'troops', count: 2, primeCount: 0 },
          isPrime: false,
          unitId: 'unit-1',
        },
        {
          slotIndex: 2,
          definition: { role: 'troops', count: 2, primeCount: 0 },
          isPrime: false,
          unitId: 'unit-2',
        },
      ];
      expect(countFilledSlots(slots)).toBe(2);
    });
  });
});
