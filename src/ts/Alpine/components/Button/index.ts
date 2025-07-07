import type { ButtonState } from './types';

export const buttonComponent = (
	props: Partial<ButtonState> = {}
): ButtonState => ({
	menuOpen: false,
	icon: props.icon,
	disabled: props.disabled ?? false,
	loading: props.loading ?? false,

	toggle() {
		if (!this.disabled && !this.loading) {
			this.menuOpen = !this.menuOpen;
		}
	},

	close() {
		this.menuOpen = false;
	},

	open() {
		this.menuOpen = true;
	},
});
