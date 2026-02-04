import type {
  AllocatedDetachment,
  AllocationResult,
  ArmyState,
  BattlefieldRole,
  DetachmentDefinition,
  Unit,
} from '../types';
import { createAllocatedDetachment, createAllocationResult } from '../types';
import {
  CORE_DETACHMENTS,
  getApexDetachmentsForFaction,
  getAuxiliaryDetachmentsForFaction,
  getDetachmentById,
} from '../data';
import { findKnownUnit } from '../data';
import { findAvailableSlot } from './slot-matcher';

interface AllocationContext {
  army: ArmyState;
  unitsToAllocate: Unit[];
  allocatedDetachments: AllocatedDetachment[];
  apexUnlocks: number;
  auxiliaryUnlocks: number;
  usedApexDetachmentIds: Set<string>;
  usedAuxiliaryDetachmentIds: Set<string>;
}

function getPrimaryDetachment(): DetachmentDefinition {
  return CORE_DETACHMENTS.find((d) => d.id === 'primary-crusade')!;
}

function countUnlocks(
  units: Unit[],
  role: BattlefieldRole,
  excludeDetachmentUnits: boolean = false
): number {
  let count = 0;
  for (const unit of units) {
    if (unit.role !== role) continue;

    const known = findKnownUnit(unit.name, unit.faction);

    // Some detachments specify that their units don't unlock detachments
    if (excludeDetachmentUnits && known?.unlocksDetachment) continue;

    // Officer of the Line grants extra unlocks
    const officerCount = unit.officerOfTheLine ?? known?.officerOfTheLine ?? 1;
    count += officerCount;
  }
  return count;
}

function canUseDetachment(
  detachment: DetachmentDefinition,
  army: ArmyState,
  allocatedUnits: Unit[]
): boolean {
  const req = detachment.unlockRequirement;
  if (!req) return true;

  // Check allegiance
  if (req.allegiance && army.allegiance !== req.allegiance) {
    return false;
  }

  // Check primary sub-faction
  if (req.primarySubFaction && army.primarySubFaction !== req.primarySubFaction) {
    return false;
  }

  // Check if required unit is allocated
  if (req.unitName) {
    const hasUnit = allocatedUnits.some(
      (u) => u.name.toLowerCase() === req.unitName!.toLowerCase()
    );
    if (!hasUnit) return false;
  }

  if (req.unitNames) {
    const hasUnit = allocatedUnits.some((u) =>
      req.unitNames!.some((name) => u.name.toLowerCase() === name.toLowerCase())
    );
    if (!hasUnit) return false;
  }

  return true;
}

function selectBestDetachment(
  detachments: DetachmentDefinition[],
  units: Unit[],
  army: ArmyState,
  usedIds: Set<string>
): DetachmentDefinition | null {
  // Filter out already used detachments and ones we can't use
  const available = detachments.filter(
    (d) => !usedIds.has(d.id) && canUseDetachment(d, army, units)
  );

  if (available.length === 0) return null;

  // Score each detachment by how many units can fill its slots
  let bestDetachment: DetachmentDefinition | null = null;
  let bestScore = -1;

  for (const detachment of available) {
    const faction = detachment.faction ?? army.primaryFaction;
    const subFaction = detachment.subFaction ?? army.primarySubFaction;

    // Check sub-faction compatibility
    if (
      detachment.subFaction &&
      army.primarySubFaction &&
      detachment.subFaction !== army.primarySubFaction
    ) {
      continue;
    }

    const allocatedDet = createAllocatedDetachment(detachment, faction, subFaction);
    let score = 0;

    for (const unit of units) {
      const slot = findAvailableSlot(unit, allocatedDet.slots, faction, subFaction, true);
      if (slot && !slot.unitId) {
        slot.unitId = unit.id;
        score++;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestDetachment = detachment;
    }
  }

  return bestDetachment;
}

function allocateUnitsToDetachment(detachment: AllocatedDetachment, units: Unit[]): Unit[] {
  const remaining: Unit[] = [];

  for (const unit of units) {
    const slot = findAvailableSlot(
      unit,
      detachment.slots,
      detachment.faction,
      detachment.subFaction,
      true
    );

    if (slot) {
      slot.unitId = unit.id;
    } else {
      remaining.push(unit);
    }
  }

  return remaining;
}

export function allocateArmy(army: ArmyState): AllocationResult {
  if (army.units.length === 0) {
    return createAllocationResult();
  }

  const context: AllocationContext = {
    army,
    unitsToAllocate: [...army.units],
    allocatedDetachments: [],
    apexUnlocks: 0,
    auxiliaryUnlocks: 0,
    usedApexDetachmentIds: new Set(),
    usedAuxiliaryDetachmentIds: new Set(),
  };

  // Step 1: Create and fill Primary Detachment
  const primaryDef = getPrimaryDetachment();
  const primaryDetachment = createAllocatedDetachment(
    primaryDef,
    army.primaryFaction,
    army.primarySubFaction
  );
  context.allocatedDetachments.push(primaryDetachment);

  context.unitsToAllocate = allocateUnitsToDetachment(primaryDetachment, context.unitsToAllocate);

  // Count unlocks from primary detachment
  const allocatedHighCommand = army.units.filter((u) =>
    primaryDetachment.slots.some((s) => s.unitId === u.id && s.definition.role === 'high-command')
  );
  const allocatedCommand = army.units.filter((u) =>
    primaryDetachment.slots.some((s) => s.unitId === u.id && s.definition.role === 'command')
  );

  context.apexUnlocks = countUnlocks(allocatedHighCommand, 'high-command');
  context.auxiliaryUnlocks = countUnlocks(allocatedCommand, 'command');

  // Step 2: Allocate to Apex detachments
  const apexDetachments = getApexDetachmentsForFaction(army.primaryFaction);
  for (let i = 0; i < context.apexUnlocks && context.unitsToAllocate.length > 0; i++) {
    const bestApex = selectBestDetachment(
      apexDetachments,
      context.unitsToAllocate,
      army,
      context.usedApexDetachmentIds
    );

    if (bestApex) {
      context.usedApexDetachmentIds.add(bestApex.id);
      const apexDet = createAllocatedDetachment(
        bestApex,
        bestApex.faction ?? army.primaryFaction,
        bestApex.subFaction ?? army.primarySubFaction
      );
      context.allocatedDetachments.push(apexDet);
      context.unitsToAllocate = allocateUnitsToDetachment(apexDet, context.unitsToAllocate);
    }
  }

  // Step 3: Allocate to Auxiliary detachments
  const auxDetachments = getAuxiliaryDetachmentsForFaction(army.primaryFaction);
  for (let i = 0; i < context.auxiliaryUnlocks && context.unitsToAllocate.length > 0; i++) {
    const bestAux = selectBestDetachment(
      auxDetachments,
      context.unitsToAllocate,
      army,
      context.usedAuxiliaryDetachmentIds
    );

    if (bestAux) {
      context.usedAuxiliaryDetachmentIds.add(bestAux.id);
      const auxDet = createAllocatedDetachment(
        bestAux,
        bestAux.faction ?? army.primaryFaction,
        bestAux.subFaction ?? army.primarySubFaction
      );
      context.allocatedDetachments.push(auxDet);
      context.unitsToAllocate = allocateUnitsToDetachment(auxDet, context.unitsToAllocate);
    }
  }

  // Step 4: Check for units that unlock specific detachments
  for (const unit of [...context.unitsToAllocate]) {
    const known = findKnownUnit(unit.name, unit.faction);
    if (known?.unlocksDetachment) {
      const detDef = getDetachmentById(known.unlocksDetachment);
      if (detDef && canUseDetachment(detDef, army, [unit])) {
        // Check if we have auxiliary unlocks remaining
        if (detDef.category === 'auxiliary' && !context.usedAuxiliaryDetachmentIds.has(detDef.id)) {
          context.usedAuxiliaryDetachmentIds.add(detDef.id);
          const det = createAllocatedDetachment(
            detDef,
            detDef.faction ?? army.primaryFaction,
            detDef.subFaction ?? army.primarySubFaction,
            unit.id
          );
          context.allocatedDetachments.push(det);
          context.unitsToAllocate = allocateUnitsToDetachment(det, context.unitsToAllocate);
        }
      }
    }
  }

  // Generate suggestions for unallocated units
  const suggestions = generateSuggestions(context);

  return createAllocationResult(context.allocatedDetachments, context.unitsToAllocate, suggestions);
}

function generateSuggestions(context: AllocationContext): AllocationResult['suggestions'] {
  const suggestions: AllocationResult['suggestions'] = [];

  if (context.unitsToAllocate.length === 0) {
    return suggestions;
  }

  // Suggestion 1: Add more Command units to unlock more Auxiliary detachments
  const commandUnits = context.army.units.filter((u) => u.role === 'command');
  if (commandUnits.length < 4) {
    suggestions.push({
      type: 'add-unit',
      message: 'Add more Command units to unlock additional Auxiliary detachments.',
      details: `You have ${commandUnits.length} Command unit(s). Adding more will unlock more Auxiliary detachments for your remaining units.`,
    });
  }

  // Suggestion 2: Add a High Command unit to unlock Apex detachments
  const highCommandUnits = context.army.units.filter((u) => u.role === 'high-command');
  if (highCommandUnits.length < 2) {
    suggestions.push({
      type: 'add-unit',
      message: 'Add a High Command unit to unlock an Apex detachment.',
      details: `You have ${highCommandUnits.length} High Command unit(s). Adding more will unlock Apex detachments.`,
    });
  }

  return suggestions.slice(0, 2);
}
