import type { DetachmentDefinition } from '../types';
import { createSlotDefinition } from '../types';

export const MECHANICUM_AUXILIARY_DETACHMENTS: DetachmentDefinition[] = [
  {
    id: 'mech-taghmata-cohort',
    name: 'Taghmata Cohort',
    category: 'auxiliary',
    faction: 'mechanicum',
    slots: [createSlotDefinition('support', 4)],
  },
  {
    id: 'mech-apprentice-cadre',
    name: 'Apprentice Cadre',
    category: 'auxiliary',
    faction: 'mechanicum',
    slots: [createSlotDefinition('troops', 4, 1, { only: ['Tech-priest'] })],
    notes: 'Slots may only be used to select Tech-priest units.',
  },
];

export const MECHANICUM_APEX_DETACHMENTS: DetachmentDefinition[] = [
  {
    id: 'mech-heart-of-power',
    name: 'The Heart of Power',
    category: 'apex',
    faction: 'mechanicum',
    subFaction: 'archimandrite',
    slots: [createSlotDefinition('retinue', 3, 1), createSlotDefinition('troops', 3, 3)],
    notes:
      'Unlocked by Archimandrite High Command. Troops Prime slots may only use Combat Veterans rule.',
  },
  {
    id: 'mech-command-maniple',
    name: 'Command Maniple',
    category: 'apex',
    faction: 'mechanicum',
    subFaction: 'cybernetica',
    slots: [
      createSlotDefinition('elites', 1, 1),
      createSlotDefinition('support', 1, 1),
      createSlotDefinition('war-engine', 1, 1),
    ],
    notes: 'Unlocked by Cybernetica High Command. May only contain Automata units.',
  },
  {
    id: 'mech-panoply-of-cruelty',
    name: 'The Panoply of Cruelty',
    category: 'apex',
    faction: 'mechanicum',
    subFaction: 'lacrymaerta',
    slots: [createSlotDefinition('heavy-assault', 3, 3, { only: ['Ursrax Cohort'] })],
    notes: 'Unlocked by Lacrymaerta High Command. Slots may only be used for Ursrax Cohort units.',
  },
  {
    id: 'mech-host-of-destruction',
    name: 'The Host of Destruction',
    category: 'apex',
    faction: 'mechanicum',
    subFaction: 'myrmidax',
    slots: [createSlotDefinition('elites', 4, 1)],
    notes: 'Unlocked by Myrmidax High Command. May only contain Myrmidax units.',
  },
  {
    id: 'mech-crux-of-judgement',
    name: 'Crux of Judgement',
    category: 'apex',
    faction: 'mechanicum',
    subFaction: 'malagra',
    slots: [createSlotDefinition('command', 3, 0, { only: ['Arcuitor Magisterium'] })],
    unitsDoNotUnlockDetachments: true,
    notes:
      'Unlocked by Malagra High Command. Slots may only be used for Arcuitor Magisterium units. Units do not unlock Auxiliary detachments.',
  },
  {
    id: 'mech-iron-phalanx',
    name: 'Iron Phalanx',
    category: 'apex',
    faction: 'mechanicum',
    subFaction: 'macrotek',
    slots: [createSlotDefinition('armour', 3, 3), createSlotDefinition('heavy-transport', 3, 3)],
    notes:
      'Unlocked by Macrotek High Command. Units must have Vehicle type and Prime Conveyor rule.',
  },
  {
    id: 'mech-thallax-command-cohort',
    name: 'Thallax Command Cohort',
    category: 'apex',
    faction: 'mechanicum',
    subFaction: 'reductor',
    slots: [createSlotDefinition('support', 3, 3, { only: ['Thallax Cohort'] })],
    notes: 'Unlocked by Reductor High Command. Slots may only be used for Thallax Cohort units.',
  },
];

export function getAllMechanicumDetachments(): DetachmentDefinition[] {
  return [...MECHANICUM_AUXILIARY_DETACHMENTS, ...MECHANICUM_APEX_DETACHMENTS];
}
