document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const faqItems = document.querySelectorAll('.faq-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const bookingForm = document.getElementById('booking-form');
    const header = document.querySelector('.glass-nav');

    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Custom scroll for programmes section
    document.querySelectorAll('a[href="#programmes"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Programmes link clicked');
            const programmesSection = document.getElementById('programmes');
            if (programmesSection) {
                const rect = programmesSection.getBoundingClientRect();
                const sectionTop = window.pageYOffset + rect.top;
                const sectionHeight = rect.height;
                const windowHeight = window.innerHeight;
                const scrollTo = sectionTop;
                
                console.log('Section top:', sectionTop, 'Section height:', sectionHeight, 'Scroll to:', scrollTo);
                
                window.scrollTo({
                    top: Math.max(0, scrollTo),
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Also handle clicks on buttons with text "Voir les programmes"
     document.querySelectorAll('button, .btn').forEach(button => {
         if (button.textContent.includes('Voir les programmes')) {
             button.addEventListener('click', function(e) {
                 e.preventDefault();
                 console.log('Programmes button clicked');
                 const programmesSection = document.getElementById('programmes');
                 if (programmesSection) {
                     const rect = programmesSection.getBoundingClientRect();
                     const sectionTop = window.pageYOffset + rect.top;
                     const sectionHeight = rect.height;
                     const windowHeight = window.innerHeight;
                     const scrollTo = sectionTop;
                     
                     console.log('Button - Section top:', sectionTop, 'Section height:', sectionHeight, 'Scroll to:', scrollTo);
                     
                     window.scrollTo({
                         top: Math.max(0, scrollTo),
                         behavior: 'smooth'
                     });
                 }
             });
         }
     });

    // Scroll Event for Header with fade effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Check if user is at the bottom of the page
        const isAtBottom = currentScroll + windowHeight >= documentHeight - 100;
        
        if (isAtBottom) {
            // Hide header when at bottom of page
            header.classList.add('hidden');
        } else if (currentScroll > 50) {
            header.classList.add('scrolled');
            
            // Hide header when scrolling down, show when scrolling up
            if (currentScroll > lastScrollTop && currentScroll > 50) {
                // Scrolling down - hide header
                header.classList.add('hidden');
            } else {
                // Scrolling up - show header
                header.classList.remove('hidden');
            }
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('hidden');
        }
        
        lastScrollTop = currentScroll;
        
        // Logo transformation based on current section
        updateLogoForCurrentSection();
    });
    
    // Logo transformation function
    function updateLogoForCurrentSection() {
        const logoTitle = document.querySelector('.logo h1');
        const sections = ['accueil', 'transformations', 'programmes', 'temoignages', 'contact'];
        const scrollPosition = window.scrollY + 100; // Offset for header height
        
        let currentSection = 'accueil'; // Default
        
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
        
        // Remove all section classes
        sections.forEach(sectionId => {
            logoTitle.classList.remove(`section-${sectionId}`);
        });
        
        // Add current section class
        logoTitle.classList.add(`section-${currentSection}`);
    }
    
    // Initialize logo on page load
    updateLogoForCurrentSection();
    
    // 3D Scroll Effects
    function handle3DScrollEffects() {
        const elements = document.querySelectorAll('.glass-card, .programme-card, .testimonial-card, .hero-image, .section-header');
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        
        elements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const elementCenter = elementTop + (elementHeight / 2);
            const screenCenter = scrollTop + (windowHeight / 2);
            
            // Calculate distance from screen center
            const distance = Math.abs(elementCenter - screenCenter);
            const maxDistance = windowHeight / 2;
            
            // Apply 3D effect when element is in the center portion of the screen
            if (distance < maxDistance * 0.8) {
                element.classList.add('scroll-3d-active');
            } else {
                element.classList.remove('scroll-3d-active');
            }
        });
    }
    
    // Add 3D effects to scroll event
    window.addEventListener('scroll', handle3DScrollEffects);
    
    // Initialize 3D effects on page load
    handle3DScrollEffects();
    
    // Dynamic Shadow Effects
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
            // Add dynamic-shadow class if not present
            if (!element.classList.contains('dynamic-shadow')) {
                element.classList.add('dynamic-shadow');
            }
            
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const elementBottom = elementTop + elementHeight;
            const viewportTop = scrollTop;
            const viewportBottom = scrollTop + windowHeight;
            
            // Calculate visibility percentage
            const visibleTop = Math.max(elementTop, viewportTop);
            const visibleBottom = Math.min(elementBottom, viewportBottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const visibilityRatio = visibleHeight / elementHeight;
            
            // Remove all depth classes
            element.classList.remove('depth-1', 'depth-2', 'depth-3', 'depth-4', 'depth-max', 'shadow-up', 'shadow-down');
            
            if (visibilityRatio > 0) {
                // Apply depth based on visibility and position
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
                
                // Add directional shadow based on scroll direction
                element.classList.add(`shadow-${scrollDirection}`);
            }
        });
        
        lastScrollY = currentScrollY;
    }
    
    // Add dynamic shadows to scroll event
    window.addEventListener('scroll', handleDynamicShadows);
    
    // Initialize dynamic shadows on page load
    handleDynamicShadows();

    // FAQ Accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Testimonial Slider
    let currentSlide = 0;
    
    function showSlide(index) {
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Scroll to the correct testimonial
        if (testimonialCards[index]) {
            testimonialCards[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
        
        currentSlide = index;
    }
    
    // Initialize slider
    showSlide(0);
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let newIndex = currentSlide + 1;
            if (newIndex >= testimonialCards.length) {
                newIndex = 0;
            }
            showSlide(newIndex);
        });
    }
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) {
                newIndex = testimonialCards.length - 1;
            }
            showSlide(newIndex);
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Booking Form Submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(bookingForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Here you would typically send the data to your server
            console.log('Form submitted with data:', formDataObj);
            
            // Show success message
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
            
            // Reset form
            bookingForm.reset();
            
            // Close success message
            const closeBtn = successMessage.querySelector('.close-message');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    document.body.removeChild(successMessage);
                });
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to nav links based on scroll position
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
    
    // Initialize active nav link
    setActiveNavLink();


    
    // User Engagement Tracking System
    function initializeEngagementTracking() {
        let engagementScore = 0;
        let interactionCount = 0;
        let timeOnPage = 0;
        let scrollDepth = 0;
        const startTime = Date.now();
        
        // Track time on page
        setInterval(() => {
            timeOnPage = (Date.now() - startTime) / 1000;
            updateEngagementLevel();
        }, 1000);
        
        // Track scroll depth
        function trackScrollDepth() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScrollDepth = (scrollTop / docHeight) * 100;
            scrollDepth = Math.max(scrollDepth, currentScrollDepth);
        }
        
        // Track interactions
        function trackInteraction() {
            interactionCount++;
            updateEngagementLevel();
        }
        
        // Calculate engagement level
        function updateEngagementLevel() {
            // Base score from time (max 30 points for 60+ seconds)
            const timeScore = Math.min(timeOnPage / 2, 30);
            
            // Interaction score (5 points per interaction, max 25)
            const interactionScore = Math.min(interactionCount * 5, 25);
            
            // Scroll score (max 25 points for 80%+ scroll)
            const scrollScore = Math.min((scrollDepth / 80) * 25, 25);
            
            // Hover/focus bonus (max 20 points)
            const hoverScore = Math.min(hoverTime / 5, 20);
            
            engagementScore = timeScore + interactionScore + scrollScore + hoverScore;
            
            // Apply engagement class to body
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
        
        // Track hover time
        let hoverTime = 0;
        let hoverStartTime = 0;
        
        // Add event listeners
        window.addEventListener('scroll', () => {
            trackScrollDepth();
            updateEngagementLevel();
        });
        
        // Track clicks on interactive elements
        document.addEventListener('click', trackInteraction);
        
        // Track hover on cards and buttons
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
        
        // Initial engagement level
        updateEngagementLevel();
    }
    
    // Initialize engagement tracking
    initializeEngagementTracking();

    // Add parallax effect to background
    window.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        document.querySelector('.background-gradient').style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // Add hover effect to glass cards
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px 0 rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.1)';
        });
    });

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.glass-card, .section-header, .hero-text, .hero-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .glass-card, .section-header, .hero-text, .hero-image {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .glass-card.animate, .section-header.animate, .hero-text.animate, .hero-image.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero-text.animate {
        transition-delay: 0.2s;
    }
    
    .hero-image.animate {
        transition-delay: 0.4s;
    }
    
    .success-message {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        z-index: 9999;
    }
    
    .success-card {
        max-width: 400px;
        text-align: center;
        padding: 40px;
    }
    
    .success-card i {
        font-size: 3rem;
        color: #10b981;
        margin-bottom: 20px;
    }
    
    .success-card h3 {
        margin-bottom: 10px;
    }
    
    .success-card p {
        margin-bottom: 20px;
    }
`;

document.head.appendChild(animationStyles);