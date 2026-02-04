export interface TypeaheadOption {
  value: string;
  label: string;
  data?: unknown;
}

export interface TypeaheadConfig {
  inputId: string;
  options: TypeaheadOption[];
  onSelect?: (option: TypeaheadOption) => void;
  allowCustom?: boolean;
  placeholder?: string;
}

export class Typeahead {
  private input: HTMLInputElement;
  private dropdown: HTMLDivElement | null = null;
  private options: TypeaheadOption[];
  private filteredOptions: TypeaheadOption[] = [];
  private highlightIndex = -1;
  private onSelect?: (option: TypeaheadOption) => void;
  private allowCustom: boolean;

  constructor(config: TypeaheadConfig) {
    const input = document.getElementById(config.inputId) as HTMLInputElement;
    if (!input) throw new Error(`Input element ${config.inputId} not found`);

    this.input = input;
    this.options = config.options;
    this.onSelect = config.onSelect;
    this.allowCustom = config.allowCustom ?? true;

    if (config.placeholder) {
      this.input.placeholder = config.placeholder;
    }

    this.setupEventListeners();
  }

  setOptions(options: TypeaheadOption[]): void {
    this.options = options;
  }

  private setupEventListeners(): void {
    this.input.addEventListener('input', () => this.handleInput());
    this.input.addEventListener('focus', () => this.handleFocus());
    this.input.addEventListener('blur', () => this.handleBlur());
    this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
  }

  private handleInput(): void {
    const query = this.input.value.toLowerCase();
    this.filteredOptions = this.options.filter((opt) => opt.label.toLowerCase().includes(query));
    this.highlightIndex = -1;
    this.showDropdown();
  }

  private handleFocus(): void {
    if (this.input.value.length > 0) {
      this.handleInput();
    }
  }

  private handleBlur(): void {
    // Delay to allow click on dropdown option
    setTimeout(() => this.hideDropdown(), 150);
  }

  private handleKeydown(e: KeyboardEvent): void {
    if (!this.dropdown) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.highlightIndex = Math.min(this.highlightIndex + 1, this.filteredOptions.length - 1);
        this.updateHighlight();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.highlightIndex = Math.max(this.highlightIndex - 1, -1);
        this.updateHighlight();
        break;
      case 'Enter':
        e.preventDefault();
        if (this.highlightIndex >= 0) {
          this.selectOption(this.filteredOptions[this.highlightIndex]);
        } else if (this.allowCustom && this.input.value.trim()) {
          this.selectOption({ value: this.input.value, label: this.input.value });
        }
        break;
      case 'Escape':
        this.hideDropdown();
        break;
    }
  }

  private showDropdown(): void {
    this.hideDropdown();

    if (this.filteredOptions.length === 0) return;

    this.dropdown = document.createElement('div');
    this.dropdown.className = 'typeahead-dropdown';

    this.filteredOptions.forEach((opt, index) => {
      const div = document.createElement('div');
      div.className = 'typeahead-option';
      div.textContent = opt.label;
      div.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this.selectOption(opt);
      });
      div.addEventListener('mouseenter', () => {
        this.highlightIndex = index;
        this.updateHighlight();
      });
      this.dropdown!.appendChild(div);
    });

    // Position dropdown
    const container = this.input.parentElement;
    if (container) {
      container.style.position = 'relative';
      container.appendChild(this.dropdown);
    }
  }

  private hideDropdown(): void {
    if (this.dropdown) {
      this.dropdown.remove();
      this.dropdown = null;
    }
    this.highlightIndex = -1;
  }

  private updateHighlight(): void {
    if (!this.dropdown) return;

    const options = this.dropdown.querySelectorAll('.typeahead-option');
    options.forEach((opt, index) => {
      opt.classList.toggle('highlighted', index === this.highlightIndex);
    });
  }

  private selectOption(option: TypeaheadOption): void {
    this.input.value = option.label;
    this.hideDropdown();
    this.onSelect?.(option);
  }

  destroy(): void {
    this.hideDropdown();
  }
}
