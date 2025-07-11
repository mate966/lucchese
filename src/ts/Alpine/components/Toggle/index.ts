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
	updateDialog() {
		// No-op: Basic toggle component doesn't need dialog logic
	},
});

export const sizeDialogComponent = (): ToggleState => ({
	isOpen: false,
	toggle() {
		this.isOpen = !this.isOpen;
		this.updateDialog();
	},
	close() {
		this.isOpen = false;
		this.updateDialog();
	},
	open() {
		this.isOpen = true;
		this.updateDialog();
	},
	updateDialog() {
		let dialog = (
			this as unknown as { $refs?: Record<string, HTMLElement> }
		).$refs?.sizeDialog as HTMLDialogElement;

		if (!dialog) {
			dialog = document.querySelector(
				'dialog[x-ref="sizeDialog"]'
			) as HTMLDialogElement;
		}

		if (dialog) {
			if (this.isOpen) {
				if (!dialog.open) {
					dialog.showModal();
					setTimeout(() => {
						dialog.style.transform = 'translateX(0%)';
					}, 10);
				}
			} else {
				if (dialog.open) {
					dialog.style.transform = 'translateX(100%)';
					setTimeout(() => {
						if (dialog.open) {
							dialog.close();
						}
					}, 300);
				}
			}
		}
	},
});
