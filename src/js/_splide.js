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
  
  const imagesCarousels = document.querySelectorAll('.images-carousel.splide');
  imagesCarousels.forEach(imagesCarousel => {
    const splide = new Splide(imagesCarousel, {
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

    splide.on('mounted', () => destroyIfNotOverflowing(splide, imagesCarousel));

    splide.mount({AutoScroll});
  });

}