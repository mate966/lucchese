export interface ToggleState {
	[key: string]: boolean | undefined | (() => void);
	disabled?: boolean;
	loading?: boolean;
	toggle(): void;
	close(): void;
	open(): void;
}

export interface ToggleConfig {
	stateName: string;
	initialState?: boolean;
	disabled?: boolean;
	loading?: boolean;
}
