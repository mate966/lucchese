import type { RecommendationProduct } from '../../../services/RecommendationService/types';

export interface RecommendationsState {
	recommendations: RecommendationProduct[];
	loading: boolean;
	error: string | null;
	expandedColors: Set<string>;

	loadRecommendations(): Promise<void>;
	selectColor(productId: string, colorName: string): void;
	getSelectedColor(productId: string): string;
	getSelectedColorImage(productId: string): string;
	toggleExpandedColors(productId: string): void;
	isExpanded(productId: string): boolean;
}
