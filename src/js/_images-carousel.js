export function imagesCarousel() {
  const carousel = document.querySelector('.images-carousel');

  if (carousel) {
    // Получаем ссылки на изображения из data-src
    const srcList = carousel.dataset.src.split(',').map(src => src.trim());

    // Получаем размер 1rem в пикселях
    const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const spacing = 3 * remToPx; // 3rem в пикселях для правого отступа

    // Загружаем изображения
    Promise.all(srcList.map(loadImage)).then((images) => {
      // Рассчитываем размеры финальной картинки
      const totalWidth = images.reduce((width, img) => width + img.width, 0) + (images.length - 1) * spacing + spacing; // Общая ширина с правым отступом
      const maxHeight = Math.max(...images.map(img => img.height)); // Максимальная высота из всех изображений

      // Создаём canvas
      const canvas = document.createElement('canvas');
      canvas.width = totalWidth;
      canvas.height = maxHeight;
      const ctx = canvas.getContext('2d');

      // Рисуем изображения на canvas с отступами только справа
      let x = 0; // Координата X для рисования
      images.forEach(img => {
        ctx.drawImage(img, x, 0); // Рисуем изображение на текущей позиции
        x += img.width + spacing; // Добавляем отступ справа
      });

      // Получаем data URL результата
      const dataURL = canvas.toDataURL();

      // Устанавливаем результат как фон для блока
      carousel.style.backgroundImage = `url(${dataURL})`;
      carousel.style.backgroundRepeat = 'repeat no-repeat';

      // Добавляем анимацию для смещения background-position-x
      const animationName = 'scrollBackground';
      const styleSheet = document.styleSheets[0] || document.head.appendChild(document.createElement('style')).sheet;

      const keyframes = `
        @keyframes ${animationName} {
          0% {
            background-position-x: 0;
          }
          100% {
            background-position-x: -${totalWidth}px;
          }
        }
      `;

      // Добавляем ключевые кадры анимации в стиль
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

      // Применяем анимацию к блоку
      carousel.style.animation = `${animationName} 10s linear infinite`; // Длительность анимации — 10 секунд
    }).catch((error) => {
      console.error('Ошибка загрузки изображения:', error);
    });

    // Функция для загрузки изображения
    function loadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous'; // Для обработки кросс-доменных изображений
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Не удалось загрузить изображение: ${src}`));
        img.src = src;
      });
    }
  }
}
