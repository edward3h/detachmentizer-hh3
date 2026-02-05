import type { Allegiance } from '../types/allegiance';
import type { BattlefieldRole } from '../types/battlefield-role';
import type { FactionId, SubFactionId } from '../types/faction';

export const CURRENT_YAML_VERSION = 1;

export interface YamlUnitData {
  name: string;
  role: BattlefieldRole;
  faction: FactionId;
  subFaction?: SubFactionId;
  officerOfTheLine?: number;
}

export interface YamlArmyData {
  allegiance: Allegiance;
  primaryFaction: FactionId;
  primarySubFaction?: SubFactionId;
  units: YamlUnitData[];
}

export interface YamlArmyFile {
  version: number;
  exportedAt: string;
  army: YamlArmyData | null;
  customUnitNames: string[];
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

const VALID_ALLEGIANCES: readonly string[] = ['loyalist', 'traitor'];

const VALID_BATTLEFIELD_ROLES: readonly string[] = [
  'warlord',
  'lord-of-war',
  'high-command',
  'command',
  'retinue',
  'elites',
  'war-engine',
  'troops',
  'support',
  'transport',
  'heavy-transport',
  'heavy-assault',
  'armour',
  'recon',
  'fast-attack',
];

const VALID_FACTION_IDS: readonly string[] = [
  'legiones-astartes',
  'solar-auxilia',
  'mechanicum',
  'imperialis-militia',
  'daemons-of-the-ruinstorm',
  'cults-abominatio',
  'knights-errant',
  'legio-custodes',
  'anathema-psykana',
  'divisio-assassinorum',
  'questoris-familia',
];

const VALID_SUB_FACTION_IDS: readonly string[] = [
  'dark-angels',
  'emperors-children',
  'iron-warriors',
  'white-scars',
  'space-wolves',
  'imperial-fists',
  'night-lords',
  'blood-angels',
  'iron-hands',
  'world-eaters',
  'ultramarines',
  'death-guard',
  'thousand-sons',
  'sons-of-horus',
  'word-bearers',
  'salamanders',
  'raven-guard',
  'alpha-legion',
  'blackshields',
  'shattered-legions',
];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function validateUnit(unit: unknown, index: number): ValidationResult {
  if (!isObject(unit)) {
    return { valid: false, error: `Unit at index ${index} is not an object` };
  }

  if (typeof unit.name !== 'string' || unit.name.trim() === '') {
    return { valid: false, error: `Unit at index ${index} has invalid name` };
  }

  if (typeof unit.role !== 'string' || !VALID_BATTLEFIELD_ROLES.includes(unit.role)) {
    return { valid: false, error: `Unit at index ${index} has invalid role: ${unit.role}` };
  }

  if (typeof unit.faction !== 'string' || !VALID_FACTION_IDS.includes(unit.faction)) {
    return { valid: false, error: `Unit at index ${index} has invalid faction: ${unit.faction}` };
  }

  if (
    unit.subFaction !== undefined &&
    (typeof unit.subFaction !== 'string' || !VALID_SUB_FACTION_IDS.includes(unit.subFaction))
  ) {
    return {
      valid: false,
      error: `Unit at index ${index} has invalid subFaction: ${unit.subFaction}`,
    };
  }

  if (
    unit.officerOfTheLine !== undefined &&
    (typeof unit.officerOfTheLine !== 'number' || unit.officerOfTheLine < 0)
  ) {
    return {
      valid: false,
      error: `Unit at index ${index} has invalid officerOfTheLine: ${unit.officerOfTheLine}`,
    };
  }

  return { valid: true };
}

function validateArmy(army: unknown): ValidationResult {
  if (army === null) {
    return { valid: true };
  }

  if (!isObject(army)) {
    return { valid: false, error: 'Army must be an object or null' };
  }

  if (typeof army.allegiance !== 'string' || !VALID_ALLEGIANCES.includes(army.allegiance)) {
    return { valid: false, error: `Invalid allegiance: ${army.allegiance}` };
  }

  if (typeof army.primaryFaction !== 'string' || !VALID_FACTION_IDS.includes(army.primaryFaction)) {
    return { valid: false, error: `Invalid primaryFaction: ${army.primaryFaction}` };
  }

  if (
    army.primarySubFaction !== undefined &&
    (typeof army.primarySubFaction !== 'string' ||
      !VALID_SUB_FACTION_IDS.includes(army.primarySubFaction))
  ) {
    return { valid: false, error: `Invalid primarySubFaction: ${army.primarySubFaction}` };
  }

  if (!Array.isArray(army.units)) {
    return { valid: false, error: 'Army units must be an array' };
  }

  for (let i = 0; i < army.units.length; i++) {
    const unitResult = validateUnit(army.units[i], i);
    if (!unitResult.valid) {
      return unitResult;
    }
  }

  return { valid: true };
}

export function validateYamlArmyFile(data: unknown): ValidationResult {
  if (!isObject(data)) {
    return { valid: false, error: 'File data must be an object' };
  }

  if (typeof data.version !== 'number') {
    return { valid: false, error: 'Missing or invalid version field' };
  }

  if (data.version > CURRENT_YAML_VERSION) {
    return {
      valid: false,
      error: `File version ${data.version} is newer than supported version ${CURRENT_YAML_VERSION}. Please update the application.`,
    };
  }

  if (typeof data.exportedAt !== 'string') {
    return { valid: false, error: 'Missing or invalid exportedAt field' };
  }

  const armyResult = validateArmy(data.army);
  if (!armyResult.valid) {
    return armyResult;
  }

  if (!isStringArray(data.customUnitNames)) {
    return { valid: false, error: 'customUnitNames must be an array of strings' };
  }

  return { valid: true };
}
