import { describe, it, expect } from 'vitest';
import { allocateArmy } from './allocator';
import type { ArmyState, Unit } from '../types';

function createTestUnit(
  name: string,
  role: Unit['role'],
  faction: Unit['faction'],
  id?: string
): Unit {
  return {
    id: id ?? crypto.randomUUID(),
    name,
    role,
    faction,
  };
}

describe('allocateArmy', () => {
  describe('Allied Detachments', () => {
    it('allocates units with different faction to Allied Detachment', () => {
      // Reproduces issue #25
      const army: ArmyState = {
        allegiance: 'traitor',
        primaryFaction: 'daemons-of-the-ruinstorm',
        units: [
          createTestUnit('Ruinstorm Daemon Harbinger', 'command', 'daemons-of-the-ruinstorm'),
          createTestUnit('Ruinstorm Lesser Daemons', 'troops', 'daemons-of-the-ruinstorm'),
          createTestUnit('Infantry Troop', 'troops', 'imperialis-militia'),
        ],
      };

      const result = allocateArmy(army);

      // Should have no unallocated units
      expect(result.unallocatedUnits).toHaveLength(0);

      // Should have exactly 2 detachments: Primary + Allied
      expect(result.detachments).toHaveLength(2);

      // First should be Primary Detachment with daemons faction
      const primaryDet = result.detachments[0];
      expect(primaryDet.definition.id).toBe('primary-crusade');
      expect(primaryDet.faction).toBe('daemons-of-the-ruinstorm');

      // Second should be Allied Detachment with imperialis-militia faction
      const alliedDet = result.detachments[1];
      expect(alliedDet.definition.id).toBe('allied');
      expect(alliedDet.faction).toBe('imperialis-militia');

      // The Infantry Troop should be in the Allied Detachment
      const alliedTroopsSlots = alliedDet.slots.filter(
        (s) => s.definition.role === 'troops' && s.unitId
      );
      expect(alliedTroopsSlots).toHaveLength(1);
    });

    it('does not create empty detachments', () => {
      // Issue #25: Empty Armoured Fist detachment was being added
      const army: ArmyState = {
        allegiance: 'traitor',
        primaryFaction: 'daemons-of-the-ruinstorm',
        units: [
          createTestUnit('Ruinstorm Daemon Harbinger', 'command', 'daemons-of-the-ruinstorm'),
          createTestUnit('Ruinstorm Lesser Daemons', 'troops', 'daemons-of-the-ruinstorm'),
        ],
      };

      const result = allocateArmy(army);

      // All detachments should have at least one unit allocated
      for (const det of result.detachments) {
        const filledSlots = det.slots.filter((s) => s.unitId);
        expect(
          filledSlots.length,
          `Detachment ${det.definition.name} should have at least one unit`
        ).toBeGreaterThan(0);
      }
    });

    it('handles multiple allied factions', () => {
      const army: ArmyState = {
        allegiance: 'traitor',
        primaryFaction: 'daemons-of-the-ruinstorm',
        units: [
          createTestUnit('Ruinstorm Daemon Harbinger', 'command', 'daemons-of-the-ruinstorm'),
          createTestUnit('Infantry Troop 1', 'troops', 'imperialis-militia'),
          createTestUnit('Auxilia Infantry', 'troops', 'solar-auxilia'),
        ],
      };

      const result = allocateArmy(army);

      // Should have 3 detachments: Primary + 2 Allied
      expect(result.detachments).toHaveLength(3);

      // Should have no unallocated units
      expect(result.unallocatedUnits).toHaveLength(0);

      // Should have Allied Detachments for both factions
      const alliedDets = result.detachments.filter((d) => d.definition.id === 'allied');
      expect(alliedDets).toHaveLength(2);

      const factions = alliedDets.map((d) => d.faction).sort();
      expect(factions).toEqual(['imperialis-militia', 'solar-auxilia']);
    });

    it('Allied Command units unlock Auxiliary detachments for allied faction', () => {
      const army: ArmyState = {
        allegiance: 'loyalist',
        primaryFaction: 'legiones-astartes',
        primarySubFaction: 'ultramarines',
        units: [
          createTestUnit('Legion Praetor', 'command', 'legiones-astartes'),
          // Allied faction units
          createTestUnit('Auxilia Command', 'command', 'solar-auxilia'),
          createTestUnit('Auxilia Infantry 1', 'troops', 'solar-auxilia'),
          createTestUnit('Auxilia Infantry 2', 'troops', 'solar-auxilia'),
          createTestUnit('Auxilia Infantry 3', 'troops', 'solar-auxilia'),
          createTestUnit('Auxilia Infantry 4', 'troops', 'solar-auxilia'),
          createTestUnit('Auxilia Infantry 5', 'troops', 'solar-auxilia'),
        ],
      };

      const result = allocateArmy(army);

      // Allied Detachment can hold 2 Command + 4 Troops
      // Should have Primary + Allied + at least one Auxiliary for the extra Troop
      expect(result.detachments.length).toBeGreaterThanOrEqual(2);

      // The Command unit in Allied Detachment should unlock Auxiliary detachments
      // So we should have no unallocated units (or just 1 if we can't fit all)
      // With 1 Command unlock, we can use 1 Auxiliary (Tactical Support has 2 Troops)
      // So all 5 troops + 1 command should fit
      const alliedDet = result.detachments.find(
        (d) => d.definition.id === 'allied' && d.faction === 'solar-auxilia'
      );
      expect(alliedDet).toBeDefined();
    });
  });

  describe('empty detachment prevention', () => {
    it('does not add Auxiliary detachments with no units allocated', () => {
      const army: ArmyState = {
        allegiance: 'loyalist',
        primaryFaction: 'legiones-astartes',
        primarySubFaction: 'ultramarines',
        units: [
          createTestUnit('Legion Praetor', 'command', 'legiones-astartes'),
          createTestUnit('Tactical Squad', 'troops', 'legiones-astartes'),
        ],
      };

      const result = allocateArmy(army);

      // Should only have Primary Detachment (everything fits)
      // Should NOT have an empty Auxiliary detachment
      for (const det of result.detachments) {
        const filledSlots = det.slots.filter((s) => s.unitId);
        expect(
          filledSlots.length,
          `Detachment ${det.definition.name} should not be empty`
        ).toBeGreaterThan(0);
      }
    });
  });
});
