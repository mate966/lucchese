import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProductService } from '../../../src/ts/services/ProductService/index';
import {
	mockProduct,
	mockApiResponse,
	mockErrorResponse,
} from '../../mocks/api-responses';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('ProductService', () => {
	let productService: ProductService;

	beforeEach(() => {
		productService = new ProductService();
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('getProduct', () => {
		it('fetches product successfully', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockApiResponse,
			});

			const result = await productService.getProduct('1');

			expect(result).toEqual(mockProduct);
			expect(mockFetch).toHaveBeenCalledWith('/api/products/1');
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});

		it('throws error when API returns HTTP error', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 404,
			});

			await expect(productService.getProduct('999')).rejects.toThrow(
				'HTTP error! status: 404'
			);
			expect(mockFetch).toHaveBeenCalledWith('/api/products/999');
		});

		it('throws error when API returns success: false', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockErrorResponse,
			});

			await expect(productService.getProduct('1')).rejects.toThrow(
				'Product not found'
			);
		});

		it('throws generic error when API returns success: false without message', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					success: false,
					data: null,
				}),
			});

			await expect(productService.getProduct('1')).rejects.toThrow(
				'Failed to fetch product'
			);
		});

		it('logs and rethrows error when fetch fails', async () => {
			const consoleSpy = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			const fetchError = new Error('Network error');
			mockFetch.mockRejectedValueOnce(fetchError);

			await expect(productService.getProduct('1')).rejects.toThrow(
				'Network error'
			);
			expect(consoleSpy).toHaveBeenCalledWith(
				'Error fetching product:',
				fetchError
			);
		});

		it('uses correct URL with baseUrl', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockApiResponse,
			});

			await productService.getProduct('test-id');

			expect(mockFetch).toHaveBeenCalledWith('/api/products/test-id');
		});
	});
});
