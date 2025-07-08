import type { Product, ApiResponse } from './types';

export class ProductService {
	private baseUrl = '/api';

	async getProduct(id: string): Promise<Product> {
		try {
			const response = await fetch(`${this.baseUrl}/products/${id}`);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result: ApiResponse<Product> = await response.json();

			if (!result.success) {
				throw new Error(result.message || 'Failed to fetch product');
			}

			return result.data;
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Error fetching product:', error);
			throw error;
		}
	}
}

export const productService = new ProductService();
