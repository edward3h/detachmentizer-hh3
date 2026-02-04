import type { DetachmentDefinition } from '../types';
import { createSlotDefinition } from '../types';

export const LEGIONES_ASTARTES_AUXILIARY_DETACHMENTS: DetachmentDefinition[] = [
  {
    id: 'la-daemonic-manifestation',
    name: 'Daemonic Manifestation',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    unlockRequirement: {
      unitName: 'Esoterist',
      allegiance: 'traitor',
    },
    slots: [
      createSlotDefinition('heavy-assault', 3, 0, {
        only: ['Ruinstorm Daemon Brute'],
      }),
    ],
    notes: 'Slots may only be used for Ruinstorm Daemon Brute units from Daemons of the Ruinstorm.',
  },
  {
    id: 'la-veteran-cadre',
    name: 'Veteran Cadre',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    unlockRequirement: { unitName: 'Legion Champion' },
    slots: [
      createSlotDefinition('retinue', 1),
      createSlotDefinition('elites', 1),
      createSlotDefinition('heavy-transport', 1),
    ],
  },
  {
    id: 'la-apothecarion-delegation',
    name: 'Apothecarion Delegation',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    slots: [
      createSlotDefinition('support', 6, 1, {
        only: ['Apothecary'],
      }),
    ],
    notes: 'Slots may only be used for Apothecary units.',
  },
  {
    id: 'la-techmarine-covenant',
    name: 'Techmarine Covenant',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    slots: [
      createSlotDefinition('support', 6, 1, {
        only: ['Techmarine'],
      }),
    ],
    notes: 'Slots may only be used for Techmarine units.',
  },
  {
    id: 'la-recon-demi-company',
    name: 'Recon Demi-company',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    unlockRequirement: { unitName: 'Vigilator' },
    slots: [
      createSlotDefinition('recon', 3, 1, {
        only: ['Reconnaissance Squad'],
      }),
      createSlotDefinition('fast-attack', 1),
    ],
    notes: 'Recon slots may only be used for Reconnaissance Squad units.',
  },
  {
    id: 'la-storm-battery',
    name: 'Storm Battery',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    unlockRequirement: { unitName: 'Siege Breaker' },
    slots: [
      createSlotDefinition('support', 2, 0, {
        only: ['Rapier Battery'],
      }),
      createSlotDefinition('armour', 2, 0, {
        only: ['Arquitor Bombard', 'Vindicator Siege Tank'],
      }),
    ],
    notes:
      'Support slots for Rapier Battery only. Armour slots for Arquitor Bombard or Vindicator Siege Tank only.',
  },
  {
    id: 'la-ironwing-gauntlet',
    name: 'Ironwing Gauntlet',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'dark-angels',
    slots: [createSlotDefinition('heavy-transport', 2), createSlotDefinition('armour', 2)],
  },
  {
    id: 'la-dreadwing-cadre',
    name: 'Dreadwing Cadre',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'dark-angels',
    slots: [
      createSlotDefinition('support', 3, 1, {
        only: ['Dreadwing Interemptor', 'Rapier Battery'],
      }),
    ],
    notes: 'Slots may only be used for Dreadwing Interemptor or Rapier Battery units.',
  },
  {
    id: 'la-stormwing-muster',
    name: 'Stormwing Muster',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'dark-angels',
    slots: [createSlotDefinition('troops', 2, 2), createSlotDefinition('transport', 2)],
  },
  {
    id: 'la-deathwing-conclave',
    name: 'Deathwing Conclave',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'dark-angels',
    slots: [
      createSlotDefinition('retinue', 1, 1),
      createSlotDefinition('elites', 1),
      createSlotDefinition('heavy-assault', 1),
    ],
  },
  {
    id: 'la-ravenwing-lance',
    name: 'Ravenwing Lance',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'dark-angels',
    slots: [
      createSlotDefinition('fast-attack', 2, 1),
      createSlotDefinition('recon', 2, 0, {
        only: ['Outrider Squadron'],
      }),
    ],
    notes: 'Recon slots may only be used for Outrider Squadron units.',
  },
  {
    id: 'la-firewing-echelon',
    name: 'Firewing Echelon',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'dark-angels',
    slots: [
      createSlotDefinition('recon', 2, 1),
      createSlotDefinition('elites', 2, 0, {
        only: ['Seeker Squad'],
      }),
    ],
    notes: 'Elites slots may only be used for Seeker Squad units.',
  },
  {
    id: 'la-chogorian-warband',
    name: 'Chogorian Warband',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'white-scars',
    slots: [
      createSlotDefinition('fast-attack', 2, 1, {
        only: ['Scimitar Jetbike Squadron'],
      }),
      createSlotDefinition('recon', 2, 0, {
        only: ['Outrider Squadron'],
      }),
    ],
    notes:
      'Fast Attack slots for Scimitar Jetbike Squadron only. Recon slots for Outrider Squadron only.',
  },
  {
    id: 'la-bloodied-claw',
    name: 'Bloodied Claw',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'space-wolves',
    slots: [
      createSlotDefinition('troops', 2, 1, {
        only: ['Grey Slayer Pack'],
      }),
      createSlotDefinition('heavy-assault', 2),
    ],
    notes: 'Troops slots may only be used for Grey Slayer Pack units.',
  },
  {
    id: 'la-siege-gauntlet',
    name: 'Siege Gauntlet',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'imperial-fists',
    slots: [
      createSlotDefinition('troops', 2, 1, {
        only: ['Breacher Squad'],
      }),
      createSlotDefinition('heavy-assault', 1),
      createSlotDefinition('support', 1),
    ],
    notes: 'Troops slots may only be used for Breacher Squad units.',
  },
  {
    id: 'la-revelation-host',
    name: 'Revelation Host',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'blood-angels',
    slots: [
      createSlotDefinition('troops', 2, 1, {
        only: ['Assault Squad'],
      }),
      createSlotDefinition('elites', 2, 0, {
        only: ['Dawnbreaker Cohort', 'Veteran Assault Squad'],
      }),
    ],
    notes:
      'Troops slots for Assault Squad only. Elites slots for Dawnbreaker Cohort or Veteran Assault Squad only.',
  },
  {
    id: 'la-spearhead-phalanx',
    name: 'Spearhead Phalanx',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'iron-hands',
    slots: [
      createSlotDefinition('heavy-transport', 1, 0, {
        only: ['Land Raider Carrier', 'Spartan'],
      }),
      createSlotDefinition('armour', 1),
      createSlotDefinition('heavy-assault', 1),
    ],
    notes: 'Heavy Transport slots for Land Raider Carrier or Spartan only.',
  },
  {
    id: 'la-primus-demi-company',
    name: 'Primus Demi-company',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'ultramarines',
    slots: [
      createSlotDefinition('command', 1, 1, {
        only: ['Optae'],
      }),
      createSlotDefinition('troops', 2),
      createSlotDefinition('support', 1),
      createSlotDefinition('fast-attack', 1),
    ],
    notes: 'Command slot may only be used for Optae unit.',
  },
  {
    id: 'la-immolation-covenant',
    name: 'Immolation Covenant',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'salamanders',
    slots: [
      createSlotDefinition('support', 2, 1),
      createSlotDefinition('armour', 2, 0, {
        only: ['Predator', 'Vindicator'],
      }),
    ],
    notes: 'Armour slots for Predator or Vindicator only.',
  },
  {
    id: 'la-decapitation-cadre',
    name: 'Decapitation Cadre',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'raven-guard',
    slots: [
      createSlotDefinition('recon', 2, 0, {
        only: ['Reconnaissance Squad'],
      }),
      createSlotDefinition('elites', 2, 0, {
        only: ['Veteran Assault Squad', 'Dark Fury Squad'],
      }),
    ],
    notes:
      'Recon slots for Reconnaissance Squad only. Elites slots for Veteran Assault Squad or Dark Fury Squad only.',
  },
  {
    id: 'la-primacy-wing',
    name: 'Primacy Wing',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'emperors-children',
    slots: [
      createSlotDefinition('retinue', 1),
      createSlotDefinition('elites', 1),
      createSlotDefinition('fast-attack', 2),
    ],
  },
  {
    id: 'la-ironfire-cohort',
    name: 'The Ironfire Cohort',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'iron-warriors',
    slots: [
      createSlotDefinition('armour', 2, 1, {
        only: ['Arquitor Bombard'],
      }),
      createSlotDefinition('support', 2),
    ],
    notes: 'Armour slots must be filled with Arquitor Bombard units.',
  },
  {
    id: 'la-terror-assault',
    name: 'Terror Assault',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'night-lords',
    slots: [
      createSlotDefinition('troops', 2, 1, {
        only: ['Terror Squad'],
      }),
      createSlotDefinition('fast-attack', 2),
    ],
    notes: 'Troops slots must be filled with Terror Squad units.',
  },
  {
    id: 'la-berserker-cadre',
    name: 'Berserker Cadre',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'world-eaters',
    slots: [
      createSlotDefinition('troops', 1, 1),
      createSlotDefinition('heavy-assault', 2, 0, {
        only: ['Rampager Squad'],
      }),
      createSlotDefinition('elites', 1),
    ],
    notes: 'Heavy Assault slots may only be used for Rampager Squad units.',
  },
  {
    id: 'la-sons-of-bodt',
    name: 'Sons of Bodt',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'world-eaters',
    unlockRequirement: { allegiance: 'traitor' },
    slots: [
      createSlotDefinition('support', 2, 2, {
        only: ['Apothecary'],
      }),
      createSlotDefinition('troops', 3),
    ],
    notes: 'Support slots may only be used for Apothecary units.',
  },
  {
    id: 'la-reaping-host',
    name: 'Reaping Host',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'death-guard',
    slots: [
      createSlotDefinition('troops', 2, 1, {
        exclude: ['Assault Squad'],
      }),
      createSlotDefinition('support', 1),
      createSlotDefinition('heavy-assault', 1),
    ],
    notes: 'Troops slots may not be used for Assault Squad units.',
  },
  {
    id: 'la-prosperine-convocation',
    name: 'Prosperine Convocation',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'thousand-sons',
    slots: [
      createSlotDefinition('troops', 1, 1),
      createSlotDefinition('fast-attack', 1),
      createSlotDefinition('elites', 1),
      createSlotDefinition('heavy-transport', 1),
    ],
  },
  {
    id: 'la-supremacy-cadre',
    name: 'Supremacy Cadre',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'sons-of-horus',
    slots: [
      createSlotDefinition('troops', 2, 2),
      createSlotDefinition('heavy-assault', 1),
      createSlotDefinition('elites', 1),
    ],
  },
  {
    id: 'la-headhunter-leviathal',
    name: 'Headhunter Leviathal',
    category: 'auxiliary',
    faction: 'legiones-astartes',
    subFaction: 'alpha-legion',
    slots: [
      createSlotDefinition('recon', 2, 2),
      createSlotDefinition('elites', 2, 0, {
        only: ['Seeker Squad', 'Headhunter Kill Team'],
      }),
    ],
    notes: 'Elites slots may only be used for Seeker Squad or Headhunter Kill Team units.',
  },
];

export const LEGIONES_ASTARTES_APEX_DETACHMENTS: DetachmentDefinition[] = [
  {
    id: 'la-medusan-vanguard',
    name: 'Medusan Vanguard',
    category: 'apex',
    faction: 'legiones-astartes',
    subFaction: 'iron-hands',
    unlockRequirement: { unitNames: ['Iron Father', 'Ferrus Manus'] },
    slots: [
      createSlotDefinition('command', 1, 1, {
        only: ['Praevian'],
      }),
      createSlotDefinition('heavy-assault', 2),
      createSlotDefinition('support', 1),
      createSlotDefinition('war-engine', 1),
    ],
    notes: 'Command slot may only be used for Praevian unit.',
  },
  {
    id: 'la-hammer-of-olympia',
    name: 'The Hammer of Olympia',
    category: 'apex',
    faction: 'legiones-astartes',
    subFaction: 'iron-warriors',
    unlockRequirement: { unitNames: ['Warsmith', 'Perturabo'] },
    slots: [
      createSlotDefinition('heavy-assault', 2, 1),
      createSlotDefinition('heavy-transport', 1),
      createSlotDefinition('troops', 2, 1),
    ],
  },
  {
    id: 'la-atramentar-hunt',
    name: 'Atramentar Hunt',
    category: 'apex',
    faction: 'legiones-astartes',
    subFaction: 'night-lords',
    allowedPrimeRules: ['atramentar'],
    slots: [
      createSlotDefinition('retinue', 1, 1, {
        only: ['Cataphractii Command Squad', 'Tartaros Command Squad'],
      }),
      createSlotDefinition('heavy-assault', 2, 2, {
        only: ['Cataphractii Terminator Squad', 'Tartaros Terminator Squad'],
      }),
    ],
    notes:
      'Retinue for Cataphractii/Tartaros Command Squad only. Heavy Assault for Cataphractii/Tartaros Terminator Squad only.',
  },
  {
    id: 'la-exalted-conclave',
    name: 'Exalted Conclave',
    category: 'apex',
    faction: 'legiones-astartes',
    subFaction: 'word-bearers',
    unlockRequirement: { allegiance: 'traitor' },
    allowedPrimeRules: ['true-believers'],
    slots: [createSlotDefinition('troops', 2, 2), createSlotDefinition('elites', 2)],
  },
];

export const LEGIONES_ASTARTES_SPECIAL_DETACHMENTS: DetachmentDefinition[] = [
  {
    id: 'la-brotherhood-of-phoenix',
    name: 'Brotherhood of the Phoenix',
    category: 'warlord',
    faction: 'legiones-astartes',
    subFaction: 'emperors-children',
    unlockRequirement: {
      allegiance: 'traitor',
      primarySubFaction: 'emperors-children',
    },
    unitsDoNotUnlockDetachments: true,
    notes:
      "A Warlord detachment may not be taken if this is taken. Must include Fulgrim Transfigured. High Command and Command units don't unlock detachments.",
    slots: [
      createSlotDefinition('warlord', 1),
      createSlotDefinition('high-command', 3, 1),
      createSlotDefinition('command', 1),
    ],
  },
];

export function getAllLegionesAstartesDetachments(): DetachmentDefinition[] {
  return [
    ...LEGIONES_ASTARTES_AUXILIARY_DETACHMENTS,
    ...LEGIONES_ASTARTES_APEX_DETACHMENTS,
    ...LEGIONES_ASTARTES_SPECIAL_DETACHMENTS,
  ];
}
