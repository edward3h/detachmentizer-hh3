import type { Allegiance, FactionId, SubFactionId } from '../types';
import {
  ALLEGIANCES,
  getAllegianceLabel,
  FACTIONS,
  SUB_FACTIONS,
  canFactionHaveAllegiance,
} from '../types';
import { appState } from '../state';

export function renderCreateArmy(): string {
  const factionOptions = FACTIONS.filter((f) => f.canBePrimaryFaction)
    .map((f) => `<option value="${f.id}">${f.name}</option>`)
    .join('');

  const allegianceOptions = ALLEGIANCES.map(
    (a) => `<option value="${a}">${getAllegianceLabel(a)}</option>`
  ).join('');

  return `
    <div class="card">
      <h2>Create New Army</h2>
      <form id="create-army-form">
        <div class="form-group">
          <label for="allegiance">Allegiance</label>
          <select id="allegiance" name="allegiance" required>
            ${allegianceOptions}
          </select>
        </div>
        <div class="form-group">
          <label for="faction">Primary Faction</label>
          <select id="faction" name="faction" required>
            ${factionOptions}
          </select>
        </div>
        <div class="form-group" id="sub-faction-group" style="display: none;">
          <label for="sub-faction" id="sub-faction-label">Sub-faction</label>
          <select id="sub-faction" name="sub-faction">
            <option value="">-- Select --</option>
          </select>
        </div>
        <button type="submit" class="btn-primary">Create Army</button>
      </form>
    </div>
  `;
}

export function setupCreateArmyHandlers(): void {
  const form = document.getElementById('create-army-form') as HTMLFormElement;
  const allegianceSelect = document.getElementById('allegiance') as HTMLSelectElement;
  const factionSelect = document.getElementById('faction') as HTMLSelectElement;
  const subFactionGroup = document.getElementById('sub-faction-group') as HTMLDivElement;
  const subFactionSelect = document.getElementById('sub-faction') as HTMLSelectElement;
  const subFactionLabel = document.getElementById('sub-faction-label') as HTMLLabelElement;

  function updateFactionOptions(): void {
    const allegiance = allegianceSelect.value as Allegiance;

    Array.from(factionSelect.options).forEach((option) => {
      const faction = FACTIONS.find((f) => f.id === option.value);
      if (faction) {
        option.disabled = !canFactionHaveAllegiance(faction, allegiance);
      }
    });

    // Reset to first valid option if current is disabled
    if (factionSelect.selectedOptions[0]?.disabled) {
      const firstValid = Array.from(factionSelect.options).find((o) => !o.disabled);
      if (firstValid) {
        factionSelect.value = firstValid.value;
      }
    }

    updateSubFactionOptions();
  }

  function updateSubFactionOptions(): void {
    const factionId = factionSelect.value as FactionId;
    const faction = FACTIONS.find((f) => f.id === factionId);

    if (faction?.subFactions && faction.subFactions.length > 0) {
      subFactionGroup.style.display = 'block';
      const label = faction.subFactionLabel ?? 'Sub-faction';
      subFactionLabel.textContent = label;
      const options = faction.subFactions
        .map((sfId) => {
          const sf = SUB_FACTIONS.find((s) => s.id === sfId);
          return `<option value="${sfId}">${sf?.name ?? sfId}</option>`;
        })
        .join('');
      subFactionSelect.innerHTML = `<option value="">-- Select ${label} --</option>${options}`;
    } else {
      subFactionGroup.style.display = 'none';
      subFactionSelect.innerHTML = '<option value="">-- None --</option>';
    }
  }

  allegianceSelect.addEventListener('change', updateFactionOptions);
  factionSelect.addEventListener('change', updateSubFactionOptions);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allegiance = allegianceSelect.value as Allegiance;
    const faction = factionSelect.value as FactionId;
    const subFaction = subFactionSelect.value as SubFactionId | undefined;

    appState.createArmy(allegiance, faction, subFaction || undefined);
  });

  // Initial setup
  updateFactionOptions();
}
