import type { BattlefieldRole } from './battlefield-role';

export interface SlotRestriction {
  only?: string[];
  exclude?: string[];
}

export interface SlotDefinition {
  role: BattlefieldRole;
  count: number;
  primeCount: number;
  restrictions?: SlotRestriction;
}

export interface AllocatedSlot {
  definition: SlotDefinition;
  slotIndex: number;
  unitId?: string;
  isPrime: boolean;
  usedPrimeRule?: PrimeRule;
}

export type PrimeRule =
  | 'logistical-benefit'
  | 'special-assignment'
  | 'cult-operative'
  | 'clade-operative'
  | 'atramentar'
  | 'true-believers';

export function createSlotDefinition(
  role: BattlefieldRole,
  count: number,
  primeCount: number = 0,
  restrictions?: SlotRestriction
): SlotDefinition {
  return {
    role,
    count,
    primeCount,
    restrictions,
  };
}
