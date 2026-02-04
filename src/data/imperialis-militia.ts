import type { DetachmentDefinition } from '../types';
import { createSlotDefinition } from '../types';

export const IMPERIALIS_MILITIA_APEX_DETACHMENTS: DetachmentDefinition[] = [
  {
    id: 'im-grenadier-muster',
    name: 'Grenadier Muster',
    category: 'apex',
    faction: 'imperialis-militia',
    slots: [createSlotDefinition('elites', 8, 1)],
  },
  {
    id: 'im-ogryn-auxilia',
    name: 'Ogryn Auxilia',
    category: 'apex',
    faction: 'imperialis-militia',
    slots: [
      createSlotDefinition('heavy-assault', 8, 1, {
        only: ['Ogryn'],
      }),
    ],
    notes: 'Slots may only be used for Ogryn units.',
  },
  {
    id: 'im-infantry-cohort',
    name: 'Infantry Cohort',
    category: 'apex',
    faction: 'imperialis-militia',
    slots: [createSlotDefinition('troops', 8, 1)],
  },
  {
    id: 'im-artillery-division',
    name: 'Artillery Division',
    category: 'apex',
    faction: 'imperialis-militia',
    slots: [
      createSlotDefinition('support', 8, 1, {
        exclude: ['Militia Medicae'],
      }),
    ],
    notes: 'Slots may not be used for Militia Medicae units.',
  },
  {
    id: 'im-cavalry-wing',
    name: 'Cavalry Wing',
    category: 'apex',
    faction: 'imperialis-militia',
    slots: [
      createSlotDefinition('recon', 8, 1, {
        only: ['Cavalry Troop'],
      }),
    ],
    notes: 'Slots may only be used for Cavalry Troop units.',
  },
  {
    id: 'im-armoured-phalanx',
    name: 'Armoured Phalanx',
    category: 'apex',
    faction: 'imperialis-militia',
    slots: [createSlotDefinition('lord-of-war', 1), createSlotDefinition('armour', 7)],
  },
];

export const IMPERIALIS_MILITIA_AUXILIARY_DETACHMENTS: DetachmentDefinition[] = [
  {
    id: 'im-oversight-delegation',
    name: 'Oversight Delegation',
    category: 'auxiliary',
    faction: 'imperialis-militia',
    slots: [
      createSlotDefinition('command', 1),
      createSlotDefinition('support', 4, 0, {
        only: ['Militia Medicae'],
      }),
    ],
    notes: 'Support slots may only be used for Militia Medicae units.',
  },
  {
    id: 'im-storm-cadre',
    name: 'Storm Cadre',
    category: 'auxiliary',
    faction: 'imperialis-militia',
    slots: [createSlotDefinition('elites', 2)],
  },
  {
    id: 'im-daemonic-manifestation',
    name: 'Daemonic Manifestation',
    category: 'auxiliary',
    faction: 'imperialis-militia',
    unlockRequirement: {
      unitName: 'Rogue Psyker',
      allegiance: 'traitor',
    },
    slots: [
      createSlotDefinition('heavy-assault', 3, 0, {
        only: ['Ruinstorm Daemon Brute'],
      }),
    ],
    notes: 'Slots may only be used for Ruinstorm Daemon Brute units from Daemons of the Ruinstorm.',
  },
];

export function getAllImperialisMilitiaDetachments(): DetachmentDefinition[] {
  return [...IMPERIALIS_MILITIA_APEX_DETACHMENTS, ...IMPERIALIS_MILITIA_AUXILIARY_DETACHMENTS];
}
