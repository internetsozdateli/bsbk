export function imagesCarousel() {
  const carousel = document.querySelector('.images-carousel');

  if (carousel) {
    // Получаем ссылки на изображения из data-src
    const srcList = carousel.dataset.src.split(',').map(src => src.trim());

    // Получаем размер 1rem в пикселях
    const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const targetHeight = 5 * remToPx; // 5rem в пикселях для высоты

    // Загружаем изображения
    Promise.all(srcList.map(loadImage)).then((images) => {
      // Масштабируем изображения до высоты 5rem и рассчитываем их ширины
      const scaledImages = images.map(img => {
        const scale = targetHeight / img.height; // Масштабное соотношение для высоты
        return {
          element: img,
          width: img.width * scale, // Новая ширина пропорциональна масштабу
          height: targetHeight // Высота фиксирована как 5rem
        };
      });

      // Рассчитываем размеры финальной картинки
      const totalWidth = scaledImages.reduce((width, img) => width + img.width, 0) + (scaledImages.length - 1) * remToPx * 3; // Общая ширина с отступами
      const canvasHeight = targetHeight;

      // Создаём canvas
      const canvas = document.createElement('canvas');
      canvas.width = totalWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');

      // Рисуем изображения на canvas с отступами справа
      let x = 0; // Координата X для рисования
      scaledImages.forEach(img => {
        ctx.drawImage(img.element, x, 0, img.width, img.height); // Рисуем изображение с новой шириной и высотой
        x += img.width + remToPx * 3; // Добавляем отступ справа
      });

      // Получаем data URL результата
      const dataURL = canvas.toDataURL();

      // Устанавливаем результат как фон для блока
      carousel.style.backgroundImage = `url(${dataURL})`;
      carousel.style.backgroundRepeat = 'repeat-x'; // Повтор по горизонтали
      carousel.style.backgroundSize = `${canvas.width}px auto`; // Размер с учётом ширины canvas
      carousel.style.height = `${targetHeight}px`; // Устанавливаем высоту блока

      // Добавляем анимацию для плавного сдвига background-position-x
      const animationName = 'scrollBackground';
      const styleSheet = document.styleSheets[0] || document.head.appendChild(document.createElement('style')).sheet;

      const keyframes = `
        @keyframes ${animationName} {
          0% {
            background-position-x: 0;
          }
          100% {
            background-position-x: -${canvas.width}px;
          }
        }
      `;

      // Добавляем ключевые кадры анимации в стили
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

      // Применяем анимацию
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
