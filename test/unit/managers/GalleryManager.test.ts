import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GalleryManager } from '../../../src/ts/Alpine/components/Product/managers/GalleryManager';

const mockScrollIntoView = vi.fn();
const mockQuerySelector = vi.fn();

Object.defineProperty(global, 'document', {
	value: {
		querySelector: mockQuerySelector,
	},
	writable: true,
});

describe('GalleryManager', () => {
	let galleryManager: GalleryManager;

	beforeEach(() => {
		galleryManager = new GalleryManager();
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('expand', () => {
		it('sets isExpanded to true', () => {
			galleryManager.expand();
			expect(galleryManager.isExpanded).toBe(true);
		});
	});

	describe('collapse', () => {
		it('sets isExpanded to false', () => {
			galleryManager.isExpanded = true;
			galleryManager.collapse();
			expect(galleryManager.isExpanded).toBe(false);
		});

		it('scrolls to the button after 100ms', async () => {
			const mockElement = {
				scrollIntoView: mockScrollIntoView,
			};
			mockQuerySelector.mockReturnValue(mockElement);

			vi.useFakeTimers();

			galleryManager.collapse();

			vi.advanceTimersByTime(100);

			expect(mockQuerySelector).toHaveBeenCalledWith(
				'[x-text*="Show more media"]'
			);
			expect(mockScrollIntoView).toHaveBeenCalledWith({
				behavior: 'smooth',
				block: 'center',
			});

			vi.useRealTimers();
		});

		it('does not throw if the element does not exist', async () => {
			mockQuerySelector.mockReturnValue(null);
			vi.useFakeTimers();

			galleryManager.collapse();
			vi.advanceTimersByTime(100);

			expect(mockQuerySelector).toHaveBeenCalledWith(
				'[x-text*="Show more media"]'
			);
			expect(mockScrollIntoView).not.toHaveBeenCalled();

			vi.useRealTimers();
		});
	});

	describe('toggle', () => {
		it('changes state from false to true', () => {
			galleryManager.isExpanded = false;
			galleryManager.toggle();
			expect(galleryManager.isExpanded).toBe(true);
		});

		it('changes state from true to false', () => {
			galleryManager.isExpanded = true;
			galleryManager.toggle();
			expect(galleryManager.isExpanded).toBe(false);
		});
	});

	describe('getVisibleImages', () => {
		const mockGallery = [
			'/img1.jpg',
			'/img2.jpg',
			'/img3.jpg',
			'/img4.jpg',
			'/img5.jpg',
			'/img6.jpg',
		];

		it('returns all images when gallery is expanded', () => {
			galleryManager.isExpanded = true;
			const result = galleryManager.getVisibleImages(mockGallery);
			expect(result).toEqual(mockGallery);
		});

		it('returns first 4 images when gallery is collapsed', () => {
			galleryManager.isExpanded = false;
			const result = galleryManager.getVisibleImages(mockGallery);
			expect(result).toEqual([
				'/img1.jpg',
				'/img2.jpg',
				'/img3.jpg',
				'/img4.jpg',
			]);
		});

		it('returns an empty array when gallery is null', () => {
			const result = galleryManager.getVisibleImages(null as any);
			expect(result).toEqual([]);
		});

		it('returns an empty array when gallery is undefined', () => {
			const result = galleryManager.getVisibleImages(undefined as any);
			expect(result).toEqual([]);
		});
	});

	describe('hasMoreImages', () => {
		it('returns true when gallery has more than 4 images', () => {
			const mockGallery = [
				'/img1.jpg',
				'/img2.jpg',
				'/img3.jpg',
				'/img4.jpg',
				'/img5.jpg',
			];
			const result = galleryManager.hasMoreImages(mockGallery);
			expect(result).toBe(true);
		});

		it('returns false when gallery has exactly 4 images', () => {
			const mockGallery = [
				'/img1.jpg',
				'/img2.jpg',
				'/img3.jpg',
				'/img4.jpg',
			];
			const result = galleryManager.hasMoreImages(mockGallery);
			expect(result).toBe(false);
		});

		it('returns false when gallery has less than 4 images', () => {
			const mockGallery = ['/img1.jpg', '/img2.jpg'];
			const result = galleryManager.hasMoreImages(mockGallery);
			expect(result).toBe(false);
		});

		it('returns false when gallery is null', () => {
			const result = galleryManager.hasMoreImages(null as any);
			expect(result).toBe(false);
		});
	});

	describe('getHiddenCount', () => {
		it('returns the number of hidden images', () => {
			const mockGallery = [
				'/img1.jpg',
				'/img2.jpg',
				'/img3.jpg',
				'/img4.jpg',
				'/img5.jpg',
				'/img6.jpg',
			];
			const result = galleryManager.getHiddenCount(mockGallery);
			expect(result).toBe(2);
		});

		it('returns 0 when gallery has 4 or fewer images', () => {
			const mockGallery = [
				'/img1.jpg',
				'/img2.jpg',
				'/img3.jpg',
				'/img4.jpg',
			];
			const result = galleryManager.getHiddenCount(mockGallery);
			expect(result).toBe(0);
		});

		it('returns 0 when gallery is null', () => {
			const result = galleryManager.getHiddenCount(null as any);
			expect(result).toBe(0);
		});
	});
});
