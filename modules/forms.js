export function initForms() {
    initPasswordToggle();
    initContactForm(); 
    initAuthForms();
}

// 1. ПЕРЕМИКАЧ ПАРОЛЯ
function initPasswordToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const wrapper = this.closest('.password-wrapper');
            const input = wrapper?.querySelector('input');
            if (!input) return;
            const isPassword = input.getAttribute('type') === 'password';
            input.setAttribute('type', isPassword ? 'text' : 'password');
            this.textContent = isPassword ? '◎' : '◉';
        });
    });
}

// --- УТИЛІТИ ---
const clearErrors = (form) => {
    form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
    form.querySelectorAll('.error-msg').forEach(el => {
        el.textContent = '';
        el.classList.remove('active');
    });
    const msgContainer = form.querySelector('.form-messages');
    if (msgContainer) msgContainer.innerHTML = '';
};

const showFieldError = (input, message) => {
    if (!input) return; // Якщо інпут не знайдено - виходимо, щоб не було помилки в консолі
    
    input.classList.add('invalid');
    
    // Шукаємо span для помилки
    // 1. Спочатку пробуємо знайти за ID (наприклад, id="name" -> шукаємо span у якого id="name" - це погана практика, але у вас так в HTML)
    // 2. Або шукаємо просто поруч
    let errorSpan = input.parentElement.querySelector('.error-msg');
    
    // Якщо не знайшли поруч, шукаємо у батьківському .form-group
    if (!errorSpan) {
        errorSpan = input.closest('.form-group')?.querySelector('.error-msg');
    }
    
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.classList.add('active');
    }
};

const showMessage = (form, text, isSuccess = true) => {
    let container = form.querySelector('.form-messages');
    if (!container) {
        container = document.createElement('div');
        container.className = 'form-messages';
        form.appendChild(container);
    }
    container.innerHTML = `
        <div class="message" style="
            margin-top: 15px; 
            padding: 15px; 
            border-radius: 4px; 
            text-align: center; 
            background-color: ${isSuccess ? 'rgba(204, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'}; 
            border: 1px solid ${isSuccess ? '#ccff00' : '#ff3333'}; 
            color: ${isSuccess ? '#ccff00' : '#ff3333'};">
            ${text}
        </div>
    `;
};

// 2. КОНТАКТНА ФОРМА (Formspree)
function initContactForm() {
    const contactForm = document.querySelector('.contact-form:not(.login-form):not(.register-form)');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        // Тут логіка для контактів (залишаємо як було)
    });
}

// 3. АВТОРИЗАЦІЯ (ВИПРАВЛЕНО ПІД ВАШ HTML)
function initAuthForms() {
    const forms = document.querySelectorAll('.login-form, .register-form');

    forms.forEach(form => {
        // ЗАХИСТ: Переконуємося, що це точно форма
        if (form.tagName !== 'FORM') return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            clearErrors(form);

            const formData = new FormData(form);
            const isRegister = form.classList.contains('register-form');
            let hasError = false;

            // Зчитуємо дані (використовуємо імена з ВАШОГО HTML)
            const email = (formData.get('email') || formData.get('user_email') || '').trim();
            const password = (formData.get('password') || formData.get('user_password') || '').trim();

            // 1. Валідація Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                // Шукаємо інпут: name="email" АБО name="user_email"
                const input = form.querySelector('[name="email"]') || form.querySelector('[name="user_email"]');
                showFieldError(input, "Введіть коректний email");
                hasError = true;
            }

            // 2. Валідація Пароля
            if (password.length < 6) {
                const input = form.querySelector('[name="password"]') || form.querySelector('[name="user_password"]');
                showFieldError(input, "Пароль має бути від 6 символів");
                hasError = true;
            }

            // 3. Реєстрація
            if (isRegister) {
                const name = (formData.get('name') || '').trim();
                const confirm = (formData.get('password_confirm') || '').trim();

                if (name.length < 3) {
                    showFieldError(form.querySelector('[name="name"]'), "Ім'я мінімум 3 символи");
                    hasError = true;
                }
                
                if (password !== confirm) {
                    showFieldError(form.querySelector('[name="password_confirm"]'), "Паролі не співпадають");
                    hasError = true;
                }
                
                // ЛР: Вивід у консоль
                console.log("REGISTER DATA:", { name, email, password });
            } else {
                // ЛР: Вивід у консоль
                console.log("LOGIN DATA:", { email, password });
            }

            if (hasError) return;

            // --- УСПІХ ---
            if (isRegister) {
                // Анімація успіху
                form.innerHTML = `
                    <div class="success-animation" style="text-align: center; padding: 20px;">
                        <div style="font-size: 50px; color: #ccff00;">✔</div>
                        <h3 style="color: #fff; margin: 10px 0;">Welcome to the Club</h3>
                        <p style="color: #888;">Акаунт створено.</p>
                        <a href="login.html" class="btn" style="display: inline-block; margin-top: 15px; background: #ccff00; color: #000; text-decoration: none; padding: 10px 20px; border-radius: 4px;">Увійти зараз</a>
                    </div>
                `;
                
                // Автоперехід
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000);

            } else {
                showMessage(form, "Вхід успішний!", true);
                localStorage.setItem('isLoggedIn', 'true');
                setTimeout(() => window.location.href = 'index.html', 1500);
            }
        });
    });
}