export interface AlpineComponent {
	name: string;
	data: () => Record<string, unknown> | object;
}
