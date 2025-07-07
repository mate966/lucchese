import Alpine from 'alpinejs';
import { AlpineManager } from './Alpine';

class Site {
	private alpineManager: AlpineManager;

	constructor() {
		this.alpineManager = new AlpineManager();
	}

	init() {
		this.alpineManager.registerComponentsInAlpine();
		Alpine.start();
	}
}

export default Site;
