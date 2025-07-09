export interface ToggleState {
	[key: string]: boolean | undefined | (() => void);
	toggle(): void;
	close(): void;
	open(): void;
}

export interface ToggleConfig {
	stateName: string;
	initialState?: boolean;
}
