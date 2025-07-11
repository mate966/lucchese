import type { SwiperState } from './types';
import Swiper from 'swiper';
import { Navigation, Thumbs, Pagination } from 'swiper/modules';

export class SwiperComponent implements SwiperState {
	mainSwiper: Swiper | null = null;
	thumbsSwiper: Swiper | null = null;

	initSwiper(mainSelector: string, thumbsSelector?: string): void {
		this.destroySwiper();

		const mainElement = document.querySelector(mainSelector);
		if (!mainElement) {
			return;
		}

		if (thumbsSelector) {
			const thumbsElement = document.querySelector(thumbsSelector);
			if (!thumbsElement) {
				return;
			}

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
		} else {
			this.mainSwiper = new Swiper(mainSelector, {
				modules: [Navigation, Pagination],
				spaceBetween: 1,
				slidesPerView: 1,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				breakpoints: {
					640: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 2,
						spaceBetween: 0,
						loop: true,
					},
				},
			});
		}
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
