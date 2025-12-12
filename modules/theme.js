export function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Перевірка збереженої теми
    const savedTheme = localStorage.getItem('siteTheme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        if (themeBtn) themeBtn.textContent = "☼";
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('siteTheme', 'dark');
                themeBtn.textContent = "☼";
            } else {
                localStorage.setItem('siteTheme', 'light');
                themeBtn.textContent = " ☾";
            }
        });
    }
}