import type { ArmyState, BattlefieldRole, FactionId, SubFactionId } from '../types';
import { BATTLEFIELD_ROLES, FACTIONS, SUB_FACTIONS } from '../types';
import { appState } from '../state';
import { KNOWN_UNITS } from '../data';
import { Typeahead, TypeaheadOption } from './typeahead';

let typeahead: Typeahead | null = null;
let focusFactionSelectOnSetup = false;

export function renderAddUnit(army: ArmyState): string {
  const roleOptions = BATTLEFIELD_ROLES.map(
    (r) => `<option value="${r.id}">${r.name}</option>`
  ).join('');

  const factionOptions = FACTIONS.filter((f) => f.canBeDetachmentFaction)
    .map((f) => {
      const selected = f.id === army.primaryFaction ? 'selected' : '';
      return `<option value="${f.id}" ${selected}>${f.name}</option>`;
    })
    .join('');

  return `
    <div class="card">
      <h2>Add Unit</h2>
      <form id="add-unit-form">
        <div class="form-group">
          <label for="unit-faction">Faction (defaults to Primary)</label>
          <select id="unit-faction" name="faction">
            ${factionOptions}
          </select>
        </div>
        <div class="form-group" id="unit-sub-faction-group" style="display: none;">
          <label for="unit-sub-faction">Legion (optional)</label>
          <select id="unit-sub-faction" name="sub-faction">
            <option value="">-- No specific legion --</option>
          </select>
        </div>
        <div class="form-group">
          <label for="unit-role">Battlefield Role</label>
          <select id="unit-role" name="role" required>
            <option value="">-- Select Role --</option>
            ${roleOptions}
          </select>
        </div>
        <div class="form-group">
          <label for="unit-name">Unit Name</label>
          <div class="typeahead-container">
            <input type="text" id="unit-name" name="name" class="typeahead-input" required autocomplete="off" />
          </div>
        </div>
        <button type="submit" class="btn-primary">Add Unit</button>
      </form>
    </div>
  `;
}

export function setupAddUnitHandlers(army: ArmyState): void {
  const form = document.getElementById('add-unit-form') as HTMLFormElement;
  const roleSelect = document.getElementById('unit-role') as HTMLSelectElement;
  const nameInput = document.getElementById('unit-name') as HTMLInputElement;
  const factionSelect = document.getElementById('unit-faction') as HTMLSelectElement;
  const subFactionGroup = document.getElementById('unit-sub-faction-group') as HTMLDivElement;
  const subFactionSelect = document.getElementById('unit-sub-faction') as HTMLSelectElement;

  // Focus faction select if flag was set (after adding a unit)
  if (focusFactionSelectOnSetup) {
    focusFactionSelectOnSetup = false;
    factionSelect.focus();
  }

  function updateSubFactionOptions(): void {
    const factionId = factionSelect.value as FactionId;
    const faction = FACTIONS.find((f) => f.id === factionId);

    if (faction?.subFactions && faction.subFactions.length > 0) {
      subFactionGroup.style.display = 'block';
      const options = faction.subFactions
        .map((sfId) => {
          const sf = SUB_FACTIONS.find((s) => s.id === sfId);
          return `<option value="${sfId}">${sf?.name ?? sfId}</option>`;
        })
        .join('');
      subFactionSelect.innerHTML = `<option value="">-- No specific legion --</option>${options}`;

      // Default to primary sub-faction if faction matches primary faction
      if (factionId === army.primaryFaction && army.primarySubFaction) {
        subFactionSelect.value = army.primarySubFaction;
      } else {
        subFactionSelect.value = '';
      }
    } else {
      subFactionGroup.style.display = 'none';
      subFactionSelect.innerHTML = '<option value="">-- None --</option>';
      subFactionSelect.value = '';
    }
  }

  // Initialise sub-faction dropdown based on current faction
  updateSubFactionOptions();

  function getTypeaheadOptions(): TypeaheadOption[] {
    const role = roleSelect.value as BattlefieldRole;
    const faction = factionSelect.value as FactionId;
    const customNames = appState.getCustomUnitNames();

    // Get known units matching the role and faction
    const units = KNOWN_UNITS.filter((u) => {
      if (role && u.role !== role) return false;
      if (faction && u.faction !== faction) return false;
      return true;
    });

    // Add custom unit names
    const customOptions = customNames.map((name) => ({
      value: name,
      label: name,
    }));

    const knownOptions = units.map((u) => ({
      value: u.name,
      label: u.name,
      data: u,
    }));

    return [...knownOptions, ...customOptions];
  }

  // Setup typeahead
  typeahead = new Typeahead({
    inputId: 'unit-name',
    options: getTypeaheadOptions(),
    allowCustom: true,
    placeholder: 'Type unit name...',
    onSelect: (option) => {
      if (option.data) {
        const unit = option.data as (typeof KNOWN_UNITS)[0];
        if (!roleSelect.value && unit.role) {
          roleSelect.value = unit.role;
        }
        if (unit.faction && unit.faction !== army.primaryFaction) {
          factionSelect.value = unit.faction;
          updateSubFactionOptions();
        }
        // Auto-fill sub-faction if the known unit has one
        if (unit.subFaction) {
          subFactionSelect.value = unit.subFaction;
        }
      }
    },
  });

  roleSelect.addEventListener('change', () => {
    typeahead?.setOptions(getTypeaheadOptions());
  });

  factionSelect.addEventListener('change', () => {
    updateSubFactionOptions();
    typeahead?.setOptions(getTypeaheadOptions());
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const role = roleSelect.value as BattlefieldRole;
    const name = nameInput.value.trim();
    const faction = factionSelect.value as FactionId;
    const subFaction = subFactionSelect.value as SubFactionId | undefined;

    if (!role || !name) return;

    // Set flag to focus faction select after re-render
    focusFactionSelectOnSetup = true;

    appState.addUnit(name, role, faction, subFaction || undefined);
  });
}

export function destroyAddUnitHandlers(): void {
  typeahead?.destroy();
  typeahead = null;
}
