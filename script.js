document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const faqItems = document.querySelectorAll('.faq-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const bookingForm = document.getElementById('booking-form');
    const header = document.querySelector('.glass-nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    document.querySelectorAll('a[href="#programmes"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const programmesSection = document.getElementById('programmes');
            if (programmesSection) {
                const rect = programmesSection.getBoundingClientRect();
                const sectionTop = window.pageYOffset + rect.top;
                window.scrollTo({
                    top: Math.max(0, sectionTop),
                    behavior: 'smooth'
                });
            }
        });
    });
    
    document.querySelectorAll('button, .btn').forEach(button => {
        if (button.textContent.includes('Voir les programmes')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const programmesSection = document.getElementById('programmes');
                if (programmesSection) {
                    const rect = programmesSection.getBoundingClientRect();
                    const sectionTop = window.pageYOffset + rect.top;
                    window.scrollTo({
                        top: Math.max(0, sectionTop),
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        const isAtBottom = currentScroll + windowHeight >= documentHeight - 100;
        
        if (isAtBottom) {
            header.classList.add('hidden');
        } else if (currentScroll > 50) {
            header.classList.add('scrolled');
            if (currentScroll > lastScrollTop && currentScroll > 50) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('hidden');
        }
        
        lastScrollTop = currentScroll;
        updateLogoForCurrentSection();
    });
    
    function updateLogoForCurrentSection() {
        const logoTitle = document.querySelector('.logo h1');
        const sections = ['accueil', 'transformations', 'programmes', 'temoignages', 'contact'];
        const scrollPosition = window.scrollY + 100;
        
        let currentSection = 'accueil';
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            }
        });
        
        sections.forEach(sectionId => {
            logoTitle.classList.remove(`section-${sectionId}`);
        });
        logoTitle.classList.add(`section-${currentSection}`);
    }
    
    updateLogoForCurrentSection();
    
    function handle3DScrollEffects() {
        const elements = document.querySelectorAll('.glass-card, .programme-card, .testimonial-card, .hero-image, .section-header');
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        
        elements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const elementCenter = elementTop + (elementHeight / 2);
            const screenCenter = scrollTop + (windowHeight / 2);
            const distance = Math.abs(elementCenter - screenCenter);
            const maxDistance = windowHeight / 2;
            
            if (distance < maxDistance * 0.8) {
                element.classList.add('scroll-3d-active');
            } else {
                element.classList.remove('scroll-3d-active');
            }
        });
    }
    
    window.addEventListener('scroll', handle3DScrollEffects);
    handle3DScrollEffects();
    
    let lastScrollDirection = 'down';
    let lastScrollY = window.scrollY;
    
    function handleDynamicShadows() {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        if (scrollDirection !== lastScrollDirection) {
            lastScrollDirection = scrollDirection;
        }
        
        const elements = document.querySelectorAll('.glass-card, .programme-card, .testimonial-card, .hero-content');
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        
        elements.forEach(element => {
            if (!element.classList.contains('dynamic-shadow')) {
                element.classList.add('dynamic-shadow');
            }
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const elementBottom = elementTop + elementHeight;
            const viewportTop = scrollTop;
            const viewportBottom = scrollTop + windowHeight;
            const visibleTop = Math.max(elementTop, viewportTop);
            const visibleBottom = Math.min(elementBottom, viewportBottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const visibilityRatio = visibleHeight / elementHeight;
            element.classList.remove('depth-1', 'depth-2', 'depth-3', 'depth-4', 'depth-max', 'shadow-up', 'shadow-down');
            if (visibilityRatio > 0) {
                if (visibilityRatio >= 0.8) {
                    element.classList.add('depth-max');
                } else if (visibilityRatio >= 0.6) {
                    element.classList.add('depth-4');
                } else if (visibilityRatio >= 0.4) {
                    element.classList.add('depth-3');
                } else if (visibilityRatio >= 0.2) {
                    element.classList.add('depth-2');
                } else {
                    element.classList.add('depth-1');
                }
                element.classList.add(`shadow-${scrollDirection}`);
            }
        });
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', handleDynamicShadows);
    handleDynamicShadows();

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        }
    });

    let currentSlide = 0;
    function showSlide(index) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        if (testimonialCards[index]) {
            testimonialCards[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
        currentSlide = index;
    }
    showSlide(0);
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let newIndex = currentSlide + 1;
            if (newIndex >= testimonialCards.length) {
                newIndex = 0;
            }
            showSlide(newIndex);
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) {
                newIndex = testimonialCards.length - 1;
            }
            showSlide(newIndex);
        });
    }
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(bookingForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="glass-card success-card">
                    <i class="fas fa-check-circle"></i>
                    <h3>Réservation envoyée !</h3>
                    <p>Merci pour votre demande. Nous vous contacterons rapidement pour confirmer votre appel.</p>
                    <button class="btn btn-primary close-message">Fermer</button>
                </div>
            `;
            document.body.appendChild(successMessage);
            bookingForm.reset();
            const closeBtn = successMessage.querySelector('.close-message');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    document.body.removeChild(successMessage);
                });
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();

    function initializeEngagementTracking() {
        let engagementScore = 0;
        let interactionCount = 0;
        let timeOnPage = 0;
        let scrollDepth = 0;
        const startTime = Date.now();
        setInterval(() => {
            timeOnPage = (Date.now() - startTime) / 1000;
            updateEngagementLevel();
        }, 1000);
        function trackScrollDepth() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScrollDepth = (scrollTop / docHeight) * 100;
            scrollDepth = Math.max(scrollDepth, currentScrollDepth);
        }
        function trackInteraction() {
            interactionCount++;
            updateEngagementLevel();
        }
        function updateEngagementLevel() {
            const timeScore = Math.min(timeOnPage / 2, 30);
            const interactionScore = Math.min(interactionCount * 5, 25);
            const scrollScore = Math.min((scrollDepth / 80) * 25, 25);
            const hoverScore = Math.min(hoverTime / 5, 20);
            engagementScore = timeScore + interactionScore + scrollScore + hoverScore;
            const body = document.body;
            body.classList.remove('engagement-low', 'engagement-medium', 'engagement-high', 'engagement-max');
            if (engagementScore >= 80) {
                body.classList.add('engagement-max');
            } else if (engagementScore >= 60) {
                body.classList.add('engagement-high');
            } else if (engagementScore >= 30) {
                body.classList.add('engagement-medium');
            } else {
                body.classList.add('engagement-low');
            }
        }
        let hoverTime = 0;
        let hoverStartTime = 0;
        window.addEventListener('scroll', () => {
            trackScrollDepth();
            updateEngagementLevel();
        });
        document.addEventListener('click', trackInteraction);
        const interactiveElements = document.querySelectorAll('.glass-card, .btn, .timeline-milestone, .programme-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                hoverStartTime = Date.now();
            });
            element.addEventListener('mouseleave', () => {
                if (hoverStartTime) {
                    hoverTime += (Date.now() - hoverStartTime) / 1000;
                    hoverStartTime = 0;
                    updateEngagementLevel();
                }
            });
        });
        updateEngagementLevel();
    }
    initializeEngagementTracking();

    window.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        const bg = document.querySelector('.background-gradient');
        if (bg) {
            bg.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});
