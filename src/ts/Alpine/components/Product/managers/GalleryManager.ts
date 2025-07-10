export class GalleryManager {
	isExpanded = false;

	expand(): void {
		this.isExpanded = true;
	}

	collapse(): void {
		this.isExpanded = false;
		setTimeout(() => {
			const button = document.querySelector(
				'[x-text*="Show more media"]'
			) as HTMLElement;
			if (button) {
				button.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				});
			}
		}, 100);
	}

	toggle(): void {
		this.isExpanded = !this.isExpanded;
	}

	getVisibleImages(gallery: string[]): string[] {
		if (!gallery) {
			return [];
		}
		return this.isExpanded ? gallery : gallery.slice(0, 4);
	}

	hasMoreImages(gallery: string[]): boolean {
		return !!(gallery && gallery.length > 4);
	}

	getHiddenCount(gallery: string[]): number {
		if (!gallery || gallery.length <= 4) {
			return 0;
		}
		return gallery.length - 4;
	}
}
