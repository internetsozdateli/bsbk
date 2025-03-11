import { Splide } from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

export function splide() {

  // Функция для уничтожение слайдера в случае отсутсвия переполнения
  const destroyIfNotOverflowing = (splide, slider) => {
    const slides = slider.querySelectorAll('.splide__slide');
    if (slides.length <= splide.options.perPage) {
      splide.destroy();
    }
  };
  
  const imagesCarouselSliders = document.querySelectorAll('.images-carousel.splide');
  imagesCarouselSliders.forEach(imagesCarouselSlider => {
    const splide = new Splide(imagesCarouselSlider, {
      arrows : false,
      pagination : false,
      type   : 'loop',
      drag   : 'free',
      autoWidth: true,
      gap: '12.94rem',
      autoScroll: {
        speed: 1,
      },
      breakpoints: {
        768: {
          gap: '4.06rem',
        },
        480: {
          gap: '3.05rem',
        },
      }
    });

    splide.on('mounted', () => destroyIfNotOverflowing(splide, imagesCarouselSlider));

    splide.mount({AutoScroll});
  });

  const cardsSliders = document.querySelectorAll('.cards.splide');
  cardsSliders.forEach(cardsSlider => {
    const splide = new Splide(cardsSlider, {
      arrows : false,
      pagination : false,
      perPage    : 3,
      gap: '0.88rem',
      breakpoints: {
        768: {
          perPage : 2.2,
        },
        480: {
          perPage : 1.5,
        },
        360: {
          perPage : 1.2,
        },
      }
    });

    splide.on('mounted', () => destroyIfNotOverflowing(splide, cardsSlider));

    splide.mount();
  });

}