import type { AllocatedDetachment } from './detachment';
import type { Unit } from './unit';

export interface Suggestion {
  type: 'add-unit' | 'add-detachment' | 'change-role';
  message: string;
  details?: string;
}

export interface AllocationResult {
  detachments: AllocatedDetachment[];
  unallocatedUnits: Unit[];
  suggestions: Suggestion[];
}

export function createAllocationResult(
  detachments: AllocatedDetachment[] = [],
  unallocatedUnits: Unit[] = [],
  suggestions: Suggestion[] = []
): AllocationResult {
  return {
    detachments,
    unallocatedUnits,
    suggestions,
  };
}
