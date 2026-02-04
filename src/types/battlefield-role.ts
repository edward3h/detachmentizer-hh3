export type BattlefieldRole =
  | 'warlord'
  | 'lord-of-war'
  | 'high-command'
  | 'command'
  | 'retinue'
  | 'elites'
  | 'war-engine'
  | 'troops'
  | 'support'
  | 'transport'
  | 'heavy-transport'
  | 'heavy-assault'
  | 'armour'
  | 'recon'
  | 'fast-attack';

export interface BattlefieldRoleDefinition {
  id: BattlefieldRole;
  name: string;
  sortOrder: number;
}

export const BATTLEFIELD_ROLES: readonly BattlefieldRoleDefinition[] = [
  { id: 'warlord', name: 'Warlord', sortOrder: 1 },
  { id: 'lord-of-war', name: 'Lord of War', sortOrder: 2 },
  { id: 'high-command', name: 'High Command', sortOrder: 3 },
  { id: 'command', name: 'Command', sortOrder: 4 },
  { id: 'retinue', name: 'Retinue', sortOrder: 5 },
  { id: 'elites', name: 'Elites', sortOrder: 6 },
  { id: 'war-engine', name: 'War-Engine', sortOrder: 7 },
  { id: 'troops', name: 'Troops', sortOrder: 8 },
  { id: 'support', name: 'Support', sortOrder: 9 },
  { id: 'transport', name: 'Transport', sortOrder: 10 },
  { id: 'heavy-transport', name: 'Heavy Transport', sortOrder: 11 },
  { id: 'heavy-assault', name: 'Heavy Assault', sortOrder: 12 },
  { id: 'armour', name: 'Armour', sortOrder: 13 },
  { id: 'recon', name: 'Recon', sortOrder: 14 },
  { id: 'fast-attack', name: 'Fast Attack', sortOrder: 15 },
] as const;

export function getBattlefieldRole(id: BattlefieldRole): BattlefieldRoleDefinition | undefined {
  return BATTLEFIELD_ROLES.find((r) => r.id === id);
}

export function getBattlefieldRoleSortOrder(id: BattlefieldRole): number {
  return getBattlefieldRole(id)?.sortOrder ?? 99;
}

export function getBattlefieldRoleName(id: BattlefieldRole): string {
  return getBattlefieldRole(id)?.name ?? id;
}
