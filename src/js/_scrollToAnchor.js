export function scrollToAnchor() {
  // Находим все ссылки, у которых href начинается с #
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault(); // Отключаем стандартное поведение (изменение URL)

      // Получаем ID целевого элемента из href
      const targetId = link.getAttribute('href').substring(1); // Убираем #
      const targetElement = document.getElementById(targetId);

      // Проверяем, существует ли целевой элемент
      if (targetElement) {
        // Плавно скроллим к целевому элементу
        targetElement.scrollIntoView({
          behavior: 'smooth', // Плавный переход
          block: 'start', // Скроллим к началу элемента
        });
      }
    });
  });
}
