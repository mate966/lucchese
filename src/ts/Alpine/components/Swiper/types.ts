import type Swiper from 'swiper';

export interface SwiperState {
	mainSwiper: Swiper | null;
	thumbsSwiper: Swiper | null;
	initSwiper(_mainSelector: string, _thumbsSelector: string): void;
	destroySwiper(): void;
	goToSlide(_index: number): void;
}
