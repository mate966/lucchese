import type { AlpineComponent } from './types';
import { buttonComponent } from './components/Button';
import Alpine from 'alpinejs';

declare global {
	interface Window {
		Alpine: typeof Alpine;
	}
}

export class AlpineManager {
	private components: Map<string, AlpineComponent> = new Map<
		string,
		AlpineComponent
	>();

	constructor() {
		this.registerDefaultComponents();
	}

	private registerDefaultComponents(): void {
		this.registerComponent('button', buttonComponent);
	}

	registerComponent(
		name: string,
		component: () => Record<string, unknown> | object
	): void {
		this.components.set(name, { name, data: component });
	}

	registerComponentsInAlpine(): void {
		this.components.forEach((component, name) => {
			Alpine.data(name, component.data);
		});
	}

	getComponent(name: string): AlpineComponent | undefined {
		return this.components.get(name);
	}
}
