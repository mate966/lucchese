export interface ToggleState {
	[key: string]: boolean | undefined | (() => void);
	isOpen: boolean;
	toggle(): void;
	close(): void;
	open(): void;
	updateDialog(): void;
}
