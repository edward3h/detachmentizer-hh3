import type {
  Allegiance,
  ArmyState,
  BattlefieldRole,
  FactionId,
  SubFactionId,
  Unit,
} from '../types';
import { createArmy, createUnit } from '../types';
import { loadState, saveState, clearState } from './storage';
import { findKnownUnit } from '../data';

type StateChangeListener = () => void;

interface AppStateData {
  army: ArmyState | null;
  customUnitNames: string[];
}

class AppStateManager {
  private state: AppStateData;
  private listeners: Set<StateChangeListener> = new Set();

  constructor() {
    const stored = loadState();
    this.state = {
      army: stored.army,
      customUnitNames: stored.customUnitNames,
    };
  }

  subscribe(listener: StateChangeListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    saveState({
      version: 1,
      army: this.state.army,
      customUnitNames: this.state.customUnitNames,
    });
    this.listeners.forEach((listener) => listener());
  }

  getArmy(): ArmyState | null {
    return this.state.army;
  }

  getCustomUnitNames(): string[] {
    return this.state.customUnitNames;
  }

  createArmy(
    allegiance: Allegiance,
    primaryFaction: FactionId,
    primarySubFaction?: SubFactionId
  ): void {
    this.state.army = createArmy(allegiance, primaryFaction, primarySubFaction);
    this.notify();
  }

  addUnit(
    name: string,
    role: BattlefieldRole,
    faction?: FactionId,
    subFaction?: SubFactionId
  ): Unit | null {
    if (!this.state.army) return null;

    const knownUnit = findKnownUnit(name, faction);
    const unitFaction = faction ?? this.state.army.primaryFaction;
    const unitSubFaction =
      subFaction ??
      (unitFaction === this.state.army.primaryFaction
        ? this.state.army.primarySubFaction
        : undefined);

    const unit = createUnit(name, role, unitFaction, unitSubFaction, knownUnit?.officerOfTheLine);

    this.state.army.units.push(unit);

    if (!this.state.customUnitNames.includes(name) && !knownUnit) {
      this.state.customUnitNames.push(name);
    }

    this.notify();
    return unit;
  }

  removeUnit(unitId: string): void {
    if (!this.state.army) return;

    this.state.army.units = this.state.army.units.filter((u) => u.id !== unitId);
    this.notify();
  }

  resetArmy(): void {
    this.state.army = null;
    clearState();
    this.notify();
  }

  loadFromImport(army: ArmyState | null, customUnitNames: string[]): void {
    this.state.army = army;
    this.state.customUnitNames = customUnitNames;
    this.notify();
  }
}

export const appState = new AppStateManager();
