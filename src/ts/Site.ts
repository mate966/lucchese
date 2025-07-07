import Alpine from '@alpinejs/csp';

class Site {
	init() {
		Alpine.data('toggle', () => ({
			open: false,
			toggle() {
				this.open = !this.open;
			},
		}));

		Alpine.start();
	}
}

export default Site;

window.addEventListener('load', () => {
	const site = new Site();
	site.init();
});
