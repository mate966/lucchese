import type { ToggleState } from './types';

export const toggleComponent = (): ToggleState => ({
	isOpen: false,
	toggle() {
		this.isOpen = !this.isOpen;
	},
	close() {
		this.isOpen = false;
	},
	open() {
		this.isOpen = true;
	},
});
