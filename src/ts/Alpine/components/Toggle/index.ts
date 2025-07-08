import type { ToggleState } from './types';

export abstract class BaseToggleComponent implements ToggleState {
	[key: string]: boolean | (() => void) | undefined;
	disabled = false;
	loading = false;

	abstract toggle(): void;
	abstract close(): void;
	abstract open(): void;
}

export class ButtonComponent extends BaseToggleComponent {
	menuOpen = false;

	toggle(): void {
		if (!this.disabled && !this.loading) {
			this.menuOpen = !this.menuOpen;
		}
	}

	close(): void {
		this.menuOpen = false;
	}

	open(): void {
		this.menuOpen = true;
	}
}

export class AccordionComponent extends BaseToggleComponent {
	isOpen = false;

	toggle(): void {
		if (!this.disabled && !this.loading) {
			this.isOpen = !this.isOpen;
		}
	}

	close(): void {
		this.isOpen = false;
	}

	open(): void {
		this.isOpen = true;
	}
}

export const buttonComponent = (): ToggleState => {
	return new ButtonComponent();
};

export const accordionComponent = (): ToggleState => {
	return new AccordionComponent();
};
