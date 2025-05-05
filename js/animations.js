// GSAP animations and smooth scrolling implementation
class Animations {
    constructor() {
        this.lenis = null;
        this.menuOpen = false;
    }

    init() {
        this.initSmoothScroll();
        this.initScrollAnimations();
        this.initMobileMenu();
    }

    initSmoothScroll() {
        // Initialize Lenis for smooth scrolling
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false
        });

        // Integrate Lenis with GSAP
        gsap.ticker.add((time) => {
            this.lenis.raf(time * 1000);
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.lenis.scrollTo(target, {
                        offset: -80,
                        duration: 1.2
                    });
                }
            });
        });
    }

    initScrollAnimations() {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Hero section animations
        gsap.from('.hero-content', {
            opacity: 0,
            y: 100,
            duration: 1,
            ease: 'power3.out'
        });

        // About section animations
        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: '.about',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });

        // Project cards animations
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: i * 0.2,
                ease: 'power3.out'
            });
        });

        // Contact form animations
        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });

        // Section titles animations
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
    }

    initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                this.menuOpen = !this.menuOpen;
                menuToggle.classList.toggle('active');

                if (this.menuOpen) {
                    gsap.to(navLinks, {
                        height: 'auto',
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.inOut'
                    });
                } else {
                    gsap.to(navLinks, {
                        height: 0,
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.inOut'
                    });
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.menuOpen && !e.target.closest('.nav-container')) {
                    this.menuOpen = false;
                    menuToggle.classList.remove('active');
                    gsap.to(navLinks, {
                        height: 0,
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.inOut'
                    });
                }
            });
        }
    }

    destroy() {
        if (this.lenis) {
            this.lenis.destroy();
        }
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animations = new Animations();
    animations.init();
}); 