export function initUI() {
    // 1. Тінь для карток
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
    });

    // 2. Додатковий копірайт в Main
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
        const newElement = document.createElement('p');
        newElement.textContent = "© 2025 Jasenev Store. Всі права захищено.";
        newElement.style.textAlign = "center";
        newElement.style.color = "#888";
        newElement.style.marginTop = "20px";
        mainContainer.append(newElement);
    }

    // 3. Акордеон
    const accordionBtn = document.getElementById('accordion-btn');
    const accordionText = document.getElementById('accordion-text');
    if (accordionBtn && accordionText) {
        accordionBtn.addEventListener('click', () => {
            accordionText.classList.toggle('show');
            if (accordionText.classList.contains('show')) {
                accordionBtn.textContent = "Згорнути";
            } else {
                accordionBtn.textContent = "Показати більше";
            }
        });
    }

    // 4. Зміна шрифту клавішами
    initFontResizer();
}

function initFontResizer() {
    let currentFontSize = 100; // Початковий розмір у %

    window.addEventListener('keydown', (event) => {
        // Перевіряємо, чи натиснуто стрілки
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            
            // 1. ВАЖЛИВО: БЛОКУЄМО СКРОЛ СТОРІНКИ
            event.preventDefault(); 

            // 2. Логіка зміни розміру
            if (event.key === 'ArrowUp') {
                if (currentFontSize < 200) currentFontSize += 5; // Обмеження макс. 200%
            } else if (event.key === 'ArrowDown') {
                if (currentFontSize > 50) currentFontSize -= 5;  // Обмеження мін. 50%
            }

            // 3. Застосовуємо стиль
            document.body.style.fontSize = currentFontSize + '%';
            
            // 4. Показуємо красиве повідомлення (перевіряємо чи існує функція)
            if (typeof showZoomNotification === 'function') {
                showZoomNotification(currentFontSize);
            } else {
                // Якщо функції немає - додаємо її тут же або просто логуємо
                console.log(`Zoom: ${currentFontSize}%`);
                
            }
        }
    });
}

// Додати в кінець файлу js/modules/ui.js

function showZoomNotification(size) {
    let notifyBox = document.querySelector('.zoom-notification');
    
    if (!notifyBox) {
        notifyBox = document.createElement('div');
        notifyBox.className = 'zoom-notification';
        // Стилі для повідомлення
        Object.assign(notifyBox.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(18, 18, 18, 0.95)',
            border: '1px solid #ccff00',
            color: '#ccff00',
            padding: '20px 40px',
            fontFamily: 'monospace',
            fontSize: '32px',
            fontWeight: 'bold',
            zIndex: '9999',
            pointerEvents: 'none',
            opacity: '0',
            transition: 'opacity 0.2s',
            boxShadow: '0 0 20px rgba(204, 255, 0, 0.2)'
        });
        document.body.append(notifyBox);
    }

    notifyBox.textContent = `ZOOM: ${size}%`;
    notifyBox.style.opacity = '1';

    clearTimeout(window.zoomTimer);
    window.zoomTimer = setTimeout(() => {
        notifyBox.style.opacity = '0';
    }, 800);
}