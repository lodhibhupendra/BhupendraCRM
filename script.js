// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    
    // Initialize all functions
    initLoadingScreen();
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initSmoothScrolling();
    initLoadingAnimations();
    initTypingEffect();
    initCounterAnimations();
    initParallaxEffects();
    initScreenshotGallery();
    initDownloadFunctions();
    initBackToTop();
    initParticles();
    initEnhancements();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;
    
    console.log('Loading screen initialized');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            console.log('Loading screen hidden');
        }, 500);
    }, 2000);
}

// Navigation Functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu || !navbar) {
        console.log('Navigation elements not found');
        return;
    }

    console.log('Navigation initialized');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        console.log('Mobile menu toggled');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Typing Effect
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) {
        console.log('Typing element not found');
        return;
    }

    console.log('Typing effect initialized');

    const texts = [
        'Call Center Management System',
        'Customer Relationship Manager',
        'Professional CRM Solution',
        'Complete Business Solution'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(typeText, typingSpeed);
    }

    typeText();
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) {
        console.log('No counters found');
        return;
    }

    console.log('Counter animations initialized');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Parallax Effects
function initParallaxEffects() {
    const floatingCards = document.querySelectorAll('.floating-card');
    if (floatingCards.length === 0) return;

    function updateParallax() {
        const scrolled = window.innerWidth > 900 ? window.pageYOffset : 0;
        floatingCards.forEach(card => {
            const speed = card.getAttribute('data-speed') || 1;
            let yPos = -(scrolled * speed * 0.05); // very subtle effect
            yPos = Math.max(Math.min(yPos, 0), -10); // Clamp between 0 and -10px
            card.style.transform = `translateY(${yPos}px)`;
        });
    }
    window.addEventListener('scroll', updateParallax);
    window.addEventListener('resize', updateParallax);
    updateParallax();
}

// Screenshot Gallery
function initScreenshotGallery() {
    const thumbs = document.querySelectorAll('.screenshot-thumb');
    const mainImage = document.getElementById('mainImage');
    
    if (thumbs.length === 0) {
        console.log('No screenshot thumbnails found');
        return;
    }

    console.log('Screenshot gallery initialized');
    
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbs
            thumbs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumb
            this.classList.add('active');
            
            // Update main image
            const imageType = this.getAttribute('data-image');
            updateMainImage(imageType);
        });
    });
}

function updateMainImage(imageType) {
    const mainImage = document.getElementById('mainImage');
    if (!mainImage) return;

    const imageTexts = {
        'login': 'Login Panel - Animated Gradient Background',
        'dashboard': 'Employee Dashboard - Comprehensive Overview',
        'admin': 'Admin Panel - Complete Management Interface',
        'customers': 'Customer Management - Advanced Table View',
        'analytics': 'Analytics Dashboard - Performance Reports',
        'sms': 'SMS Interface - Messaging System'
    };
    
    // Create SVG placeholder with text
    const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
            <rect width="800" height="600" fill="#f8f9fa"/>
            <text x="400" y="280" text-anchor="middle" font-size="24" fill="#666" font-family="Arial, sans-serif">${imageTexts[imageType] || 'Screenshot Preview'}</text>
            <text x="400" y="320" text-anchor="middle" font-size="16" fill="#999" font-family="Arial, sans-serif">Click thumbnails to view different screens</text>
        </svg>
    `;
    
    mainImage.src = `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
}

// Download Functions
function initDownloadFunctions() {
    console.log('Download functions initialized');
    
    // Download buttons functionality
    window.downloadSoftware = function(platform) {
        const downloadUrls = {
            'windows': 'BhupendraCRMwin.exe.zip',
            'macos': 'BhupendraCRM.zip',
            'linux': 'https://example.com/BhupendraCRM.AppImage'
        };
        
        const url = downloadUrls[platform];
        if (url) {
            // Show download notification
            showNotification(`Downloading BhupendraCRM for ${platform}...`, 'info');
            
            // Simulate download (replace with actual download logic)
            setTimeout(() => {
                window.open(url, '_blank');
                showNotification('Download started!', 'success');
            }, 1000);
        }
    };
    
    // System requirements modal
    window.showRequirements = function(platform) {
        const requirements = {
            'windows': {
                title: 'Windows System Requirements',
                content: `
                    <ul>
                        <li><strong>OS:</strong> Windows 10 or later</li>
                        <li><strong>Processor:</strong> Intel Core i3 or equivalent</li>
                        <li><strong>RAM:</strong> 4 GB minimum, 8 GB recommended</li>
                        <li><strong>Storage:</strong> 500 MB available space</li>
                        <li><strong>Database:</strong> MySQL 8.0 or later</li>
                        <li><strong>Network:</strong> Internet connection for updates</li>
                    </ul>
                `
            },
            'macos': {
                title: 'macOS System Requirements',
                content: `
                    <ul>
                        <li><strong>OS:</strong> macOS 10.15 (Catalina) or later</li>
                        <li><strong>Processor:</strong> Intel or Apple Silicon</li>
                        <li><strong>RAM:</strong> 4 GB minimum, 8 GB recommended</li>
                        <li><strong>Storage:</strong> 500 MB available space</li>
                        <li><strong>Database:</strong> MySQL 8.0 or later</li>
                        <li><strong>Network:</strong> Internet connection for updates</li>
                    </ul>
                `
            },
            'linux': {
                title: 'Linux System Requirements',
                content: `
                    <ul>
                        <li><strong>OS:</strong> Ubuntu 20.04+ or similar</li>
                        <li><strong>Processor:</strong> Intel Core i3 or equivalent</li>
                        <li><strong>RAM:</strong> 4 GB minimum, 8 GB recommended</li>
                        <li><strong>Storage:</strong> 500 MB available space</li>
                        <li><strong>Database:</strong> MySQL 8.0 or later</li>
                        <li><strong>Network:</strong> Internet connection for updates</li>
                    </ul>
                `
            }
        };
        
        const req = requirements[platform];
        if (req) {
            showRequirementsModal(req.title, req.content);
        }
    };
    
    // Support functions
    window.openDocumentation = function() {
        showNotification('Opening documentation...', 'info');
        setTimeout(() => {
            window.open('https://example.com/docs', '_blank');
        }, 500);
    };
    
    window.openTutorials = function() {
        showNotification('Opening video tutorials...', 'info');
        setTimeout(() => {
            window.open('https://youtube.com/playlist?list=example', '_blank');
        }, 500);
    };
    
    window.openSupport = function() {
        showNotification('Opening support center...', 'info');
        setTimeout(() => {
            window.open('https://example.com/support', '_blank');
        }, 500);
    };
    
    window.openFAQ = function() {
        showNotification('Opening FAQ...', 'info');
        setTimeout(() => {
            window.open('https://example.com/faq', '_blank');
        }, 500);
    };
    

}

// Requirements Modal
function showRequirementsModal(title, content) {
    const modal = document.getElementById('requirementsModal');
    const modalContent = document.getElementById('requirementsContent');
    
    if (!modal || !modalContent) {
        console.log('Modal elements not found');
        return;
    }
    
    modalContent.innerHTML = `
        <h4>${title}</h4>
        <div class="requirements-list">
            ${content}
        </div>
    `;
    
    modal.style.display = 'flex';
    modal.style.animation = 'fadeIn 0.3s ease';
}

function closeModal() {
    const modal = document.getElementById('requirementsModal');
    if (!modal) return;
    
    modal.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) {
        console.log('Back to top button not found');
        return;
    }

    console.log('Back to top initialized');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Particles Effect
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // Clear previous particles
    particlesContainer.innerHTML = '';

    // Create visible, modern particles
    for (let i = 0; i < 32; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 3; // 3px to 6px
        const opacity = Math.random() * 0.1 + 0.15; // 0.15 to 0.25
        const color = Math.random() > 0.7
            ? 'rgba(120, 120, 255, ' + opacity + ')'
            : 'rgba(255,255,255,' + opacity + ')';
        const duration = Math.random() * 8 + 10; // 10s to 18s
        const delay = Math.random() * 8;

        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatXY ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .screenshot-card, .tech-card, .contact-item, .download-card');
    console.log(`Found ${animateElements.length} elements to animate`);
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.log('Contact form not found');
        return;
    }

    console.log('Contact form initialized');
    
    // Contact form submit handler
    (function() {
        const form = document.querySelector('.contact-form');
        if (!form) return;
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            form.reset();
            alert('Thank you! Your message has been sent.');
        });
    })();
}

function resetSubmitButton(btn, originalText) {
    btn.innerHTML = originalText;
    btn.disabled = false;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#28a745';
        case 'error': return '#dc3545';
        case 'warning': return '#ffc107';
        default: return '#17a2b8';
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
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
}

// Loading Animations
function initLoadingAnimations() {
    const loadingElements = document.querySelectorAll('.feature-card, .screenshot-card, .tech-card, .download-card');
    
    const loadObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('loaded');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    loadingElements.forEach(el => {
        el.classList.add('loading');
        loadObserver.observe(el);
    });
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Enhancements
function initEnhancements() {
    console.log('Enhancements initialized');
    
    // Floating cards hover effects
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Feature cards hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });

    // Technology cards glow effect
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 35px rgba(255, 255, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Performance optimization
function debounce(func, wait) {
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

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes animateIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: animateIn 0.6s ease forwards;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        padding: 0;
        margin-left: 1rem;
        transition: all 0.3s ease;
    }
    
    .notification-close:hover {
        transform: scale(1.1);
    }
    
    .nav-link.active {
        color: #4e73df;
        font-weight: 600;
    }
    
    .feature-icon {
        transition: transform 0.3s ease;
    }
    
    .floating-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .tech-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    }
    
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-accent);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: var(--shadow-medium);
        transition: var(--transition);
        z-index: 1000;
    }
    
    .back-to-top:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-heavy);
    }
    
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    }
    
    .modal-content {
        background: white;
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: var(--shadow-heavy);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-secondary);
        transition: var(--transition);
    }
    
    .modal-close:hover {
        color: var(--danger-color);
    }
    
    .requirements-list ul {
        list-style: none;
        padding: 0;
    }
    
    .requirements-list li {
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--border-color);
    }
    
    .requirements-list li:last-child {
        border-bottom: none;
    }
    
    .btn-loading {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .spinner {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

document.head.appendChild(style);

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Global error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Log when everything is ready
window.addEventListener('load', function() {
    console.log('Website fully loaded and ready!');
}); 

// Auto-scrolling gallery logic
(function() {
    const gallery = document.getElementById('autoScrollGallery');
    if (!gallery) return;
    let scrollSpeed = 1.2; // pixels per frame
    let animationFrame;

    // Duplicate images for seamless infinite scroll
    function duplicateImages() {
        const imgs = Array.from(gallery.children);
        imgs.forEach(img => {
            const clone = img.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            gallery.appendChild(clone);
        });
    }
    duplicateImages();

    function autoScroll() {
        gallery.scrollLeft += scrollSpeed;
        // Reset scroll to start for infinite effect
        if (gallery.scrollLeft >= gallery.scrollWidth / 2) {
            gallery.scrollLeft = 0;
        }
        animationFrame = requestAnimationFrame(autoScroll);
    }
    autoScroll();

    // Pause on hover
    gallery.addEventListener('mouseenter', () => {
        cancelAnimationFrame(animationFrame);
    });
    gallery.addEventListener('mouseleave', () => {
        autoScroll();
    });
})(); 