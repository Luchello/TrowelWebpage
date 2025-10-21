/**
 * Portfolio Website - Main JavaScript
 * 
 * Features:
 * - Smooth scroll navigation with active link highlighting
 * - Scroll header background effect
 * - Intersection Observer for parallax animations
 */

// ==================== NAVIGATION MENU ====================

const navLinks = document.querySelectorAll('.nav__link');

// ==================== SCROLL HEADER ====================

/**
 * Add background to header on scroll
 */
function scrollHeader() {
    const header = document.getElementById('header');
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

// ==================== SMOOTH SCROLL & ACTIVE LINK ====================

/**
 * Smooth scroll to section and update active link
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active-link'));
        link.classList.add('active-link');
    });
});

/**
 * Update active link on scroll
 */
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (correspondingLink) {
                navLinks.forEach(link => link.classList.remove('active-link'));
                correspondingLink.classList.add('active-link');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ==================== INTERSECTION OBSERVER - PARALLAX ANIMATIONS ====================

/**
 * Animate project cards on scroll using Intersection Observer
 * Provides parallax-like fade-in effect when elements enter viewport
 */
const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px'
};

const animateOnScroll = (entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for sequential animation
            setTimeout(() => {
                entry.target.classList.add('animate-in');
            }, index * 100);
            
            // Stop observing after animation
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);

// Observe all elements with data-animate attribute
const animatedElements = document.querySelectorAll('[data-animate]');
animatedElements.forEach(element => {
    observer.observe(element);
});

// ==================== SCROLL REVEAL ANIMATION ====================

/**
 * Additional scroll reveal for smooth fade-in effects
 * Applied to sections as they enter viewport
 */
const revealSections = () => {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

// Initialize section styles
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// ==================== PERFORMANCE OPTIMIZATION ====================

/**
 * Debounce function to limit scroll event frequency
 * Improves performance on scroll-heavy interactions
 */
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHeader = debounce(scrollHeader, 10);
const debouncedUpdateActiveLink = debounce(updateActiveLink, 10);
const debouncedRevealSections = debounce(revealSections, 10);

window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', updateActiveLink);
window.removeEventListener('scroll', revealSections);

window.addEventListener('scroll', debouncedScrollHeader);
window.addEventListener('scroll', debouncedUpdateActiveLink);
window.addEventListener('scroll', debouncedRevealSections);

// ==================== PROJECTS SLIDER ====================

/**
 * Projects slider functionality
 * Supports responsive layout with different slides per view based on screen size
 */
const projectsSlider = (() => {
    const slider = document.querySelector('.projects__slider');
    const prevBtn = document.querySelector('.slider__nav--prev');
    const nextBtn = document.querySelector('.slider__nav--next');
    const cards = document.querySelectorAll('.project__card');
    
    if (!slider || !prevBtn || !nextBtn || cards.length === 0) {
        return null;
    }
    
    let currentIndex = 0;
    let slidesPerView = 3;
    let isTransitioning = false;
    
    /**
     * Get number of slides to show based on screen width
     */
    const getSlidesPerView = () => {
        const width = window.innerWidth;
        if (width >= 1200) return 3;
        if (width >= 768) return 2;
        return 1;
    };
    
    /**
     * Calculate maximum index based on total slides and slides per view
     */
    const getMaxIndex = () => {
        return Math.max(0, cards.length - slidesPerView);
    };
    
    /**
     * Update slider position
     */
    const updateSliderPosition = () => {
        if (isTransitioning) return;
        
        isTransitioning = true;
        const cardWidth = cards[0].offsetWidth;
        const gap = parseFloat(getComputedStyle(slider).gap) || 0;
        const offset = -(currentIndex * (cardWidth + gap));
        
        slider.style.transform = `translateX(${offset}px)`;
        
        // Update button states
        updateButtonStates();
        
        // Reset transition lock after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    };
    
    /**
     * Update navigation button states
     */
    const updateButtonStates = () => {
        // Always keep buttons active for looping slider
        prevBtn.style.opacity = '1';
        prevBtn.style.cursor = 'pointer';
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
    };
    
    /**
     * Navigate to previous slide
     */
    const prevSlide = () => {
        if (isTransitioning) return;
        const maxIndex = getMaxIndex();
        currentIndex = (currentIndex <= 0) ? maxIndex : currentIndex - 1;
        updateSliderPosition();
    };
    
    /**
     * Navigate to next slide
     */
    const nextSlide = () => {
        if (isTransitioning) return;
        const maxIndex = getMaxIndex();
        currentIndex = (currentIndex >= maxIndex) ? 0 : currentIndex + 1;
        updateSliderPosition();
    };
    
    /**
     * Handle window resize
     */
    const handleResize = debounce(() => {
        const newSlidesPerView = getSlidesPerView();
        
        if (newSlidesPerView !== slidesPerView) {
            slidesPerView = newSlidesPerView;
            
            // Adjust current index if needed
            const maxIndex = getMaxIndex();
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            
            updateSliderPosition();
        }
    }, 250);
    
    /**
     * Initialize slider
     */
    const init = () => {
        slidesPerView = getSlidesPerView();
        updateButtonStates();
        
        // Event listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        window.addEventListener('resize', handleResize);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
    };
    
    return { init };
})();

// ==================== INITIALIZATION ====================

/**
 * Initialize all features on DOM content loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initial calls
    scrollHeader();
    updateActiveLink();
    revealSections();
    
    // Initialize projects slider
    if (projectsSlider) {
        projectsSlider.init();
    }
    
    console.log('Portfolio website initialized successfully!');
});

