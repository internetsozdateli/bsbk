export function expandableList() {
  // Находим все элементы с классом expandable-list
  const expandableLists = document.querySelectorAll('.expandable-list');

  expandableLists.forEach(list => {
    // Считываем значение data-count
    const itemCount = parseInt(list.dataset.count, 10);

    // Находим все элементы с классом expandable-list__item внутри текущего списка
    const items = list.querySelectorAll('.expandable-list__item');

    // Добавляем класс expandable-list__item--hidden ко всем элементам, кроме первых itemCount
    items.forEach((item, index) => {
      if (index >= itemCount) {
        item.classList.add('expandable-list__item--hidden');
      }
    });

    // Добавляем обработчик клика для кнопки
    const button = list.querySelector('.expandable-list__btn');
    if (button) {
      button.addEventListener('click', () => {
        // Проверяем, все ли элементы уже показаны
        const allShown = list.classList.contains('expandable-list--all');

        if (allShown) {
          // Если все элементы показаны, скрываем лишние элементы
          items.forEach((item, index) => {
            if (index >= itemCount) {
              item.classList.add('expandable-list__item--hidden');
            }
          });

          // Убираем класс expandable-list--all
          list.classList.remove('expandable-list--all');

          // Скроллим к верхнему элементу
          items[0].scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        } else {
          // Находим первый скрытый элемент
          const hiddenItem = list.querySelector('.expandable-list__item--hidden');

          if (hiddenItem) {
            // Убираем класс expandable-list__item--hidden
            hiddenItem.classList.remove('expandable-list__item--hidden');

            // Скроллим к новому элементу
            hiddenItem.scrollIntoView({
              behavior: 'smooth', // Плавный скролл
              block: 'center', // Центрируем элемент
            });
          }

          // Если больше нет скрытых элементов, добавляем класс expandable-list--all
          if (!list.querySelector('.expandable-list__item--hidden')) {
            list.classList.add('expandable-list--all');
          }
        }
      });
    }
  });
}
