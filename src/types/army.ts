import type { Allegiance } from './allegiance';
import type { FactionId, SubFactionId } from './faction';
import type { Unit } from './unit';

export interface ArmyState {
  allegiance: Allegiance;
  primaryFaction: FactionId;
  primarySubFaction?: SubFactionId;
  units: Unit[];
}

export function createArmy(
  allegiance: Allegiance,
  primaryFaction: FactionId,
  primarySubFaction?: SubFactionId
): ArmyState {
  return {
    allegiance,
    primaryFaction,
    primarySubFaction,
    units: [],
  };
}
