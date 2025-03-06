export function counter() {
  const counters = document.querySelectorAll('.counter');

  const animateCounter = (counter) => {
    const target = +counter.dataset.target; // Получаем конечное значение
    const increment = target / 70; // Скорость заполнения

    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current); // Округляем до ближайшего целого
        requestAnimationFrame(updateCounter); // Продолжаем анимацию
      } else {
        counter.textContent = target; // Устанавливаем конечное значение
      }
    };

    updateCounter();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        animateCounter(counter);
        observer.unobserve(counter); // Отключаем наблюдение после запуска анимации
      }
    });
  }, { threshold: 0.5 }); // Половина блока должна быть видна

  counters.forEach(counter => {
    observer.observe(counter);
  });
}
