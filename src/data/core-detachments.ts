import type { DetachmentDefinition } from '../types';
import { createSlotDefinition } from '../types';

export const CORE_DETACHMENTS: DetachmentDefinition[] = [
  {
    id: 'primary-crusade',
    name: 'Crusade Primary Detachment',
    category: 'primary',
    maxCount: 1,
    slots: [
      createSlotDefinition('high-command', 1),
      createSlotDefinition('command', 3, 1),
      createSlotDefinition('troops', 4, 1),
      createSlotDefinition('transport', 4),
    ],
  },
  {
    id: 'warlord',
    name: 'Warlord Detachment',
    category: 'warlord',
    maxCount: 1,
    notes:
      'Must have same Faction as Primary. Points limit 3000+. Total Warlord + Lord of War <= 25% points.',
    slots: [
      createSlotDefinition('warlord', 1),
      createSlotDefinition('retinue', 1),
      createSlotDefinition('heavy-transport', 1),
    ],
  },
  {
    id: 'lord-of-war',
    name: 'Lord of War Detachment',
    category: 'lord-of-war',
    maxCount: 1,
    slots: [createSlotDefinition('lord-of-war', 2)],
  },
  {
    id: 'allied',
    name: 'Allied Detachment',
    category: 'allied',
    notes: 'Must have different Faction than Primary. Total Allied <= 50% points.',
    slots: [createSlotDefinition('command', 2, 1), createSlotDefinition('troops', 4)],
  },
];

export const GENERIC_APEX_DETACHMENTS: DetachmentDefinition[] = [
  {
    id: 'combat-retinue',
    name: 'Combat Retinue',
    category: 'apex',
    slots: [createSlotDefinition('retinue', 3, 1)],
  },
  {
    id: 'officer-cadre',
    name: 'Officer Cadre',
    category: 'apex',
    slots: [createSlotDefinition('command', 2, 1)],
  },
  {
    id: 'army-vanguard',
    name: 'Army Vanguard',
    category: 'apex',
    slots: [createSlotDefinition('elites', 3, 1)],
  },
];

export const GENERIC_AUXILIARY_DETACHMENTS: DetachmentDefinition[] = [
  {
    id: 'armoured-fist',
    name: 'Armoured Fist',
    category: 'auxiliary',
    slots: [createSlotDefinition('transport', 4), createSlotDefinition('heavy-transport', 4)],
  },
  {
    id: 'tactical-support',
    name: 'Tactical Support',
    category: 'auxiliary',
    slots: [createSlotDefinition('troops', 2), createSlotDefinition('support', 2)],
  },
  {
    id: 'armoured-support',
    name: 'Armoured Support',
    category: 'auxiliary',
    slots: [createSlotDefinition('armour', 4)],
  },
  {
    id: 'heavy-support',
    name: 'Heavy Support',
    category: 'auxiliary',
    slots: [createSlotDefinition('war-engine', 1)],
  },
  {
    id: 'combat-pioneer',
    name: 'Combat Pioneer',
    category: 'auxiliary',
    slots: [createSlotDefinition('recon', 2)],
  },
  {
    id: 'shock-assault',
    name: 'Shock Assault',
    category: 'auxiliary',
    slots: [createSlotDefinition('heavy-assault', 2)],
  },
  {
    id: 'first-strike',
    name: 'First Strike',
    category: 'auxiliary',
    slots: [createSlotDefinition('fast-attack', 2)],
  },
];

export function getAllCoreDetachments(): DetachmentDefinition[] {
  return [...CORE_DETACHMENTS, ...GENERIC_APEX_DETACHMENTS, ...GENERIC_AUXILIARY_DETACHMENTS];
}
