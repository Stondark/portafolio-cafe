document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. Encabezado Dinámico (Scroll Effect)
    // ==========================================================================
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar al cargar para verificar posición inicial


    // ==========================================================================
    // 2. Navegación Móvil (Drawer Menu)
    // ==========================================================================
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileClose = document.querySelector('.mobile-nav-close');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const openMenu = () => {
        mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevenir scroll al estar abierto
    };

    const closeMenu = () => {
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = ''; // Restaurar scroll
    };

    mobileToggle.addEventListener('click', openMenu);
    mobileClose.addEventListener('click', closeMenu);

    // Cerrar menú al hacer clic en un enlace de navegación
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    // ==========================================================================
    // 3. Resaltado Activo del Menú al Hacer Scroll (Intersection Observer)
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Activar cuando esté en la parte central
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));


    // ==========================================================================
    // 4. Acordeón de Preguntas Frecuentes (FAQs)
    // ==========================================================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Cerrar todos los demás acordeones activos
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Alternar estado actual
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });


    // ==========================================================================
    // 5. Validación del Formulario de Contacto
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const checkField = (field) => {
        const group = field.closest('.form-group');
        let isValid = true;

        if (field.type === 'email') {
            isValid = validateEmail(field.value.trim());
        } else {
            isValid = field.value.trim() !== '';
        }

        if (isValid) {
            group.classList.remove('invalid');
        } else {
            group.classList.add('invalid');
        }

        return isValid;
    };

    // Validar en tiempo real al escribir o salir del campo
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.closest('.form-group').classList.contains('invalid')) {
                checkField(input);
            }
        });
        input.addEventListener('blur', () => {
            checkField(input);
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isFormValid = true;
        inputs.forEach(input => {
            const isFieldValid = checkField(input);
            if (!isFieldValid) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Simulamos envío y cargamos el estado de éxito con animación
            contactForm.classList.add('hidden');
            formSuccess.classList.add('active');
            
            // Opcional: imprimir en consola los datos simulados
            console.log('Formulario enviado:', {
                nombre: contactForm.name.value,
                correo: contactForm.email.value,
                mensaje: contactForm.message.value
            });
        }
    });


    // ==========================================================================
    // 6. Formulario del Boletín Informativo (Newsletter)
    // ==========================================================================
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterError = document.querySelector('.newsletter-error');
    const newsletterSuccess = document.querySelector('.newsletter-success');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailVal = newsletterEmail.value.trim();
        newsletterError.style.display = 'none';
        newsletterSuccess.style.display = 'none';

        if (validateEmail(emailVal)) {
            newsletterSuccess.style.display = 'block';
            newsletterEmail.value = '';
            console.log('Newsletter suscrito:', emailVal);
        } else {
            newsletterError.style.display = 'block';
        }
    });
});
