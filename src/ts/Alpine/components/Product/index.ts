import type { ProductState } from './types';
import { productService } from '../../../services/ProductService/index';
import { SwiperComponent } from '../Swiper';
import {
	GalleryManager,
	SizeManager,
	ButtonManager,
	CartManager,
} from './managers';

export class ProductComponent implements ProductState {
	product: ProductState['product'] = null;
	loading = false;
	error: string | null = null;
	selectedSize: ProductState['selectedSize'] = null;
	currentImageIndex = 0;
	private swiper: SwiperComponent;

	private galleryManager: GalleryManager;
	private sizeManager: SizeManager;
	private buttonManager: ButtonManager;
	private cartManager: CartManager;

	constructor() {
		this.swiper = new SwiperComponent();
		this.galleryManager = new GalleryManager();
		this.sizeManager = new SizeManager();
		this.buttonManager = new ButtonManager();
		this.cartManager = new CartManager();
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

				this.sizeManager.setAvailableSizes(
					this.product.sizes.map((s) => s.toString())
				);
				this.sizeManager.selectSize(firstSize.toString());
			}

			this.updateButtonVisibility();

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
		this.sizeManager.selectSize(size.size.toString());
		this.updateButtonVisibility();
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
				this.sizeManager.selectSize(item.toString());
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

		this.cartManager.addToCart(
			this.product,
			this.selectedSize.size.toString()
		);
	}

	checkAddToCartButtonVisibility(): void {
		this.buttonManager.checkAddToCartButtonVisibility();
	}

	initAddToCartButtonVisibility(): void {
		this.buttonManager.initAddToCartButtonVisibility();
	}

	get isGalleryExpanded(): boolean {
		return this.galleryManager.isExpanded;
	}

	expandGallery(): void {
		this.galleryManager.expand();
	}

	collapseGallery(): void {
		this.galleryManager.collapse();
	}

	getVisibleGalleryImages(): string[] {
		return this.galleryManager.getVisibleImages(
			this.product?.gallery || []
		);
	}

	hasMoreImages(): boolean {
		return this.galleryManager.hasMoreImages(this.product?.gallery || []);
	}

	getHiddenImagesCount(): number {
		return this.galleryManager.getHiddenCount(this.product?.gallery || []);
	}

	get isAddToCartButtonVisible(): boolean {
		return this.buttonManager.isAddToCartButtonVisible;
	}

	get isSizeSelectorVisible(): boolean {
		return this.buttonManager.isSizeSelectorVisible();
	}

	private updateButtonVisibility(): void {
		const hasSelectedSize = this.sizeManager.hasSelectedSize();
		const hasAvailableSizes = this.sizeManager.availableSizes.length > 0;
		this.buttonManager.updateButtonVisibility(
			hasSelectedSize,
			hasAvailableSizes
		);
	}
}

export const productComponent = (): ProductState => {
	return new ProductComponent();
};
