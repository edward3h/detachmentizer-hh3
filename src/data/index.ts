export * from './battlefield-roles';
export * from './factions';
export * from './core-detachments';
export * from './legiones-astartes';
export * from './imperialis-militia';
export * from './known-units';

import type { DetachmentDefinition, FactionId } from '../types';
import {
  getAllCoreDetachments,
  GENERIC_APEX_DETACHMENTS,
  GENERIC_AUXILIARY_DETACHMENTS,
} from './core-detachments';
import { getAllLegionesAstartesDetachments } from './legiones-astartes';
import { getAllImperialisMilitiaDetachments } from './imperialis-militia';

export function getAllDetachments(): DetachmentDefinition[] {
  return [
    ...getAllCoreDetachments(),
    ...getAllLegionesAstartesDetachments(),
    ...getAllImperialisMilitiaDetachments(),
  ];
}

export function getDetachmentById(id: string): DetachmentDefinition | undefined {
  return getAllDetachments().find((d) => d.id === id);
}

export function getDetachmentsForFaction(
  faction: FactionId,
  category?: DetachmentDefinition['category']
): DetachmentDefinition[] {
  const all = getAllDetachments();
  return all.filter((d) => {
    if (d.faction && d.faction !== faction) return false;
    if (category && d.category !== category) return false;
    return true;
  });
}

export function getApexDetachmentsForFaction(faction: FactionId): DetachmentDefinition[] {
  const factionSpecific = getAllDetachments().filter(
    (d) => d.category === 'apex' && d.faction === faction
  );
  return [...GENERIC_APEX_DETACHMENTS, ...factionSpecific];
}

export function getAuxiliaryDetachmentsForFaction(faction: FactionId): DetachmentDefinition[] {
  const factionSpecific = getAllDetachments().filter(
    (d) => d.category === 'auxiliary' && d.faction === faction
  );
  return [...GENERIC_AUXILIARY_DETACHMENTS, ...factionSpecific];
}
