import { BaseToggleComponent } from '../..';
import type { ToggleState } from '../../types';

export class SizesComponent extends BaseToggleComponent {
	isOpen = false;

	toggle(): void {
		this.isOpen = !this.isOpen;
	}

	close(): void {
		this.isOpen = false;
	}

	open(): void {
		this.isOpen = true;
	}
}

export const sizesComponent = (): ToggleState => {
	return new SizesComponent();
};
