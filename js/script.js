// Global variables
let currentLanguage = 'en';

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAOS();
    initializeNavigation();
    initializeLanguageToggle();
    initializeCarousel();
    initHeroParallax();
    loadTranslations();
});

// Initialize AOS (Animate On Scroll)
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
    }
}

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update navbar on scroll
    window.addEventListener('scroll', updateNavbarOnScroll);
}

// Update navbar appearance and visibility on scroll
function updateNavbarOnScroll() {
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');
    const scrollTop = window.pageYOffset;
    
    if (navbar && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        
        // Show navbar only after scrolling past hero section
        if (scrollTop > heroHeight - 100) {
            navbar.classList.add('visible');
            
            // Additional styling for deeper scroll
            if (scrollTop > heroHeight + 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        } else {
            navbar.classList.remove('visible');
        }
    }
}

// Language toggle functionality
function initializeLanguageToggle() {
    const langOptions = document.querySelectorAll('.lang-option');
    
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            
            if (selectedLang !== currentLanguage) {
                // Update active state
                langOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Change language
                currentLanguage = selectedLang;
                updateLanguage(selectedLang);
            }
        });
    });
}

// Update page language
function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (translations[lang] && translations[lang][key]) {
            // Handle different element types
            if (element.tagName === 'META') {
                element.setAttribute('content', translations[lang][key]);
            } else if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translations[lang][key];
            } else if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translations[lang][key]);
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // Update document language
    document.documentElement.lang = lang;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && translations[lang] && translations[lang].meta_description) {
        metaDescription.setAttribute('content', translations[lang].meta_description);
    }

    // Update page title
    const titleElement = document.querySelector('title');
    if (titleElement && translations[lang] && translations[lang].page_title) {
        titleElement.textContent = translations[lang].page_title;
    }
}

// Load initial translations
function loadTranslations() {
    if (typeof translations !== 'undefined') {
        updateLanguage(currentLanguage);
    }
}

// Carousel functionality using Glider.js
function initializeCarousel() {
    const gliderElement = document.getElementById('references-glider');
    if (!gliderElement) return;

    // Initialize Glider
    const glider = new Glider(gliderElement, {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        scrollLock: true,
        arrows: {
            prev: '#carousel-prev',
            next: '#carousel-next'
        },
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Auto-advance carousel every 5 seconds
    let autoSlide = setInterval(() => {
        if (glider) {
            const currentSlide = glider.slide;
            const totalSlides = glider.slides.length;
            const nextSlide = (currentSlide + 1) % totalSlides;
            glider.scrollItem(nextSlide);
        }
    }, 5000);

    // Pause auto-advance on hover
    gliderElement.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    // Resume auto-advance when not hovering
    gliderElement.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            if (glider) {
                const currentSlide = glider.slide;
                const totalSlides = glider.slides.length;
                const nextSlide = (currentSlide + 1) % totalSlides;
                glider.scrollItem(nextSlide);
            }
        }, 5000);
    });
}

/* —— HERO PARALLAX —— */
function initHeroParallax(){
  const hero   = document.getElementById('hero');
  const bg     = document.querySelector('.hero-background');
  if (!hero || !bg) return;

  const SHIFT = 20;   // move picture by 20 vh ( = 80 % ⇋ 80 % rule )

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking){
      requestAnimationFrame(() => {
        /* scroll progress inside the hero section 0 … 1 */
        const r   = hero.getBoundingClientRect();
        const p   = Math.min(Math.max(-r.top,0), r.height) / r.height;

        /* translate from   0 vh  →  -20 vh */
        bg.style.transform = `translateY(${-p*SHIFT}vh)`;
        ticking = false;
      });
      ticking = true;
    }
  });
}





// Utility function to scroll to a specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    // Refresh AOS on resize
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

// Error handling for missing images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder for broken images
            this.style.background = '#f0f0f0';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = '#999';
            this.style.fontSize = '14px';
            this.alt = 'Image placeholder';
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
    
    // Arrow keys for carousel navigation
    if (e.key === 'ArrowLeft') {
        const prevBtn = document.getElementById('carousel-prev');
        if (prevBtn) prevBtn.click();
    }
    
    if (e.key === 'ArrowRight') {
        const nextBtn = document.getElementById('carousel-next');
        if (nextBtn) nextBtn.click();
    }
});





// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Refresh AOS after everything is loaded
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }
});

// Analytics and tracking (placeholder for future implementation)
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', { category, action, label });
}

// Contact form handling (for future implementation)
function handleContactForm() {
    // Placeholder for contact form submission
    // This can be implemented when a contact form is added
}

// SEO and meta tag updates based on language
function updateSEOTags(lang) {
    const seoElements = {
        title: document.querySelector('title'),
        description: document.querySelector('meta[name="description"]'),
        ogTitle: document.querySelector('meta[property="og:title"]'),
        ogDescription: document.querySelector('meta[property="og:description"]')
    };

    Object.entries(seoElements).forEach(([key, element]) => {
        if (element && translations[lang] && translations[lang][key]) {
            if (key === 'title') {
                element.textContent = translations[lang][key];
            } else if (key.startsWith('og')) {
                element.setAttribute('content', translations[lang][key]);
            } else {
                element.setAttribute('content', translations[lang][key]);
            }
        }
    });
}



// Export functions for global access
window.scrollToSection = scrollToSection;
window.trackEvent = trackEvent;
