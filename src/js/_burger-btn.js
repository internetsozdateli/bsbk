export function burgerBtn() {
  const burgerBtns = document.querySelectorAll('.burger-btn');
  burgerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Добавляем/убираем у кнопки класс "burger-btn--active"
      btn.classList.toggle('burger-btn--active');

      // Получаем селектор из data-target
      const targetSelector = btn.dataset.target;
      const targetElement = document.querySelector(targetSelector);

      if (targetElement) {
        // Получаем класс из data-class
        const targetClass = btn.dataset.class;
        // Добавляем/убираем класс у целевого элемента
        const classAdded = targetElement.classList.toggle(targetClass);

        // Если класс добавился, скроллим к целевому элементу
        if (classAdded) {
          targetElement.scrollIntoView({
            behavior: 'smooth', // Плавный переход
            block: 'start', // Скроллим к началу элемента
          });
        }
      }
    });
  });
}
