import { appState } from '../state';
import { allocateArmy } from '../allocation';
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
  }

  destroy(): void {
    destroyAddUnitHandlers();
    this.unsubscribe?.();
  }
}
