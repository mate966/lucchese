export interface RecommendationProduct {
	id: string;
	title: string;
	price: string;
	image: string;
	colors: {
		name: string;
		pattern: string;
		image: string;
	}[];
}

export interface ApiResponse<T> {
	success: boolean;
	data: T;
	message?: string;
}
