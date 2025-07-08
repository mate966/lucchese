import type { ToggleState, ToggleConfig } from './types';

export const createToggleComponent = (config: ToggleConfig) => {
	return (props: Partial<ToggleState> = {}): ToggleState => {
		const state: ToggleState = {
			[config.stateName]:
				props[config.stateName] ?? config.initialState ?? false,
			disabled: props.disabled ?? config.disabled ?? false,
			loading: props.loading ?? config.loading ?? false,

			toggle() {
				if (!this.disabled && !this.loading) {
					this[config.stateName] = !this[config.stateName];
				}
			},

			close() {
				this[config.stateName] = false;
			},

			open() {
				this[config.stateName] = true;
			},
		};

		return state;
	};
};

export const buttonComponent = createToggleComponent({
	stateName: 'menuOpen',
	initialState: false,
});

export const accordionComponent = createToggleComponent({
	stateName: 'isOpen',
	initialState: false,
});
