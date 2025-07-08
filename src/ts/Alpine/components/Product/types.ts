import type { Product } from '../../../services/ProductService/types';

export interface ProductState {
	product: Product | null;
	loading: boolean;
	error: string | null;
	selectedSize: {
		size: number;
		width: string;
		toeHeel: string;
	} | null;
	currentImageIndex: number;

	loadProduct(_id: string): Promise<void>;
	selectSize(_size: { size: number; width: string; toeHeel: string }): void;
	goToImage(_index: number): void;
	addToCart(): void;
}
