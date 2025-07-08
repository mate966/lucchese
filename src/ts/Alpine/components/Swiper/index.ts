import type { SwiperState } from './types';
import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';

export class SwiperComponent implements SwiperState {
	mainSwiper: Swiper | null = null;
	thumbsSwiper: Swiper | null = null;

	initSwiper(mainSelector: string, thumbsSelector: string): void {
		this.destroySwiper();

		this.thumbsSwiper = new Swiper(thumbsSelector, {
			modules: [Navigation, Thumbs],
			spaceBetween: 1,
			slidesPerView: 3.5,
			freeMode: true,
			watchSlidesProgress: true,
		});

		this.mainSwiper = new Swiper(mainSelector, {
			modules: [Navigation, Thumbs],
			spaceBetween: 0,
			thumbs: {
				swiper: this.thumbsSwiper as Swiper,
			},
		});
	}

	destroySwiper(): void {
		if (this.mainSwiper) {
			(this.mainSwiper as Swiper).destroy(true, true);
			this.mainSwiper = null;
		}
		if (this.thumbsSwiper) {
			(this.thumbsSwiper as Swiper).destroy(true, true);
			this.thumbsSwiper = null;
		}
	}

	goToSlide(index: number): void {
		if (this.mainSwiper) {
			(this.mainSwiper as Swiper).slideTo(index);
		}
	}
}
