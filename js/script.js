// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Create particles for hero section
document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        // Create floating particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size between 2px and 8px
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation duration between 10s and 30s
            const duration = Math.random() * 20 + 10;
            particle.style.animationDuration = `${duration}s`;
            
            // Random delay
            const delay = Math.random() * 5;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Animate hero elements on page load
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) heroTitle.classList.add('animate');
    }, 300);
    
    setTimeout(() => {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.classList.add('animate');
    }, 4200);
    
    setTimeout(() => {
        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) heroDescription.classList.add('animate');
    }, 4700);
    
    setTimeout(() => {
        const heroButtons = document.querySelector('.hero-buttons');
        if (heroButtons) heroButtons.classList.add('animate');
    }, 5200);
    
    // Remove typewriter cursor after animation completes
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) heroTitle.classList.add('typewriter-complete');
    }, 4000);
    
    // Easter egg functionality for the logo
    const logo = document.querySelector('.logo');
    if (logo) {
        let isMoving = false;
        
        document.addEventListener('mousemove', (e) => {
            if (!logo || isMoving) return;
            
            const logoRect = logo.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Calculate distance from mouse to logo center
            const logoCenterX = logoRect.left + logoRect.width / 2;
            const logoCenterY = logoRect.top + logoRect.height / 2;
            const distance = Math.sqrt(
                Math.pow(mouseX - logoCenterX, 2) + 
                Math.pow(mouseY - logoCenterY, 2)
            );
            
            // If mouse is close to the logo (within 150px), move it away
            if (distance < 150) {
                isMoving = true;
                
                // Calculate direction to move (away from mouse)
                const angle = Math.atan2(mouseY - logoCenterY, mouseX - logoCenterX);
                const moveDistance = 100;
                const newX = logoCenterX - Math.cos(angle) * moveDistance;
                const newY = logoCenterY - Math.sin(angle) * moveDistance;
                
                // Apply transformation
                logo.style.transform = `translate(${newX - logoCenterX}px, ${newY - logoCenterY}px)`;
                logo.style.transition = 'transform 0.3s ease';
                
                // Reset after a short delay
                setTimeout(() => {
                    logo.style.transform = 'translate(0, 0)';
                    isMoving = false;
                }, 500);
            }
        });
    }
});

// Scroll animation function
function animateOnScroll() {
    const elements = document.querySelectorAll(
        '.section-title, .feature-row, .feature-content, .feature-image, .feature-title, .feature-description, ' +
        '.feature-details ul, .feature-buttons, .cta-description, .cta-buttons, .project-card, .project-title, ' +
        '.project-description, .project-details h4, .project-details ul, .project-tech, .project-btn, ' +
        '.tool-card, .tool-title, .tool-description, .tool-btn, .minecraft-step, .step-number, .step-title, ' +
        '.step-description, .step-code, .step-note, .about-content, .about-text p, .about-links h3, ' +
        '.social-links, .social-links a, .websites-grid, .website-card, .website-title, .website-description, ' +
        '.website-btn, .contact-content, .contact-content p, .contact-methods, .contact-link, footer, ' +
        '.blog-card, .blog-title, .blog-excerpt, .blog-meta'
    );
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        // For footer, animate it when it's close to coming into view
        if (element.tagName === 'FOOTER') {
            const footerPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Animate footer when it's within 100px of the bottom of the viewport
            if (footerPosition < windowHeight + 100) {
                element.classList.add('animate');
            }
        } else if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}

// Run on scroll and on page load
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', function() {
    // Animate elements on page load
    animateOnScroll();
    
    // Also check for footer specifically after a short delay
    setTimeout(animateOnScroll, 500);
});

// Project card hover effect enhancement
const projectCards = document.querySelectorAll('.project-card');
if (projectCards) {
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Tool card hover effect
const toolCards = document.querySelectorAll('.tool-card');
if (toolCards) {
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Website card hover effect
const websiteCards = document.querySelectorAll('.website-card');
if (websiteCards) {
    websiteCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Feature row hover effect
const featureRows = document.querySelectorAll('.feature-row');
if (featureRows) {
    featureRows.forEach(row => {
        const image = row.querySelector('.image-placeholder');
        if (image) {
            row.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.05)';
            });
            
            row.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
            });
        }
    });
}

// Rotating Banner Functionality
let rotationInterval;

function initRotatingBanner() {
    const bannerSlides = document.querySelectorAll('.banner-slide');
    
    if (bannerSlides.length === 0) return;
    
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        bannerSlides.forEach(slide => slide.classList.remove('active'));
        
        // Show the selected slide
        bannerSlides[index].classList.add('active');
        
        currentSlide = index;
    }

    // Function to move to the next slide
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % bannerSlides.length;
        showSlide(nextIndex);
    }

    // Clear any existing interval
    if (rotationInterval) {
        clearInterval(rotationInterval);
    }

    // Set up automatic rotation with proper timing
    function startRotation() {
        rotationInterval = setInterval(nextSlide, slideInterval);
    }

    // Start the rotation immediately
    startRotation();
}

// Initialize the rotating banner when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the rotating banner
    initRotatingBanner();
});