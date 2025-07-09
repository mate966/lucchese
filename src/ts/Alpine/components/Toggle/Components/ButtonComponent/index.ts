import type { ToggleState } from '../../types';
import { BaseToggleComponent } from '../../index';

export class ButtonComponent extends BaseToggleComponent {
	menuOpen = false;

	toggle(): void {
		this.menuOpen = !this.menuOpen;
	}

	close(): void {
		this.menuOpen = false;
	}

	open(): void {
		this.menuOpen = true;
	}
}

export const buttonComponent = (): ToggleState => {
	return new ButtonComponent();
};
