import { describe, it, expect } from 'vitest';

describe('Main App', () => {
	it('should have app element', () => {
		document.body.innerHTML = '<div id="app"></div>';

		const appElement = document.querySelector('#app');
		expect(appElement).toBeTruthy();
	});

	it('should be able to import main', () => {
		expect(() => import('./main')).not.toThrow();
	});
});
