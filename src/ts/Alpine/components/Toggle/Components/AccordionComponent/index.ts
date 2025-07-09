import type { ToggleState } from '../../types';
import { BaseToggleComponent } from '../../index';

export class AccordionComponent extends BaseToggleComponent {
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

export const accordionComponent = (): ToggleState => {
	return new AccordionComponent();
};
