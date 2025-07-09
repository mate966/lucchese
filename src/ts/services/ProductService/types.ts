export interface Product {
	id: string;
	title: string;
	price: number;
	description: string;
	gallery: string[];
	colors: {
		name: string;
		pattern?: string;
		url?: string;
	}[];
	sizes: number[];
	toeHeels: string[];
	widths: string[];
}

export interface ApiResponse<T> {
	success: boolean;
	data: T;
	message?: string;
}
