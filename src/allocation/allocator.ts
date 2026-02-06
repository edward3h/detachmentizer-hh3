import type {
  AllocatedDetachment,
  AllocatedSlot,
  AllocationResult,
  ArmyState,
  BattlefieldRole,
  DetachmentDefinition,
  FactionId,
  Unit,
} from '../types';
import { createAllocatedDetachment, createAllocationResult, createSlotDefinition } from '../types';
import {
  CORE_DETACHMENTS,
  getApexDetachmentsForFaction,
  getAuxiliaryDetachmentsForFaction,
  getDetachmentById,
} from '../data';
import { findKnownUnit } from '../data';
import { findAvailableSlot, countFilledSlots } from './slot-matcher';

interface AlliedFactionContext {
  auxiliaryUnlocks: number;
  usedAuxiliaryDetachmentIds: Set<string>;
}

interface AllocationContext {
  army: ArmyState;
  unitsToAllocate: Unit[];
  allocatedDetachments: AllocatedDetachment[];
  apexUnlocks: number;
  auxiliaryUnlocks: number;
  usedApexDetachmentIds: Set<string>;
  usedAuxiliaryDetachmentIds: Set<string>;
  alliedContexts: Map<FactionId, AlliedFactionContext>;
}

function getPrimaryDetachment(): DetachmentDefinition {
  return CORE_DETACHMENTS.find((d) => d.id === 'primary-crusade')!;
}

function getAlliedDetachment(): DetachmentDefinition {
  return CORE_DETACHMENTS.find((d) => d.id === 'allied')!;
}

function groupUnitsByFaction(units: Unit[]): Map<FactionId, Unit[]> {
  const result = new Map<FactionId, Unit[]>();
  for (const unit of units) {
    const existing = result.get(unit.faction);
    if (existing) {
      existing.push(unit);
    } else {
      result.set(unit.faction, [unit]);
    }
  }
  return result;
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
  let bestScore = 0; // Start at 0 to avoid selecting detachments with no matches

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

/**
 * Select the best detachment for an allied faction.
 * Similar to selectBestDetachment but uses the target faction instead of army.primaryFaction.
 */
function selectBestDetachmentForFaction(
  detachments: DetachmentDefinition[],
  units: Unit[],
  targetFaction: FactionId,
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
  let bestScore = 0; // Start at 0 to avoid selecting detachments with no matches

  for (const detachment of available) {
    const faction = detachment.faction ?? targetFaction;

    const allocatedDet = createAllocatedDetachment(detachment, faction, undefined);
    let score = 0;

    for (const unit of units) {
      const slot = findAvailableSlot(unit, allocatedDet.slots, faction, undefined, true);
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

// Roles that cannot be added via Logistical Benefit
const LOGISTICAL_BENEFIT_EXCLUDED_ROLES: BattlefieldRole[] = [
  'high-command',
  'command',
  'warlord',
  'lord-of-war',
];

/**
 * Apply Logistical Benefit to detachments to allocate more units.
 * Logistical Benefit: When a unit is in a Prime slot, add one additional slot
 * of any role (except High Command, Command, Warlord, Lord of War) to the detachment.
 * Can only be used once per detachment.
 */
function applyLogisticalBenefit(context: AllocationContext): void {
  if (context.unitsToAllocate.length === 0) return;

  for (const detachment of context.allocatedDetachments) {
    // Check if this detachment already used Logistical Benefit
    const alreadyUsedLogisticalBenefit = detachment.slots.some(
      (s) => s.usedPrimeRule === 'logistical-benefit'
    );
    if (alreadyUsedLogisticalBenefit) continue;

    // Find a Prime slot that has a unit allocated and hasn't used a prime rule
    const primeSlotWithUnit = detachment.slots.find(
      (s) => s.isPrime && s.unitId && !s.usedPrimeRule
    );
    if (!primeSlotWithUnit) continue;

    // Find an unallocated unit that could benefit from a new slot
    for (let i = 0; i < context.unitsToAllocate.length; i++) {
      const unit = context.unitsToAllocate[i];

      // Check if this role is allowed for Logistical Benefit
      if (LOGISTICAL_BENEFIT_EXCLUDED_ROLES.includes(unit.role)) continue;

      // Check faction compatibility
      if (unit.faction !== detachment.faction) continue;

      // Check sub-faction compatibility
      if (detachment.subFaction && unit.subFaction && unit.subFaction !== detachment.subFaction) {
        continue;
      }

      // Create a new slot via Logistical Benefit
      const newSlotDef = createSlotDefinition(unit.role, 1, 0);
      const newSlot: AllocatedSlot = {
        definition: newSlotDef,
        slotIndex: 0,
        unitId: unit.id,
        isPrime: false,
        usedPrimeRule: undefined,
      };

      // Mark the prime slot as using Logistical Benefit
      primeSlotWithUnit.usedPrimeRule = 'logistical-benefit';

      // Add the new slot to the detachment
      detachment.slots.push(newSlot);

      // Remove the unit from unallocated list
      context.unitsToAllocate.splice(i, 1);

      // Only one Logistical Benefit per detachment
      break;
    }
  }
}

/**
 * Allocate units with factions different from the primary faction to Allied Detachments.
 * Allied Detachments have no High Command slot, so they cannot unlock Apex detachments.
 * Command units in Allied Detachments can unlock Auxiliary detachments for that allied faction.
 */
function allocateAlliedDetachments(context: AllocationContext): void {
  // Find unallocated units that have a different faction from the primary
  const alliedUnits = context.unitsToAllocate.filter(
    (u) => u.faction !== context.army.primaryFaction
  );

  if (alliedUnits.length === 0) return;

  // Group by faction
  const unitsByFaction = groupUnitsByFaction(alliedUnits);

  const alliedDetDef = getAlliedDetachment();

  for (const [alliedFaction, units] of unitsByFaction) {
    // Initialise allied context for this faction
    context.alliedContexts.set(alliedFaction, {
      auxiliaryUnlocks: 0,
      usedAuxiliaryDetachmentIds: new Set(),
    });
    const alliedCtx = context.alliedContexts.get(alliedFaction)!;

    // Create Allied Detachment(s) for this faction
    // Keep creating detachments as long as we can allocate units
    let unitsForFaction = units;
    while (unitsForFaction.length > 0) {
      const alliedDet = createAllocatedDetachment(alliedDetDef, alliedFaction, undefined);

      const beforeCount = unitsForFaction.length;
      unitsForFaction = allocateUnitsToDetachment(alliedDet, unitsForFaction);
      const afterCount = unitsForFaction.length;

      // Only add the detachment if we actually allocated units
      if (beforeCount !== afterCount) {
        context.allocatedDetachments.push(alliedDet);

        // Count Command units allocated to this Allied Detachment for Auxiliary unlocks
        const allocatedCommand = context.army.units.filter((u) =>
          alliedDet.slots.some((s) => s.unitId === u.id && s.definition.role === 'command')
        );
        alliedCtx.auxiliaryUnlocks += countUnlocks(allocatedCommand, 'command');

        // Remove the allocated units from the main unitsToAllocate
        const allocatedUnitIds = new Set(
          alliedDet.slots.filter((s) => s.unitId).map((s) => s.unitId)
        );
        context.unitsToAllocate = context.unitsToAllocate.filter(
          (u) => !allocatedUnitIds.has(u.id)
        );
      } else {
        // No units could be allocated, break to avoid infinite loop
        break;
      }
    }

    // Now allocate remaining units of this faction to Auxiliary detachments
    const auxDetachments = getAuxiliaryDetachmentsForFaction(alliedFaction);
    const remainingUnitsOfFaction = context.unitsToAllocate.filter(
      (u) => u.faction === alliedFaction
    );

    for (let i = 0; i < alliedCtx.auxiliaryUnlocks && remainingUnitsOfFaction.length > 0; i++) {
      const unitsToCheck = context.unitsToAllocate.filter((u) => u.faction === alliedFaction);
      if (unitsToCheck.length === 0) break;

      const bestAux = selectBestDetachmentForFaction(
        auxDetachments,
        unitsToCheck,
        alliedFaction,
        context.army,
        alliedCtx.usedAuxiliaryDetachmentIds
      );

      if (bestAux) {
        alliedCtx.usedAuxiliaryDetachmentIds.add(bestAux.id);
        const auxDet = createAllocatedDetachment(bestAux, alliedFaction, undefined);

        const beforeCount = countFilledSlots(auxDet.slots);
        context.unitsToAllocate = allocateUnitsToDetachment(auxDet, context.unitsToAllocate);
        const afterCount = countFilledSlots(auxDet.slots);

        // Only add the detachment if we actually allocated units
        if (afterCount > beforeCount) {
          context.allocatedDetachments.push(auxDet);
        }
      }
    }
  }
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
    alliedContexts: new Map(),
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

  // Step 4: Allocate to Allied Detachments for units with different factions
  allocateAlliedDetachments(context);

  // Step 5: Check for units that unlock specific detachments
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

  // Step 6: Apply Logistical Benefit to allocate remaining units where possible
  // Units are already in Prime slots first, so we can directly apply Logistical Benefit
  applyLogisticalBenefit(context);

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
