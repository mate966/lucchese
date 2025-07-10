import Alpine from 'alpinejs';
import type { AlpineComponent } from './types';

import { accordionComponent } from './components/Toggle/Components/AccordionComponent';
import { buttonComponent } from './components/Toggle/Components/ButtonComponent';
import { sizesComponent } from './components/Toggle/Components/SizesComponent';
import { productComponent } from './components/Product';
import { recommendationsComponent } from './components/Recommendations';

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
		this.registerComponent('sizes', sizesComponent);
		this.registerComponent('product', productComponent);
		this.registerComponent('recommendations', recommendationsComponent);
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
