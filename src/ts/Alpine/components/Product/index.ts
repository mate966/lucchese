import type { ProductState } from './types';
import { productService } from '../../../services/ProductService/index';
import { SwiperComponent } from '../Swiper';

export class ProductComponent implements ProductState {
	product: ProductState['product'] = null;
	loading = false;
	error: string | null = null;
	selectedSize: ProductState['selectedSize'] = null;
	currentImageIndex = 0;
	private swiper: SwiperComponent;

	constructor() {
		this.swiper = new SwiperComponent();
	}

	async loadProduct(id: string): Promise<void> {
		this.loading = true;
		this.error = null;

		try {
			this.product = await productService.getProduct(id);

			if (
				this.product &&
				this.product.sizes &&
				this.product.sizes.length > 0
			) {
				const firstSize = this.product.sizes[0];
				const firstWidth = this.product.widths?.[0] || '';
				const firstToeHeel = this.product.toeHeels?.[0] || '';

				this.selectedSize = {
					size: firstSize,
					widths: [firstWidth],
					toeHeels: [firstToeHeel],
				};
			}

			setTimeout(() => {
				this.initSwiper();
			}, 100);
		} catch (error) {
			this.error =
				error instanceof Error
					? error.message
					: 'Failed to load product';
		} finally {
			this.loading = false;
		}
	}

	initSwiper(): void {
		this.swiper.initSwiper('.product-swiper', '.product-thumbs');
	}

	destroySwiper(): void {
		this.swiper.destroySwiper();
	}

	selectSize(size: {
		size: number;
		widths: string[];
		toeHeels: string[];
	}): void {
		this.selectedSize = size;
	}

	hasOptions(): boolean {
		return !!(
			this.product &&
			this.product.sizes &&
			this.product.sizes.length > 0
		);
	}

	getOptions(): (number | string)[] {
		if (!this.product) {
			return [];
		}
		return [
			...this.product.sizes,
			...this.product.widths,
			...this.product.toeHeels,
		];
	}

	getOptionsByType(type: string): (number | string)[] {
		if (!this.product) {
			return [];
		}

		switch (type) {
			case 'size':
				return this.product.sizes || [];
			case 'width':
				return this.product.widths || [];
			case 'toeHeel':
				return this.product.toeHeels || [];
			default:
				return [];
		}
	}

	selectSizeOption(type: string, item: number | string): void {
		if (!this.product || !this.selectedSize) {
			return;
		}

		const newSelectedSize = { ...this.selectedSize };

		switch (type) {
			case 'size':
				newSelectedSize.size = item as number;
				break;
			case 'width':
				newSelectedSize.widths = [item as string];
				break;
			case 'toeHeel':
				newSelectedSize.toeHeels = [item as string];
				break;
		}

		this.selectSize(newSelectedSize);
	}

	getButtonClasses(type: string, item: number | string): string {
		if (!this.selectedSize) {
			return 'tw-bg-gray-100 tw-text-black hover:tw-bg-gray-200';
		}

		let isSelected = false;

		switch (type) {
			case 'size':
				isSelected = this.selectedSize.size === item;
				break;
			case 'width':
				isSelected =
					this.selectedSize.widths?.includes(item as string) || false;
				break;
			case 'toeHeel':
				isSelected =
					this.selectedSize.toeHeels?.includes(item as string) ||
					false;
				break;
		}

		return isSelected
			? 'tw-bg-black tw-text-white'
			: 'tw-bg-gray-100 tw-text-black hover:tw-bg-gray-200';
	}

	goToImage(index: number): void {
		if (
			!this.product ||
			index < 0 ||
			index >= this.product.gallery.length
		) {
			return;
		}

		this.currentImageIndex = index;
	}

	addToCart(): void {
		if (!this.selectedSize) {
			alert('Please select a size first');
			return;
		}

		if (!this.product) {
			alert('Product not loaded');
			return;
		}

		alert(
			`Added ${this.product.title} (Size: ${this.selectedSize.size}${this.selectedSize.widths.join(
				', '
			)} ${this.selectedSize.toeHeels.join(', ')}) to cart!`
		);
	}
}

export const productComponent = (): ProductState => {
	return new ProductComponent();
};
