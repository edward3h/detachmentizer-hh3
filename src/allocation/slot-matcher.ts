import type { AllocatedSlot, SlotDefinition, Unit, FactionId, SubFactionId } from '../types';

export interface SlotMatchResult {
  canMatch: boolean;
  usesPrime: boolean;
  reason?: string;
}

export function canUnitFillSlot(
  unit: Unit,
  slot: SlotDefinition,
  detachmentFaction: FactionId,
  detachmentSubFaction?: SubFactionId
): SlotMatchResult {
  // Check battlefield role
  if (unit.role !== slot.role) {
    return { canMatch: false, usesPrime: false, reason: 'Role mismatch' };
  }

  // Check faction
  if (unit.faction !== detachmentFaction) {
    return { canMatch: false, usesPrime: false, reason: 'Faction mismatch' };
  }

  // Check sub-faction (if detachment has one, unit must match or have none)
  if (detachmentSubFaction && unit.subFaction && unit.subFaction !== detachmentSubFaction) {
    return { canMatch: false, usesPrime: false, reason: 'Sub-faction mismatch' };
  }

  // Check slot restrictions
  if (slot.restrictions) {
    const unitNameLower = unit.name.toLowerCase();

    if (slot.restrictions.only) {
      const allowed = slot.restrictions.only.some((name) =>
        unitNameLower.includes(name.toLowerCase())
      );
      if (!allowed) {
        return { canMatch: false, usesPrime: false, reason: 'Unit not in allowed list' };
      }
    }

    if (slot.restrictions.exclude) {
      const excluded = slot.restrictions.exclude.some((name) =>
        unitNameLower.includes(name.toLowerCase())
      );
      if (excluded) {
        return { canMatch: false, usesPrime: false, reason: 'Unit is excluded' };
      }
    }
  }

  return { canMatch: true, usesPrime: false };
}

export function findAvailableSlot(
  unit: Unit,
  slots: AllocatedSlot[],
  detachmentFaction: FactionId,
  detachmentSubFaction?: SubFactionId,
  preferNonPrime: boolean = true
): AllocatedSlot | null {
  // First pass: find non-prime slots
  if (preferNonPrime) {
    for (const slot of slots) {
      if (slot.unitId) continue;
      if (slot.isPrime) continue;

      const result = canUnitFillSlot(
        unit,
        slot.definition,
        detachmentFaction,
        detachmentSubFaction
      );
      if (result.canMatch) {
        return slot;
      }
    }
  }

  // Second pass: find any available slot
  for (const slot of slots) {
    if (slot.unitId) continue;

    const result = canUnitFillSlot(unit, slot.definition, detachmentFaction, detachmentSubFaction);
    if (result.canMatch) {
      return slot;
    }
  }

  return null;
}

export function countEmptySlots(slots: AllocatedSlot[]): number {
  return slots.filter((s) => !s.unitId).length;
}

export function countFilledSlots(slots: AllocatedSlot[]): number {
  return slots.filter((s) => s.unitId).length;
}
