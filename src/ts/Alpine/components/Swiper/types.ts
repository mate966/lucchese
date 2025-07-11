import type Swiper from 'swiper';

export interface SwiperState {
	mainSwiper: Swiper | null;
	thumbsSwiper: Swiper | null;
	initSwiper(mainSelector: string, thumbsSelector?: string): void;
	destroySwiper(): void;
	goToSlide(index: number): void;
}
