export type Allegiance = 'loyalist' | 'traitor';

export const ALLEGIANCES: readonly Allegiance[] = ['loyalist', 'traitor'] as const;

export function getAllegianceLabel(allegiance: Allegiance): string {
  return allegiance === 'loyalist' ? 'Loyalist' : 'Traitor';
}
