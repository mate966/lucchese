import type { AlpineComponent } from './types';
import { buttonComponent, accordionComponent } from './components/Toggle';
import { productComponent } from './components/Product';
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
		this.registerComponent('toggle', buttonComponent);
		this.registerComponent('accordion', accordionComponent);
		this.registerComponent('product', productComponent);
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
