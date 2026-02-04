import type { ArmyState } from '../types';

const STORAGE_KEY = 'detachmentizer-hh3-state';
const STORAGE_VERSION = 1;

interface StoredState {
  version: number;
  army: ArmyState | null;
  customUnitNames: string[];
}

function getDefaultState(): StoredState {
  return {
    version: STORAGE_VERSION,
    army: null,
    customUnitNames: [],
  };
}

export function loadState(): StoredState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return getDefaultState();
    }

    const parsed = JSON.parse(stored) as StoredState;

    if (parsed.version !== STORAGE_VERSION) {
      console.warn('Storage version mismatch, resetting state');
      return getDefaultState();
    }

    return parsed;
  } catch (error) {
    console.error('Failed to load state from storage:', error);
    return getDefaultState();
  }
}

export function saveState(state: StoredState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state to storage:', error);
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear state from storage:', error);
  }
}
