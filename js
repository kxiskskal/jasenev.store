document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.querySelector('.burger-btn');
    const nav = document.querySelector('.main-nav');

    if (burgerBtn) {
        burgerBtn.addEventListener('click', () => {
            nav.classList.toggle('open');
            burgerBtn.classList.toggle('active');
        });
    }
    const toggleButtons = document.querySelectorAll('.toggle-password');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
          
            const input = this.previousElementSibling;
            
            if (input) {
                
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                
                
                this.textContent = type === 'password' ? '◉' : '◎';
            }
        });
    });


    const inputs = document.querySelectorAll('.contact-form input');

    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });
        
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });

    function validateInput(input) {
        const formGroup = input.closest('.form-group');
        const errorSpan = formGroup.querySelector('.error-msg');

        if (errorSpan) {
            if (!input.checkValidity()) {
                input.classList.add('invalid');
                errorSpan.textContent = input.validationMessage;
                errorSpan.classList.add('active');
            } else {
                input.classList.remove('invalid');
                errorSpan.textContent = '';
                errorSpan.classList.remove('active');
            }
        }
    }

    function validateInput(input) {
        const formGroup = input.closest('.form-group');
        const errorSpan = formGroup.querySelector('.error-msg');

        input.setCustomValidity('');

        if (input.name === 'name') {
            // Цей вираз шукає будь-який символ, який НЕ є літерою, пробілом або дефісом
            const invalidNameChars = /[^a-zA-Zа-яА-ЯіїєґІЇЄҐ\s\-']/;
            
            if (invalidNameChars.test(input.value)) {
                input.setCustomValidity('Ім\'я має містити тільки літери.');
            }
        }
        if (input.type === 'password' || input.name === 'password' || input.name === 'password_confirm') {
            const cyrillicPattern = /[а-яА-ЯіїєґІЇЄҐёЁыЫэЭъЪ]/;
            
            if (cyrillicPattern.test(input.value)) {
                input.setCustomValidity('Пароль має бути тільки англійською (латиницею).');
            }
        }
        if (input.name === 'password_confirm') {
            const passwordField = document.querySelector('input[name="password"]');
            if (passwordField && input.value !== passwordField.value) {
                input.setCustomValidity('Паролі не співпадають.');
            }
        }
        if (errorSpan) {
            if (!input.checkValidity()) {
                // ПОМИЛКА Є
                input.classList.add('invalid');
                // input.validationMessage тепер покаже наш текст про "англійську мову"
                errorSpan.textContent = input.validationMessage;
                errorSpan.classList.add('active');
            } else {
                input.classList.remove('invalid');
                errorSpan.textContent = '';
                errorSpan.classList.remove('active');
            }
        }
    }
});
