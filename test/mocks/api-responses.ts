import type { Product } from '../../src/ts/services/ProductService/types';
import type { RecommendationProduct } from '../../src/ts/services/RecommendationService/types';

export const mockProduct: Product = {
	id: '1',
	title: 'Classic Boot',
	price: 799.99,
	description: 'Premium leather boot with exceptional craftsmanship',
	gallery: [
		'/images/product-1.jpg',
		'/images/product-2.jpg',
		'/images/product-3.jpg',
		'/images/product-4.jpg',
		'/images/product-5.jpg',
	],
	colors: [
		{ name: 'Black', pattern: 'pattern-black.webp' },
		{ name: 'Brown', pattern: 'pattern-brown.webp' },
		{ name: 'Red', pattern: 'pattern-red.webp' },
	],
	sizes: [7, 8, 9, 10, 11, 12],
	toeHeels: ['Round', 'Square', 'Pointed'],
	widths: ['D', 'E', 'EE', 'EEE'],
};

export const mockRecommendations: RecommendationProduct[] = [
	{
		id: '2',
		title: 'Recommended Boot 1',
		price: '$699.99',
		image: '/images/rec-1.jpg',
		colors: [
			{
				name: 'Black',
				pattern: 'pattern-black.webp',
				image: '/images/rec-1-black.jpg',
			},
			{
				name: 'Brown',
				pattern: 'pattern-brown.webp',
				image: '/images/rec-1-brown.jpg',
			},
		],
	},
	{
		id: '3',
		title: 'Recommended Boot 2',
		price: '$899.99',
		image: '/images/rec-2.jpg',
		colors: [
			{
				name: 'Red',
				pattern: 'pattern-red.webp',
				image: '/images/rec-2-red.jpg',
			},
		],
	},
];

export const mockApiResponse = {
	success: true,
	data: mockProduct,
	message: 'Product fetched successfully',
};

export const mockRecommendationsResponse = {
	success: true,
	data: mockRecommendations,
	message: 'Recommendations fetched successfully',
};

export const mockErrorResponse = {
	success: false,
	data: null,
	message: 'Product not found',
};
