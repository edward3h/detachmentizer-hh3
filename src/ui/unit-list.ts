import type { ArmyState, Unit } from '../types';
import {
  getBattlefieldRoleSortOrder,
  getBattlefieldRoleName,
  getFaction,
  getSubFaction,
} from '../types';
import { appState } from '../state';

function sortUnits(units: Unit[]): Unit[] {
  return [...units].sort((a, b) => {
    // Primary sort by faction
    if (a.faction !== b.faction) {
      return a.faction.localeCompare(b.faction);
    }
    // Secondary sort by role
    const roleOrderA = getBattlefieldRoleSortOrder(a.role);
    const roleOrderB = getBattlefieldRoleSortOrder(b.role);
    if (roleOrderA !== roleOrderB) {
      return roleOrderA - roleOrderB;
    }
    // Tertiary sort by name
    return a.name.localeCompare(b.name);
  });
}

export function renderUnitList(army: ArmyState): string {
  if (army.units.length === 0) {
    return `
      <div class="card">
        <h2>Units</h2>
        <p class="text-muted">No units added yet. Add some units above.</p>
      </div>
    `;
  }

  const sortedUnits = sortUnits(army.units);
  const unitItems = sortedUnits
    .map((unit) => {
      const faction = getFaction(unit.faction);
      const subFaction = unit.subFaction ? getSubFaction(unit.subFaction) : null;
      const factionDisplay =
        unit.faction !== army.primaryFaction
          ? `<span class="unit-faction">${faction?.name ?? unit.faction}${subFaction ? ` - ${subFaction.name}` : ''}</span>`
          : '';

      return `
        <li class="unit-item" data-unit-id="${unit.id}">
          <div>
            <span class="unit-role">${getBattlefieldRoleName(unit.role)}</span>
            <span class="unit-name">${unit.name}</span>
            ${factionDisplay}
          </div>
          <button class="btn-danger btn-small remove-unit" data-unit-id="${unit.id}">Remove</button>
        </li>
      `;
    })
    .join('');

  return `
    <div class="card">
      <h2>Units (${army.units.length})</h2>
      <ul class="unit-list">
        ${unitItems}
      </ul>
    </div>
  `;
}

export function setupUnitListHandlers(): void {
  document.querySelectorAll('.remove-unit').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const unitId = (e.target as HTMLElement).dataset.unitId;
      if (unitId) {
        appState.removeUnit(unitId);
      }
    });
  });
}
