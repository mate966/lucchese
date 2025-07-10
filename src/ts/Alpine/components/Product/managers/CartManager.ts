import type { Product } from '../../../../services/ProductService/types';

export class CartManager {
	addToCart(product: Product, selectedSize: string): void {
		if (!product || !selectedSize) {
			return;
		}
	}

	canAddToCart(product: Product, selectedSize: string): boolean {
		return !!(product && selectedSize && product.price);
	}
}
