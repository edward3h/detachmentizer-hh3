import type { KnownUnit } from '../types';

export const KNOWN_UNITS: KnownUnit[] = [
  // Legiones Astartes - Command units that unlock detachments
  {
    name: 'Centurion',
    role: 'command',
    faction: 'legiones-astartes',
    officerOfTheLine: 2,
  },
  {
    name: 'Esoterist',
    role: 'command',
    faction: 'legiones-astartes',
    unlocksDetachment: 'la-daemonic-manifestation',
  },
  {
    name: 'Legion Champion',
    role: 'command',
    faction: 'legiones-astartes',
    unlocksDetachment: 'la-veteran-cadre',
  },
  {
    name: 'Vigilator',
    role: 'command',
    faction: 'legiones-astartes',
    unlocksDetachment: 'la-recon-demi-company',
  },
  {
    name: 'Siege Breaker',
    role: 'command',
    faction: 'legiones-astartes',
    unlocksDetachment: 'la-storm-battery',
  },

  // Legiones Astartes - High Command units that unlock apex detachments
  {
    name: 'Iron Father',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'iron-hands',
    unlocksDetachment: 'la-medusan-vanguard',
  },
  {
    name: 'Ferrus Manus',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'iron-hands',
    unlocksDetachment: 'la-medusan-vanguard',
  },
  {
    name: 'Warsmith',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'iron-warriors',
    unlocksDetachment: 'la-hammer-of-olympia',
  },
  {
    name: 'Perturabo',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'iron-warriors',
    unlocksDetachment: 'la-hammer-of-olympia',
  },

  // Legiones Astartes - Other common High Command
  {
    name: 'Praetor',
    role: 'high-command',
    faction: 'legiones-astartes',
  },
  {
    name: 'Consul',
    role: 'high-command',
    faction: 'legiones-astartes',
  },
  {
    name: 'Legion Herald',
    role: 'high-command',
    faction: 'legiones-astartes',
  },

  // Legiones Astartes - Primarchs (selected examples)
  {
    name: "Lion El'Jonson",
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'dark-angels',
  },
  {
    name: 'Fulgrim',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'emperors-children',
  },
  {
    name: 'Rogal Dorn',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'imperial-fists',
  },
  {
    name: 'Roboute Guilliman',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'ultramarines',
  },
  {
    name: 'Horus Lupercal',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'sons-of-horus',
    fixedAllegiance: 'traitor',
  },
  {
    name: 'Angron',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'world-eaters',
    fixedAllegiance: 'traitor',
  },
  {
    name: 'Mortarion',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'death-guard',
    fixedAllegiance: 'traitor',
  },
  {
    name: 'Magnus the Red',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'thousand-sons',
  },
  {
    name: 'Vulkan',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'salamanders',
  },
  {
    name: 'Corvus Corax',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'raven-guard',
  },
  {
    name: 'Alpharius',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'alpha-legion',
  },
  {
    name: 'Konrad Curze',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'night-lords',
    fixedAllegiance: 'traitor',
  },
  {
    name: 'Lorgar',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'word-bearers',
    fixedAllegiance: 'traitor',
  },
  {
    name: 'Sanguinius',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'blood-angels',
    fixedAllegiance: 'loyalist',
  },
  {
    name: 'Jaghatai Khan',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'white-scars',
  },
  {
    name: 'Leman Russ',
    role: 'high-command',
    faction: 'legiones-astartes',
    subFaction: 'space-wolves',
    fixedAllegiance: 'loyalist',
  },

  // Legiones Astartes - Warlord role
  {
    name: 'Fulgrim Transfigured',
    role: 'warlord',
    faction: 'legiones-astartes',
    subFaction: 'emperors-children',
    fixedAllegiance: 'traitor',
  },

  // Legiones Astartes - Special Command units
  {
    name: 'Optae',
    role: 'command',
    faction: 'legiones-astartes',
    subFaction: 'ultramarines',
  },
  {
    name: 'Praevian',
    role: 'command',
    faction: 'legiones-astartes',
  },

  // Imperialis Militia - Command units
  {
    name: 'Command Troop',
    role: 'command',
    faction: 'imperialis-militia',
    officerOfTheLine: 3,
  },
  {
    name: 'Mounted Command Troop',
    role: 'command',
    faction: 'imperialis-militia',
    officerOfTheLine: 3,
  },
  {
    name: 'Discipline Master Cadre',
    role: 'command',
    faction: 'imperialis-militia',
    officerOfTheLine: 3, // Optional upgrade, defaulting to having it
  },
  {
    name: 'Rogue Psyker',
    role: 'command',
    faction: 'imperialis-militia',
    unlocksDetachment: 'im-daemonic-manifestation',
  },

  // Imperialis Militia - High Command
  {
    name: 'Force Commander',
    role: 'high-command',
    faction: 'imperialis-militia',
  },

  // Slot-restricted unit types (for validation)
  {
    name: 'Apothecary',
    role: 'support',
    faction: 'legiones-astartes',
  },
  {
    name: 'Techmarine',
    role: 'support',
    faction: 'legiones-astartes',
  },
  {
    name: 'Reconnaissance Squad',
    role: 'recon',
    faction: 'legiones-astartes',
  },
  {
    name: 'Rapier Battery',
    role: 'support',
    faction: 'legiones-astartes',
  },
  {
    name: 'Arquitor Bombard',
    role: 'armour',
    faction: 'legiones-astartes',
  },
  {
    name: 'Vindicator Siege Tank',
    role: 'armour',
    faction: 'legiones-astartes',
  },
  {
    name: 'Dreadwing Interemptor',
    role: 'support',
    faction: 'legiones-astartes',
    subFaction: 'dark-angels',
  },
  {
    name: 'Outrider Squadron',
    role: 'recon',
    faction: 'legiones-astartes',
  },
  {
    name: 'Seeker Squad',
    role: 'elites',
    faction: 'legiones-astartes',
  },
  {
    name: 'Scimitar Jetbike Squadron',
    role: 'fast-attack',
    faction: 'legiones-astartes',
    subFaction: 'white-scars',
  },
  {
    name: 'Grey Slayer Pack',
    role: 'troops',
    faction: 'legiones-astartes',
    subFaction: 'space-wolves',
  },
  {
    name: 'Breacher Squad',
    role: 'troops',
    faction: 'legiones-astartes',
  },
  {
    name: 'Assault Squad',
    role: 'troops',
    faction: 'legiones-astartes',
  },
  {
    name: 'Dawnbreaker Cohort',
    role: 'elites',
    faction: 'legiones-astartes',
    subFaction: 'blood-angels',
  },
  {
    name: 'Veteran Assault Squad',
    role: 'elites',
    faction: 'legiones-astartes',
  },
  {
    name: 'Land Raider Carrier',
    role: 'heavy-transport',
    faction: 'legiones-astartes',
  },
  {
    name: 'Spartan',
    role: 'heavy-transport',
    faction: 'legiones-astartes',
  },
  {
    name: 'Predator',
    role: 'armour',
    faction: 'legiones-astartes',
  },
  {
    name: 'Vindicator',
    role: 'armour',
    faction: 'legiones-astartes',
  },
  {
    name: 'Dark Fury Squad',
    role: 'elites',
    faction: 'legiones-astartes',
    subFaction: 'raven-guard',
  },
  {
    name: 'Terror Squad',
    role: 'troops',
    faction: 'legiones-astartes',
    subFaction: 'night-lords',
  },
  {
    name: 'Rampager Squad',
    role: 'heavy-assault',
    faction: 'legiones-astartes',
    subFaction: 'world-eaters',
  },
  {
    name: 'Headhunter Kill Team',
    role: 'elites',
    faction: 'legiones-astartes',
    subFaction: 'alpha-legion',
  },
  {
    name: 'Cataphractii Command Squad',
    role: 'retinue',
    faction: 'legiones-astartes',
  },
  {
    name: 'Tartaros Command Squad',
    role: 'retinue',
    faction: 'legiones-astartes',
  },
  {
    name: 'Cataphractii Terminator Squad',
    role: 'heavy-assault',
    faction: 'legiones-astartes',
  },
  {
    name: 'Tartaros Terminator Squad',
    role: 'heavy-assault',
    faction: 'legiones-astartes',
  },

  // Imperialis Militia - Restricted units
  {
    name: 'Ogryn',
    role: 'heavy-assault',
    faction: 'imperialis-militia',
  },
  {
    name: 'Militia Medicae',
    role: 'support',
    faction: 'imperialis-militia',
  },
  {
    name: 'Cavalry Troop',
    role: 'recon',
    faction: 'imperialis-militia',
  },

  // Daemons of the Ruinstorm
  {
    name: 'Ruinstorm Daemon Brute',
    role: 'heavy-assault',
    faction: 'daemons-of-the-ruinstorm',
    fixedAllegiance: 'traitor',
  },
];

export function findKnownUnit(name: string, faction?: string): KnownUnit | undefined {
  const lowerName = name.toLowerCase();
  return KNOWN_UNITS.find((u) => {
    const matches = u.name.toLowerCase() === lowerName;
    if (faction) {
      return matches && u.faction === faction;
    }
    return matches;
  });
}

export function searchKnownUnits(query: string, faction?: string): KnownUnit[] {
  const lowerQuery = query.toLowerCase();
  return KNOWN_UNITS.filter((u) => {
    const matches = u.name.toLowerCase().includes(lowerQuery);
    if (faction) {
      return matches && u.faction === faction;
    }
    return matches;
  });
}
