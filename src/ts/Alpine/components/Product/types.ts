import type { Product } from '../../../services/ProductService/types';

export interface ProductState {
	product: Product | null;
	loading: boolean;
	error: string | null;
	selectedSize: {
		size: number;
		widths: string[];
		toeHeels: string[];
	} | null;
	currentImageIndex: number;

	loadProduct(_id: string): Promise<void>;
	selectSize(_size: {
		size: number;
		widths: string[];
		toeHeels: string[];
	}): void;
	goToImage(_index: number): void;
	addToCart(): void;

	getOptionsByType(_type: string): (number | string)[];
	selectSizeOption(_type: string, _item: number | string): void;

	// Fixed button logic
	isAddToCartButtonVisible: boolean;
	checkAddToCartButtonVisibility(): void;
	initAddToCartButtonVisibility(): void;

	// Gallery logic
	isGalleryExpanded: boolean;
	expandGallery(): void;
	collapseGallery(): void;
	getVisibleGalleryImages(): string[];
	hasMoreImages(): boolean;
	getHiddenImagesCount(): number;
}
