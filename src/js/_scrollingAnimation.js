import { Skroll } from './vendors/skroll.min.js';

export function scrollingAnimation() {
  new Skroll()
    .add(".hero-section__title",{
      animation:"fadeInUp",
      delay:120,
      duration:800,
      wait:250
    })
    .add(".brands-section__promos .promos__item",{
      animation:"slideInLeft",
      delay:80,
      duration:800
    })
    .add(".chess-content__item-title",{
      animation:"slideInLeft",
      delay:80,
      duration:800
    })
    // .add(".section__title",{
    //   animation:"fadeInDown",
    //   delay:120,
    //   duration:600,
    //   wait:250
    // })
    .add(".border-blocks__item",{
      animation:"slideInLeft",
      delay:80,
      duration:800
    })
    .init();
}