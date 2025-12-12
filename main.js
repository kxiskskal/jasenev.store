import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initForms } from './modules/forms.js';
import { initUI } from './modules/ui.js';
import { initFooterDate } from './modules/footer.js';

document.addEventListener('DOMContentLoaded', () => {
    // Ініціалізація всіх модулів
    initTheme();
    initNavigation();
    initForms();
    initUI();
    initFooterDate();

    console.log('Main.js завантажено, всі модулі працюють.');
});


// --- DOM PRACTICE (Можна потім видалити) ---

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        // 1. Знаходимо елемент з ціною (зазвичай це тег <p> або клас .price)
        // Шукаємо параграф, який містить "грн"
        const priceElement = Array.from(card.querySelectorAll('p')).find(p => p.textContent.includes('грн'));

        if (priceElement) {
            // Захист від повторного додавання (якщо скрипт запуститься двічі)
            if (card.querySelector('.new-price')) return;

            // 2. Отримуємо чисту цифру (видаляємо пробіли та "грн")
            const currentPriceText = priceElement.textContent;
            // "4 750 грн" -> "4750"
            const originalPrice = parseInt(currentPriceText.replace(/\D/g, ''));

            // 3. Розраховуємо знижку (наприклад, 20%)
            const discountPercent = 20;
            const newPrice = Math.floor(originalPrice * (1 - discountPercent / 100));

            // Форматуємо числа з пробілами (4750 -> 4 750)
            const formatPrice = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

            // 4. Замінюємо HTML всередині елемента ціни
            priceElement.innerHTML = `
                <div class="price-container">
                    <span class="old-price">${formatPrice(originalPrice)} грн</span>
                    <span class="new-price">${formatPrice(newPrice)} грн</span>
                </div>
            `;
            
            // 5. (Бонус) Додаємо стікер "SALE" на картинку
            const imageContainer = card.querySelector('.card-image') || card; // Або на саму картку
            if (imageContainer.style.position !== 'relative') {
                imageContainer.style.position = 'relative';
            }
            
            const badge = document.createElement('div');
            badge.classList.add('sale-badge');
            badge.textContent = `-${discountPercent}%`;
            card.prepend(badge); // Додаємо на початок картки
        }
    });
    
    console.log('DOM: Знижки застосовано!');
});