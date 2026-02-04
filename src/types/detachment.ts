import type { Allegiance } from './allegiance';
import type { FactionId, SubFactionId } from './faction';
import type { AllocatedSlot, PrimeRule, SlotDefinition } from './slot';

export type DetachmentCategory =
  | 'primary'
  | 'warlord'
  | 'lord-of-war'
  | 'allied'
  | 'apex'
  | 'auxiliary';

export interface UnlockRequirement {
  unitName?: string;
  unitNames?: string[];
  allegiance?: Allegiance;
  primarySubFaction?: SubFactionId;
}

export interface DetachmentDefinition {
  id: string;
  name: string;
  category: DetachmentCategory;
  faction?: FactionId;
  subFaction?: SubFactionId;
  slots: SlotDefinition[];
  unlockRequirement?: UnlockRequirement;
  maxCount?: number;
  allowedPrimeRules?: PrimeRule[];
  unitsDoNotUnlockDetachments?: boolean;
  notes?: string;
}

export interface AllocatedDetachment {
  definition: DetachmentDefinition;
  faction: FactionId;
  subFaction?: SubFactionId;
  slots: AllocatedSlot[];
  unlockedByUnitId?: string;
}

export function createAllocatedDetachment(
  definition: DetachmentDefinition,
  faction: FactionId,
  subFaction?: SubFactionId,
  unlockedByUnitId?: string
): AllocatedDetachment {
  const slots: AllocatedSlot[] = [];
  let primeIndex = 0;

  for (const slotDef of definition.slots) {
    for (let i = 0; i < slotDef.count; i++) {
      const isPrime = primeIndex < slotDef.primeCount;
      slots.push({
        definition: slotDef,
        slotIndex: i,
        isPrime,
      });
      if (isPrime) primeIndex++;
    }
    primeIndex = 0;
  }

  return {
    definition,
    faction,
    subFaction,
    slots,
    unlockedByUnitId,
  };
}
