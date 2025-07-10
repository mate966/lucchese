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

	hasOptions(): boolean;
	getOptions(): (number | string)[];
	getOptionsByType(_type: string): (number | string)[];
	selectSizeOption(_type: string, _item: number | string): void;
	getButtonClasses(_type: string, _item: number | string): string;
}
