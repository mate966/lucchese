import Alpine from '@alpinejs/csp';

Alpine.data('toggle', () => ({
	open: false,
	toggle() {
		this.open = !this.open;
	},
}));

Alpine.start();
