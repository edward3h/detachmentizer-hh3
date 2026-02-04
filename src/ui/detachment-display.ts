import type { AllocatedDetachment, AllocationResult, ArmyState, Unit } from '../types';
import { getBattlefieldRoleName, getFaction, getSubFaction } from '../types';

function renderSlots(detachment: AllocatedDetachment, units: Unit[]): string {
  const slotItems = detachment.slots
    .map((slot) => {
      const unit = slot.unitId ? units.find((u) => u.id === slot.unitId) : null;
      const primeIndicator = slot.isPrime ? '<span class="slot-prime">★</span>' : '';
      const unitDisplay = unit
        ? `<span class="slot-unit">${unit.name}</span>`
        : '<span class="slot-empty">Empty</span>';

      return `
        <li class="slot-item">
          <span class="slot-role">${getBattlefieldRoleName(slot.definition.role)}${primeIndicator}</span>
          ${unitDisplay}
        </li>
      `;
    })
    .join('');

  return `<ul class="slot-list">${slotItems}</ul>`;
}

function renderDetachment(detachment: AllocatedDetachment, units: Unit[]): string {
  const faction = getFaction(detachment.faction);
  const subFaction = detachment.subFaction ? getSubFaction(detachment.subFaction) : null;
  const factionDisplay = subFaction
    ? `${faction?.name ?? detachment.faction} - ${subFaction.name}`
    : (faction?.name ?? detachment.faction);

  const filledSlots = detachment.slots.filter((s) => s.unitId).length;
  const totalSlots = detachment.slots.length;

  return `
    <div class="detachment-card">
      <div class="detachment-header">
        <span class="detachment-name">${detachment.definition.name}</span>
        <span class="detachment-faction">${factionDisplay}</span>
        <span class="text-muted" style="margin-left: auto;">${filledSlots}/${totalSlots} slots filled</span>
      </div>
      ${renderSlots(detachment, units)}
    </div>
  `;
}

function renderUnallocatedUnits(units: Unit[]): string {
  if (units.length === 0) return '';

  const unitItems = units
    .map(
      (unit) => `
        <li class="unit-item">
          <span class="unit-role">${getBattlefieldRoleName(unit.role)}</span>
          <span class="unit-name">${unit.name}</span>
        </li>
      `
    )
    .join('');

  return `
    <div class="unallocated-section">
      <h3 class="unallocated-title">Unallocated Units (${units.length})</h3>
      <ul class="unit-list">${unitItems}</ul>
    </div>
  `;
}

function renderSuggestions(suggestions: AllocationResult['suggestions']): string {
  if (suggestions.length === 0) return '';

  const suggestionItems = suggestions
    .map(
      (s) => `
        <li>
          <strong>${s.message}</strong>
          ${s.details ? `<p class="text-muted">${s.details}</p>` : ''}
        </li>
      `
    )
    .join('');

  return `
    <div class="suggestions-panel">
      <h3 class="suggestions-title">Suggestions</h3>
      <ul>${suggestionItems}</ul>
    </div>
  `;
}

export function renderDetachmentDisplay(allocation: AllocationResult, army: ArmyState): string {
  const detachments = allocation.detachments.map((d) => renderDetachment(d, army.units)).join('');

  return `
    <div>
      <h2>Detachment Allocation</h2>
      ${detachments}
      ${renderUnallocatedUnits(allocation.unallocatedUnits)}
      ${renderSuggestions(allocation.suggestions)}
    </div>
  `;
}
