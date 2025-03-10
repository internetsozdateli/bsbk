export function text() {
  const promoTexts = document.querySelectorAll('.text:has(.text__spoiler)');

  promoTexts.forEach((block) => {
    const textInner = block.querySelector('.text__inner');

    // Функция для установки количества строк или полного отображения текста
    const setLineClamp = () => {
      const desktopLines = block.dataset.spoilerDesktop ? parseInt(block.dataset.spoilerDesktop, 10) : null; // Линии для десктопа
      const tabletLines = block.dataset.spoilerTablet ? parseInt(block.dataset.spoilerTablet, 10) : null; // Линии для планшета
      const mobileLines = block.dataset.spoilerMobile ? parseInt(block.dataset.spoilerMobile, 10) : null; // Линии для мобильного

      let lines = desktopLines; // По умолчанию десктоп

      if (window.innerWidth < 769 && window.innerWidth >= 481) {
        lines = tabletLines;
      } else if (window.innerWidth < 481) {
        lines = mobileLines;
      }

      // Если атрибута нет или значение больше 0, отображаем текст
      if (lines === null || lines > 0) {
        textInner.style.display = '-webkit-box';
        textInner.style.webkitLineClamp = lines || 'unset'; // Убираем ограничение, если lines === null
      } else if (lines === 0) {
        // Если значение lines == 0, скрываем текст
        textInner.style.display = 'none';
      }
    };

    // Вызываем при загрузке и вешаем обработчик ресайза
    setLineClamp();
    window.addEventListener('resize', setLineClamp);
  });
}
