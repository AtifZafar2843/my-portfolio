// GSAP animations and smooth scrolling implementation
class Animations {
    constructor() {
        this.init();
    }

    init() {
        this.initSmoothScroll();
        this.initScrollAnimations();
        this.initMobileMenu();
    }

    initSmoothScroll() {
        // Remove Lenis and implement native smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add smooth scroll behavior to the page
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    initScrollAnimations() {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Hero section animations
        gsap.from('.hero-content', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });

        // About section animations
        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: '.about',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });

        // Project cards animations
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.projects',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Contact form animations
        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });

        // Section titles animations
        gsap.from('.section-title', {
            scrollTrigger: {
                trigger: '.section-title',
                start: 'top 80%'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        let isMenuOpen = false;

        menuToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            menuToggle.classList.toggle('active');
            
            if (isMenuOpen) {
                navLinks.classList.add('active');
                gsap.to(navLinks, {
                    height: 'auto',
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                gsap.to(navLinks.querySelectorAll('a'), {
                    y: 0,
                    opacity: 1,
                    duration: 0.2,
                    stagger: 0.05,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(navLinks.querySelectorAll('a'), {
                    y: 20,
                    opacity: 0,
                    duration: 0.2,
                    stagger: -0.05,
                    ease: 'power2.in'
                });
                gsap.to(navLinks, {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => navLinks.classList.remove('active')
                });
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
                menuToggle.click();
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) {
                    menuToggle.click();
                }
            });
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Animations();
}); 