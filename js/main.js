// Main JavaScript file for general functionality and form handling
class Portfolio {
    constructor() {
        this.initFormHandling();
        this.initScrollProgress();
        this.initCursorEffect();
        this.initProjectToggle();
    }

    initFormHandling() {
        const form = document.querySelector('.contact-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                // Get form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                // Show loading state
                const submitBtn = form.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                try {
                    // Simulate form submission (replace with actual API call)
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    // Show success message
                    this.showNotification('Message sent successfully!', 'success');
                    form.reset();
                } catch (error) {
                    // Show error message
                    this.showNotification('Failed to send message. Please try again.', 'error');
                } finally {
                    // Reset button state
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    }

    initScrollProgress() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }

    initCursorEffect() {
        // Create custom cursor
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });

            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });

        // Hide default cursor
        document.body.style.cursor = 'none';
    }

    initProjectToggle() {
        const toggleButtons = document.querySelectorAll('.toggle-btn');
        const projectGrid = document.querySelector('.project-grid');

        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                toggleButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Toggle project visibility
                if (button.dataset.type === 'minor') {
                    projectGrid.classList.add('minor-active');
                } else {
                    projectGrid.classList.remove('minor-active');
                }

                // Trigger GSAP animation for visible projects
                gsap.from('.project-card:not([style*="display: none"])', {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out'
                });
            });
        });
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Add to document
        document.body.appendChild(notification);

        // Animate in
        gsap.fromTo(notification,
            {
                opacity: 0,
                y: -50,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            }
        );

        // Remove after delay
        setTimeout(() => {
            gsap.to(notification, {
                opacity: 0,
                y: -50,
                scale: 0.8,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => notification.remove()
            });
        }, 3000);
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();
}); 