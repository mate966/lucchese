import type { RecommendationsState } from './types';
import { recommendationService } from '../../../services/RecommendationService/index';
import { SwiperComponent } from '../Swiper';

export class RecommendationsComponent implements RecommendationsState {
	recommendations: RecommendationsState['recommendations'] = [];
	loading = false;
	error: string | null = null;
	expandedColors = new Set<string>();
	private swiper: SwiperComponent;
	private selectedColors = new Map<string, string>();

	constructor() {
		this.swiper = new SwiperComponent();
	}

	async loadRecommendations(): Promise<void> {
		this.loading = true;
		this.error = null;

		try {
			this.recommendations =
				await recommendationService.getRecommendations();

			this.recommendations.forEach((product) => {
				if (product.colors.length > 0) {
					this.selectedColors.set(product.id, product.colors[0].name);
				}
			});

			setTimeout(() => {
				this.initSwiper();
			}, 100);
		} catch (error) {
			this.error =
				error instanceof Error
					? error.message
					: 'Failed to load recommendations';
		} finally {
			this.loading = false;
		}
	}

	selectColor(productId: string, colorName: string): void {
		this.selectedColors.set(productId, colorName);
	}

	getSelectedColor(productId: string): string {
		return this.selectedColors.get(productId) || '';
	}

	getSelectedColorImage(productId: string): string {
		const selectedColorName = this.getSelectedColor(productId);
		const product = this.recommendations.find((p) => p.id === productId);

		if (!product) {
			return '';
		}

		const selectedColor = product.colors.find(
			(c) => c.name === selectedColorName
		);
		return selectedColor?.image || product.image;
	}

	toggleExpandedColors(productId: string): void {
		if (this.expandedColors.has(productId)) {
			this.expandedColors.delete(productId);
		} else {
			this.expandedColors.add(productId);
		}
	}

	isExpanded(productId: string): boolean {
		return this.expandedColors.has(productId);
	}

	initSwiper(): void {
		const swiperElement = document.querySelector('.recommendations-swiper');
		if (swiperElement) {
			this.swiper.initSwiper('.recommendations-swiper');
		}
	}

	destroySwiper(): void {
		this.swiper.destroySwiper();
	}
}

export const recommendationsComponent = (): RecommendationsState => {
	return new RecommendationsComponent();
};
