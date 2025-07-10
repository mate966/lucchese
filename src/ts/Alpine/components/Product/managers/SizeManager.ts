export class SizeManager {
	selectedSize: string | null = null;
	availableSizes: string[] = [];

	setAvailableSizes(sizes: string[]): void {
		this.availableSizes = sizes || [];
	}

	selectSize(size: string): void {
		this.selectedSize = size;
	}

	isSizeSelected(size: string): boolean {
		return this.selectedSize === size;
	}

	isSizeAvailable(size: string): boolean {
		return this.availableSizes.includes(size);
	}

	getSelectedSize(): string | null {
		return this.selectedSize;
	}

	hasSelectedSize(): boolean {
		return this.selectedSize !== null;
	}
}
