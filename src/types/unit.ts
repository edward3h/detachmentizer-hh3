import type { Allegiance } from './allegiance';
import type { BattlefieldRole } from './battlefield-role';
import type { FactionId, SubFactionId } from './faction';

export interface Unit {
  id: string;
  name: string;
  role: BattlefieldRole;
  faction: FactionId;
  subFaction?: SubFactionId;
  fixedAllegiance?: Allegiance;
  officerOfTheLine?: number;
}

export interface KnownUnit {
  name: string;
  role: BattlefieldRole;
  faction: FactionId;
  subFaction?: SubFactionId;
  fixedAllegiance?: Allegiance;
  officerOfTheLine?: number;
  unlocksDetachment?: string;
}

export function createUnit(
  name: string,
  role: BattlefieldRole,
  faction: FactionId,
  subFaction?: SubFactionId,
  officerOfTheLine?: number
): Unit {
  return {
    id: crypto.randomUUID(),
    name,
    role,
    faction,
    subFaction,
    officerOfTheLine,
  };
}
