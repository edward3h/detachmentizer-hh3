import type { Allegiance } from './allegiance';

export type FactionId =
  | 'legiones-astartes'
  | 'solar-auxilia'
  | 'mechanicum'
  | 'imperialis-militia'
  | 'daemons-of-the-ruinstorm'
  | 'cults-abominatio'
  | 'knights-errant'
  | 'legio-custodes'
  | 'anathema-psykana'
  | 'divisio-assassinorum'
  | 'questoris-familia';

export type LegionId =
  | 'dark-angels'
  | 'emperors-children'
  | 'iron-warriors'
  | 'white-scars'
  | 'space-wolves'
  | 'imperial-fists'
  | 'night-lords'
  | 'blood-angels'
  | 'iron-hands'
  | 'world-eaters'
  | 'ultramarines'
  | 'death-guard'
  | 'thousand-sons'
  | 'sons-of-horus'
  | 'word-bearers'
  | 'salamanders'
  | 'raven-guard'
  | 'alpha-legion'
  | 'blackshields'
  | 'shattered-legions';

export type MechanicumArcanaId =
  | 'archimandrite'
  | 'cybernetica'
  | 'lacrymaerta'
  | 'myrmidax'
  | 'reductor'
  | 'malagra'
  | 'macrotek';

export type SubFactionId = LegionId | MechanicumArcanaId;

export interface FactionDefinition {
  id: FactionId;
  name: string;
  fixedAllegiance?: Allegiance;
  canBeDetachmentFaction: boolean;
  canBePrimaryFaction: boolean;
  subFactions?: readonly SubFactionId[];
  subFactionLabel?: string;
}

export interface SubFactionDefinition {
  id: SubFactionId;
  name: string;
  parentFaction: FactionId;
}

export const FACTIONS: readonly FactionDefinition[] = [
  {
    id: 'legiones-astartes',
    name: 'Legiones Astartes',
    canBeDetachmentFaction: true,
    canBePrimaryFaction: true,
    subFactions: [
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
    ],
    subFactionLabel: 'Legion',
  },
  {
    id: 'solar-auxilia',
    name: 'Solar Auxilia',
    canBeDetachmentFaction: true,
    canBePrimaryFaction: true,
  },
  {
    id: 'mechanicum',
    name: 'Mechanicum',
    canBeDetachmentFaction: true,
    canBePrimaryFaction: true,
    subFactions: [
      'archimandrite',
      'cybernetica',
      'lacrymaerta',
      'myrmidax',
      'reductor',
      'malagra',
      'macrotek',
    ],
    subFactionLabel: 'Arcana',
  },
  {
    id: 'imperialis-militia',
    name: 'Imperialis Militia',
    canBeDetachmentFaction: true,
    canBePrimaryFaction: true,
  },
  {
    id: 'daemons-of-the-ruinstorm',
    name: 'Daemons of the Ruinstorm',
    fixedAllegiance: 'traitor',
    canBeDetachmentFaction: true,
    canBePrimaryFaction: true,
  },
  {
    id: 'cults-abominatio',
    name: 'Cults Abominatio',
    fixedAllegiance: 'traitor',
    canBeDetachmentFaction: false,
    canBePrimaryFaction: false,
  },
  {
    id: 'knights-errant',
    name: 'Knights-Errant',
    fixedAllegiance: 'loyalist',
    canBeDetachmentFaction: true,
    canBePrimaryFaction: true,
  },
  {
    id: 'legio-custodes',
    name: 'Legio Custodes',
    fixedAllegiance: 'loyalist',
    canBeDetachmentFaction: true,
    canBePrimaryFaction: true,
  },
  {
    id: 'anathema-psykana',
    name: 'Anathema Psykana',
    fixedAllegiance: 'loyalist',
    canBeDetachmentFaction: true,
    canBePrimaryFaction: true,
  },
  {
    id: 'divisio-assassinorum',
    name: 'Divisio Assassinorum',
    fixedAllegiance: 'loyalist',
    canBeDetachmentFaction: false,
    canBePrimaryFaction: false,
  },
  {
    id: 'questoris-familia',
    name: 'Questoris Familia',
    canBeDetachmentFaction: true,
    canBePrimaryFaction: false, // Has special rules, skipping for now
  },
] as const;

export const SUB_FACTIONS: readonly SubFactionDefinition[] = [
  // Legiones Astartes
  { id: 'dark-angels', name: 'Dark Angels', parentFaction: 'legiones-astartes' },
  { id: 'emperors-children', name: "Emperor's Children", parentFaction: 'legiones-astartes' },
  { id: 'iron-warriors', name: 'Iron Warriors', parentFaction: 'legiones-astartes' },
  { id: 'white-scars', name: 'White Scars', parentFaction: 'legiones-astartes' },
  { id: 'space-wolves', name: 'Space Wolves', parentFaction: 'legiones-astartes' },
  { id: 'imperial-fists', name: 'Imperial Fists', parentFaction: 'legiones-astartes' },
  { id: 'night-lords', name: 'Night Lords', parentFaction: 'legiones-astartes' },
  { id: 'blood-angels', name: 'Blood Angels', parentFaction: 'legiones-astartes' },
  { id: 'iron-hands', name: 'Iron Hands', parentFaction: 'legiones-astartes' },
  { id: 'world-eaters', name: 'World Eaters', parentFaction: 'legiones-astartes' },
  { id: 'ultramarines', name: 'Ultramarines', parentFaction: 'legiones-astartes' },
  { id: 'death-guard', name: 'Death Guard', parentFaction: 'legiones-astartes' },
  { id: 'thousand-sons', name: 'Thousand Sons', parentFaction: 'legiones-astartes' },
  { id: 'sons-of-horus', name: 'Sons of Horus', parentFaction: 'legiones-astartes' },
  { id: 'word-bearers', name: 'Word Bearers', parentFaction: 'legiones-astartes' },
  { id: 'salamanders', name: 'Salamanders', parentFaction: 'legiones-astartes' },
  { id: 'raven-guard', name: 'Raven Guard', parentFaction: 'legiones-astartes' },
  { id: 'alpha-legion', name: 'Alpha Legion', parentFaction: 'legiones-astartes' },
  { id: 'blackshields', name: 'Blackshields', parentFaction: 'legiones-astartes' },
  { id: 'shattered-legions', name: 'Shattered Legions', parentFaction: 'legiones-astartes' },
  // Mechanicum
  { id: 'archimandrite', name: 'Archimandrite', parentFaction: 'mechanicum' },
  { id: 'cybernetica', name: 'Cybernetica', parentFaction: 'mechanicum' },
  { id: 'lacrymaerta', name: 'Lacrymaerta', parentFaction: 'mechanicum' },
  { id: 'myrmidax', name: 'Myrmidax', parentFaction: 'mechanicum' },
  { id: 'reductor', name: 'Reductor', parentFaction: 'mechanicum' },
  { id: 'malagra', name: 'Malagra', parentFaction: 'mechanicum' },
  { id: 'macrotek', name: 'Macrotek', parentFaction: 'mechanicum' },
] as const;

export function getFaction(id: FactionId): FactionDefinition | undefined {
  return FACTIONS.find((f) => f.id === id);
}

export function getSubFaction(id: SubFactionId): SubFactionDefinition | undefined {
  return SUB_FACTIONS.find((s) => s.id === id);
}

export function canFactionHaveAllegiance(
  faction: FactionDefinition,
  allegiance: Allegiance
): boolean {
  if (faction.fixedAllegiance) {
    return faction.fixedAllegiance === allegiance;
  }
  return true;
}
