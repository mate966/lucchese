export interface ToggleState {
	[key: string]: boolean | undefined | (() => void);
	toggle(): void;
	close(): void;
	open(): void;
}
