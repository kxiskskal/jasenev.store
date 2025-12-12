export function initFooterDate() {
    const footer = document.querySelector('footer .container');
    
    if (footer) {
        if (!footer.querySelector('.footer-date')) {
            const dateSpan = document.createElement('div');
            dateSpan.classList.add('footer-date');
            
            // Стилізація
            dateSpan.style.marginTop = '15px';
            dateSpan.style.color = '#e0e0e0';
            dateSpan.style.textAlign = 'center';
            dateSpan.style.fontFamily = 'monospace';
            dateSpan.style.fontSize = '14px';

            footer.append(dateSpan);

            // --- ФУНКЦІЯ ОНОВЛЕННЯ ЧАСУ ---
            function updateTime() {
                const now = new Date();
                const options = { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit' // Додали секунди, щоб бачити рух
                };
                
                const dateString = now.toLocaleString('uk-UA', options);
                const finalString = dateString.charAt(0).toUpperCase() + dateString.slice(1);

                dateSpan.innerHTML = `<span style="opacity: 0.6">Зараз:</span> <strong>${finalString}</strong>`;
            }

            // 1. Запускаємо один раз одразу (щоб не чекати 1 секунду до появи тексту)
            updateTime();

            // 2. Запускаємо "таймер", який смикає цю функцію кожні 1000 мілісекунд (1 сек)
            setInterval(updateTime, 1000);
        }
    }
}