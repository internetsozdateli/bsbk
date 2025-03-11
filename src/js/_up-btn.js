export function upBtn() {
  const upButton = document.querySelector('.up-btn');

  // Проверяем наличие кнопки на странице
  if (!upButton) return;

  // Обработчик скролла
  window.addEventListener('scroll', () => {
    // Проверяем, достиг ли пользователь конца страницы
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500;

    // Добавляем или убираем класс в зависимости от положения
    if (isAtBottom) {
      upButton.classList.add('up-btn--show');
    } else {
      upButton.classList.remove('up-btn--show');
    }
  });

  // Обработчик клика по кнопке
  upButton.addEventListener('click', () => {
    // Плавно скроллим наверх
    window.scrollTo({
      top: 0, // Скроллим к верхнему краю страницы
      behavior: 'smooth', // Плавная прокрутка
    });
  });
}
