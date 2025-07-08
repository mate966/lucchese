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

	selectSize(size: { size: number; width: string; toeHeel: string }): void {
		this.selectedSize = size;
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
			`Added ${this.product.title} (Size: ${this.selectedSize.size}${this.selectedSize.width}) to cart!`
		);
	}
}

export const productComponent = (): ProductState => {
	return new ProductComponent();
};
