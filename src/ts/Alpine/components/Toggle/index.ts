import type { ToggleState } from './types';

export abstract class BaseToggleComponent implements ToggleState {
	[key: string]: boolean | (() => void) | undefined;

	abstract toggle(): void;
	abstract close(): void;
	abstract open(): void;
}
