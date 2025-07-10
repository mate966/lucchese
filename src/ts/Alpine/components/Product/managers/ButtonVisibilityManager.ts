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
		if (window.innerWidth > 768) {
			this.isAddToCartButtonVisible = true;
			return;
		}

		const btn = document.querySelector(
			'[x-ref="addToCartBtn"]'
		) as HTMLElement;

		if (!btn) {
			this.isAddToCartButtonVisible = true;
			return;
		}

		const rect = btn.getBoundingClientRect();
		const isInViewport =
			rect.top >= 0 &&
			rect.bottom <=
				(window.innerHeight || document.documentElement.clientHeight);

		if (this.isAddToCartButtonVisible !== isInViewport) {
			this.isAddToCartButtonVisible = isInViewport;
		}
	}

	initAddToCartButtonVisibility(): void {
		if (window.innerWidth > 768) {
			this.isAddToCartButtonVisible = true;
			return;
		}

		setTimeout(() => {
			this.checkAddToCartButtonVisibility();

			const handleScroll = () => {
				requestAnimationFrame(() =>
					this.checkAddToCartButtonVisibility()
				);
			};

			const handleResize = () => {
				if (window.innerWidth > 768) {
					this.isAddToCartButtonVisible = true;
					window.removeEventListener('scroll', handleScroll);
					window.removeEventListener('resize', handleResize);
				} else {
					this.checkAddToCartButtonVisibility();
				}
			};

			window.addEventListener('scroll', handleScroll, { passive: true });
			window.addEventListener('resize', handleResize);
		}, 100);
	}
}
