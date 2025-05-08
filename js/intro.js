// Intro Animation
class IntroAnimation {
    constructor() {
        this.init();
    }

    init() {
        // Hide scrollbar but keep functionality
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        
        // Create timeline
        this.timeline = gsap.timeline({
            onComplete: () => this.onAnimationComplete()
        });

        // Animate intro sequence
        this.timeline
            .to('.greeting', {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power2.out'
            })
            .to('.name', {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power2.out'
            }, '-=0.6')
            .to('.emoji', {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.7)'
            }, '-=0.3')
            .to('.sliding-overlay', {
                x: '100%',
                duration: 0.8,
                ease: 'power2.inOut'
            }, '-=0.4')
            .to('.intro-content', {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.in'
            }, '-=0.6')
            .to('.intro-overlay', {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.in',
                onComplete: () => {
                    document.querySelector('.intro-overlay').style.display = 'none';
                }
            });

        // Show skip button after 2 seconds
        setTimeout(() => {
            gsap.to('.skip-intro', {
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out'
            });
        }, 2000);

        // Add skip button functionality
        this.addSkipButtonListener();
    }

    addSkipButtonListener() {
        const skipButton = document.querySelector('.skip-intro');
        skipButton.addEventListener('click', () => {
            this.timeline.progress(1); // Complete the animation
        });
    }

    onAnimationComplete() {
        // Enable scrolling without scrollbar
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
        
        // Hide scrollbar but keep functionality
        document.documentElement.style.scrollbarWidth = 'none'; /* Firefox */
        document.documentElement.style.msOverflowStyle = 'none'; /* IE and Edge */
        
        // For Chrome, Safari and Opera
        const style = document.createElement('style');
        style.innerHTML = `
            ::-webkit-scrollbar {
                display: none;
            }
        `;
        document.head.appendChild(style);
        
        // Start other animations
        if (window.portfolio) {
            window.portfolio.initScrollProgress();
        }
    }
}

// Initialize intro animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start intro animation
    new IntroAnimation();
}); 