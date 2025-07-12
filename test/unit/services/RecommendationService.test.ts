import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RecommendationService } from '../../../src/ts/services/RecommendationService/index';
import {
	mockRecommendations,
	mockRecommendationsResponse,
} from '../../mocks/api-responses';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('RecommendationService', () => {
	let recommendationService: RecommendationService;

	beforeEach(() => {
		recommendationService = new RecommendationService();
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('getRecommendations', () => {
		it('fetches recommendations successfully', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockRecommendationsResponse,
			});

			const result = await recommendationService.getRecommendations();

			expect(result).toEqual(mockRecommendations);
			expect(mockFetch).toHaveBeenCalledWith('/api/recommendations');
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});

		it('throws an error when API returns HTTP error', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 500,
			});

			await expect(
				recommendationService.getRecommendations()
			).rejects.toThrow('HTTP error! status: 500');
			expect(mockFetch).toHaveBeenCalledWith('/api/recommendations');
		});

		it('throws an error when API returns success: false', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					success: false,
					data: null,
					message: 'No recommendations found',
				}),
			});

			await expect(
				recommendationService.getRecommendations()
			).rejects.toThrow('No recommendations found');
		});

		it('throws a generic error when API returns success: false without message', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					success: false,
					data: null,
				}),
			});

			await expect(
				recommendationService.getRecommendations()
			).rejects.toThrow('Failed to fetch recommendations');
		});

		it('returns an empty array when API returns empty data', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					success: true,
					data: [],
				}),
			});

			const result = await recommendationService.getRecommendations();

			expect(result).toEqual([]);
		});

		it('handles network fetch errors', async () => {
			mockFetch.mockRejectedValueOnce(new Error('Network error'));

			await expect(
				recommendationService.getRecommendations()
			).rejects.toThrow('Network error');
		});
	});
});
