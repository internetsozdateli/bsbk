import '../scss/style.scss'

import { burgerBtn } from './_burger-btn.js';
import { counter } from './_counter.js';
import { fancyboxInit } from './_fancyboxInit.js';
import { text } from './_text.js';
// import { imagesCarousel } from './_images-carousel.js';
import { splide } from './_splide.js';
import { expandableList } from './_expandable-list.js';
import { scrollToAnchor } from './_scrollToAnchor.js';
import { headerNav } from './_headerNav.js';
import { upBtn } from './_up-btn.js';

document.addEventListener( 'DOMContentLoaded', function() {
    burgerBtn();
    counter();
    fancyboxInit();
    text();
    // imagesCarousel();
    splide();
    expandableList();
    scrollToAnchor();
    headerNav();
    upBtn();
})