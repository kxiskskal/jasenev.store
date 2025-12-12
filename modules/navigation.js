export function initNavigation() {
    // Бургер-меню
    const burgerBtn = document.querySelector('.burger-btn');
    const nav = document.querySelector('.main-nav');
    
    if (burgerBtn) {
        burgerBtn.addEventListener('click', () => {
            nav.classList.toggle('open');
            burgerBtn.classList.toggle('active');
        });
    }

    // Підсвітка меню при наведенні
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.classList.add('nav-hover-active');
        });
        link.addEventListener('mouseleave', () => {
            link.classList.remove('nav-hover-active');
        });
    });
}