export function headerNav() {
  // Находим все секции, указанные в href меню
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';

    // Проверяем, какая секция в области видимости
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // Немного выше для учета хедера
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    // Проверяем, достиг ли пользователь низа страницы
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // Находим последнюю секцию, если она есть
      const lastSection = Array.from(sections).reverse().find(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = section.offsetTop + section.offsetHeight;
        return sectionBottom <= document.body.offsetHeight;
      });

      if (lastSection) {
        currentSection = lastSection.getAttribute('id');
      }
    }

    // Обновляем класс активности в меню
    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href').substring(1); // Убираем #
      const parentItem = link.parentElement;

      if (linkHref === currentSection) {
        parentItem.classList.add('header__nav-item--active');
      } else {
        parentItem.classList.remove('header__nav-item--active');
      }
    });
  });

  const header = document.querySelector('.header');
  if (header) {
    const headerBurgerBtn = document.querySelector('.header__burger-btn');
    document.addEventListener('click', (e) => {
      if (header.classList.contains('header--burger-active')) {
        if (!e.target.closest('.header') || e.target.closest('.header__nav-link')) {
          headerBurgerBtn?.click();
        }
      }
    })
  }
}
