export class ButtonManager {
	showAddToCart = false;
	showSizeSelector = false;
	isAddToCartButtonVisible = true;

	updateButtonVisibility(
		hasSelectedSize: boolean,
		hasAvailableSizes: boolean
	): void {
		this.showAddToCart = hasSelectedSize;
		this.showSizeSelector = hasAvailableSizes && !hasSelectedSize;
	}

	isAddToCartVisible(): boolean {
		return this.showAddToCart;
	}

	isSizeSelectorVisible(): boolean {
		return this.showSizeSelector;
	}

	showAddToCartButton(): void {
		this.showAddToCart = true;
		this.showSizeSelector = false;
	}

	showSizeSelectorButton(): void {
		this.showAddToCart = false;
		this.showSizeSelector = true;
	}

	hideAllButtons(): void {
		this.showAddToCart = false;
		this.showSizeSelector = false;
	}

	checkAddToCartButtonVisibility(): void {
		const btn = document.querySelector(
			'[x-ref="addToCartBtn"]'
		) as HTMLElement;

		if (!btn) {
			this.isAddToCartButtonVisible = true;
			return;
		}

		const rect = btn.getBoundingClientRect();
		const viewportHeight =
			window.innerHeight || document.documentElement.clientHeight;

		const safetyMargin = 20;
		const isFullyVisible =
			rect.top >= 0 && rect.bottom <= viewportHeight - safetyMargin;

		if (this.isAddToCartButtonVisible !== isFullyVisible) {
			this.isAddToCartButtonVisible = isFullyVisible;
		}
	}

	initAddToCartButtonVisibility(): void {
		this.isAddToCartButtonVisible = true;

		setTimeout(() => {
			this.checkAddToCartButtonVisibility();

			const handleScroll = () => {
				requestAnimationFrame(() =>
					this.checkAddToCartButtonVisibility()
				);
			};

			const handleResize = () => {
				this.checkAddToCartButtonVisibility();
			};

			window.addEventListener('scroll', handleScroll, { passive: true });
			window.addEventListener('resize', handleResize);
		}, 100);
	}
}
