import { appState } from '../state';
import { allocateArmy } from '../allocation';
import { exportArmyToYaml, importArmyFromYaml, downloadYamlFile, openAndReadYamlFile } from '../io';
import { renderHeader } from './header';
import { renderFooter } from './footer';
import { renderCreateArmy, setupCreateArmyHandlers } from './create-army';
import { renderAddUnit, setupAddUnitHandlers, destroyAddUnitHandlers } from './add-unit';
import { renderUnitList, setupUnitListHandlers } from './unit-list';
import { renderDetachmentDisplay } from './detachment-display';

export class App {
  private container: HTMLElement;
  private unsubscribe?: () => void;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  render(): void {
    const army = appState.getArmy();

    if (!army) {
      this.renderCreateArmyView();
    } else {
      this.renderArmyView();
    }

    this.setupGlobalHandlers();

    // Subscribe to state changes
    if (!this.unsubscribe) {
      this.unsubscribe = appState.subscribe(() => this.render());
    }
  }

  private renderCreateArmyView(): void {
    destroyAddUnitHandlers();

    this.container.innerHTML = `
      ${renderHeader(null)}
      <main>
        ${renderCreateArmy()}
      </main>
      ${renderFooter()}
    `;

    setupCreateArmyHandlers();
  }

  private renderArmyView(): void {
    destroyAddUnitHandlers();

    const army = appState.getArmy()!;
    const allocation = allocateArmy(army);

    this.container.innerHTML = `
      ${renderHeader(army)}
      <main class="main-content">
        <div class="left-panel">
          ${renderAddUnit(army)}
          ${renderUnitList(army)}
        </div>
        <div class="right-panel">
          ${renderDetachmentDisplay(allocation, army)}
        </div>
      </main>
      ${renderFooter()}
    `;

    setupAddUnitHandlers(army);
    setupUnitListHandlers();
  }

  private setupGlobalHandlers(): void {
    const resetBtn = document.getElementById('reset-army');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset your army? This cannot be undone.')) {
          appState.resetArmy();
        }
      });
    }

    const saveBtn = document.getElementById('save-army');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.handleSaveArmy();
      });
    }

    const loadBtn = document.getElementById('load-army');
    if (loadBtn) {
      loadBtn.addEventListener('click', () => {
        this.handleLoadArmy();
      });
    }
  }

  private handleSaveArmy(): void {
    const army = appState.getArmy();
    const customUnitNames = appState.getCustomUnitNames();
    const yamlContent = exportArmyToYaml(army, customUnitNames);

    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `army-${timestamp}.yaml`;

    downloadYamlFile(yamlContent, filename);
  }

  private async handleLoadArmy(): Promise<void> {
    const yamlContent = await openAndReadYamlFile();
    if (!yamlContent) {
      return;
    }

    const result = importArmyFromYaml(yamlContent);
    if (!result.success) {
      alert(`Failed to load army: ${result.error}`);
      return;
    }

    const existingArmy = appState.getArmy();
    if (existingArmy && existingArmy.units.length > 0) {
      if (!confirm('Loading will replace your current army. Do you want to continue?')) {
        return;
      }
    }

    appState.loadFromImport(result.army, result.customUnitNames);
  }

  destroy(): void {
    destroyAddUnitHandlers();
    this.unsubscribe?.();
  }
}
