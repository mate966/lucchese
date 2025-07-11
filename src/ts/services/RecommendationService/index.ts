import type { RecommendationProduct, ApiResponse } from './types';

export class RecommendationService {
	private baseUrl = '/api';

	async getRecommendations(): Promise<RecommendationProduct[]> {
		const response = await fetch(`${this.baseUrl}/recommendations`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: ApiResponse<RecommendationProduct[]> =
			await response.json();

		if (!result.success) {
			throw new Error(
				result.message || 'Failed to fetch recommendations'
			);
		}

		return result.data;
	}
}

export const recommendationService = new RecommendationService();
