export interface ButtonState {
	menuOpen: boolean;
	icon?: string;
	disabled?: boolean;
	loading?: boolean;
	toggle(): void;
	close(): void;
	open(): void;
}
