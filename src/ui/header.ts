import type { ArmyState } from '../types';
import { getAllegianceLabel, getFaction, getSubFaction } from '../types';

export function renderHeader(army: ArmyState | null): string {
  if (!army) {
    return `
      <header class="app-header">
        <h1>Detachmentizer HH3</h1>
        <p class="text-muted">Army detachment allocation for Warhammer: The Horus Heresy 3rd Edition</p>
      </header>
    `;
  }

  const faction = getFaction(army.primaryFaction);
  const subFaction = army.primarySubFaction ? getSubFaction(army.primarySubFaction) : null;

  const factionDisplay = subFaction
    ? `${faction?.name ?? army.primaryFaction} - ${subFaction.name}`
    : (faction?.name ?? army.primaryFaction);

  return `
    <header class="app-header">
      <div class="card-header">
        <h1>Detachmentizer HH3</h1>
        <button class="btn-danger btn-small" id="reset-army">Reset Army</button>
      </div>
      <div>
        <span class="allegiance-badge ${army.allegiance}">${getAllegianceLabel(army.allegiance)}</span>
        <span style="margin-left: var(--space-sm);">${factionDisplay}</span>
      </div>
    </header>
  `;
}
