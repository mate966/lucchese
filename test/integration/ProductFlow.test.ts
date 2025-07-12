import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProductComponent } from '../../src/ts/Alpine/components/Product/index';
import { mockProduct, mockApiResponse } from '../mocks/api-responses';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

const mockQuerySelector = vi.fn();
const mockScrollIntoView = vi.fn();

Object.defineProperty(global, 'document', {
	value: {
		querySelector: mockQuerySelector,
	},
	writable: true,
});

describe('ProductFlow Integration Tests', () => {
	let productComponent: ProductComponent;

	beforeEach(() => {
		productComponent = new ProductComponent();
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('Full product flow', () => {
		it('loads product, selects size and adds to cart', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockApiResponse,
			});

			await productComponent.loadProduct('1');

			expect(productComponent.product).toEqual(mockProduct);
			expect(productComponent.loading).toBe(false);
			expect(productComponent.error).toBeNull();

			const sizeSelection = {
				size: 9,
				widths: ['D', 'E'],
				toeHeels: ['Round', 'Square'],
			};
			productComponent.selectSize(sizeSelection);

			expect(productComponent.selectedSize).toEqual(sizeSelection);

			const hasSelectedSize = productComponent.selectedSize !== null;
			const hasProduct = productComponent.product !== null;

			expect(hasSelectedSize).toBe(true);
			expect(hasProduct).toBe(true);

			expect(() => {
				productComponent.addToCart();
			}).not.toThrow();
		});

		it('handles errors during product loading', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 404,
			});

			await productComponent.loadProduct('999');

			expect(productComponent.product).toBeNull();
			expect(productComponent.loading).toBe(false);
			expect(productComponent.error).toBe('HTTP error! status: 404');
		});

		it('handles gallery image flow', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockApiResponse,
			});

			await productComponent.loadProduct('1');

			const initialVisibleImages =
				productComponent.getVisibleGalleryImages();
			const initialHasMore = productComponent.hasMoreImages();

			expect(initialVisibleImages).toEqual(
				mockProduct.gallery.slice(0, 4)
			);
			expect(initialHasMore).toBe(true);
			expect(productComponent.getHiddenImagesCount()).toBe(1);

			productComponent.expandGallery();

			expect(productComponent.isGalleryExpanded).toBe(true);
			expect(productComponent.getVisibleGalleryImages()).toEqual(
				mockProduct.gallery
			);
			expect(productComponent.hasMoreImages()).toBe(true);

			const mockElement = { scrollIntoView: mockScrollIntoView };
			mockQuerySelector.mockReturnValue(mockElement);

			vi.useFakeTimers();
			productComponent.collapseGallery();
			vi.advanceTimersByTime(100);

			expect(productComponent.isGalleryExpanded).toBe(false);
			expect(productComponent.getVisibleGalleryImages()).toEqual(
				mockProduct.gallery.slice(0, 4)
			);
			expect(mockScrollIntoView).toHaveBeenCalled();

			vi.useRealTimers();
		});

		it('handles image navigation', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockApiResponse,
			});

			await productComponent.loadProduct('1');

			productComponent.goToImage(2);

			expect(productComponent.currentImageIndex).toBe(2);

			productComponent.goToImage(0);

			expect(productComponent.currentImageIndex).toBe(0);
		});

		it('handles size option selection', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockApiResponse,
			});

			await productComponent.loadProduct('1');

			const sizeOptions = productComponent.getOptionsByType('size');
			const widthOptions = productComponent.getOptionsByType('width');

			expect(sizeOptions).toEqual(mockProduct.sizes);
			expect(widthOptions).toEqual(mockProduct.widths);

			productComponent.selectSizeOption('size', 9);

			expect(() => {
				productComponent.selectSizeOption('width', 'D');
			}).not.toThrow();

			expect(() => {
				productComponent.selectSizeOption('toeHeel', 'Round');
			}).not.toThrow();
		});

		it('handles add to cart button visibility', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockApiResponse,
			});

			await productComponent.loadProduct('1');

			const initialVisibility = productComponent.isAddToCartButtonVisible;

			expect(initialVisibility).toBe(true);

			productComponent.checkAddToCartButtonVisibility();

			expect(productComponent.isAddToCartButtonVisible).toBeDefined();
		});
	});

	describe('Edge cases', () => {
		it('handles product without gallery', async () => {
			const productWithoutGallery = { ...mockProduct, gallery: [] };
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					...mockApiResponse,
					data: productWithoutGallery,
				}),
			});

			await productComponent.loadProduct('1');

			expect(productComponent.getVisibleGalleryImages()).toEqual([]);
			expect(productComponent.hasMoreImages()).toBe(false);
			expect(productComponent.getHiddenImagesCount()).toBe(0);
		});

		it('handles product without sizes', async () => {
			const productWithoutSizes = { ...mockProduct, sizes: [] };
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					...mockApiResponse,
					data: productWithoutSizes,
				}),
			});

			await productComponent.loadProduct('1');

			expect(productComponent.getOptionsByType('size')).toEqual([]);
			expect(productComponent.selectedSize).toBeNull();
		});

		it('handles invalid option type', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockApiResponse,
			});

			await productComponent.loadProduct('1');

			expect(productComponent.getOptionsByType('nonexistent')).toEqual(
				[]
			);
		});
	});
});
