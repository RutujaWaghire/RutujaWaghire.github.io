// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initContactForm();
    initAnimations();
    initDownloadCV();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.getElementById('header');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
            
            // Get target section
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetSection.offsetTop - headerHeight + 1;
                
                // Smooth scroll to target section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link immediately
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Header background on scroll
    window.addEventListener('scroll', function() {
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 25, 47, 0.98)';
            } else {
                header.style.background = 'rgba(10, 25, 47, 0.95)';
            }
        }
    });
}

// Scroll effects and active navigation
function initScrollEffects() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    function updateActiveNavLink() {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Handle "View My Work" button click
    const viewWorkBtns = document.querySelectorAll('a[href="#projects"]');
    viewWorkBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                const targetPosition = projectsSection.offsetTop - headerHeight + 1;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Ensure form inputs are functional
    [nameInput, emailInput, messageInput].forEach(input => {
        if (input) {
            // Make sure inputs can receive focus and input
            input.addEventListener('focus', function() {
                this.style.borderColor = 'var(--color-accent-cyan)';
                this.style.boxShadow = '0 0 0 3px rgba(100, 255, 218, 0.2)';
            });
            
            input.addEventListener('blur', function() {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            });
            
            // Enable typing in inputs
            input.addEventListener('input', function() {
                // Remove any previous error styling
                this.style.borderColor = '';
                this.style.boxShadow = '';
            });
        }
    });

    // Form validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message status ${type === 'success' ? 'status--success' : 'status--error'}`;
        messageDiv.style.cssText = `
            padding: var(--space-12);
            margin-top: var(--space-16);
            border-radius: var(--radius-base);
            text-align: center;
            font-weight: var(--font-weight-medium);
            background: ${type === 'success' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(255, 84, 89, 0.1)'};
            color: ${type === 'success' ? 'var(--color-accent-cyan)' : 'var(--color-red-400)'};
            border: 1px solid ${type === 'success' ? 'rgba(100, 255, 218, 0.3)' : 'rgba(255, 84, 89, 0.3)'};
        `;
        messageDiv.textContent = message;

        form.appendChild(messageDiv);

        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = nameInput?.value.trim() || '';
        const email = emailInput?.value.trim() || '';
        const message = messageInput?.value.trim() || '';

        // Validation
        if (!name) {
            showMessage('Please enter your name.', 'error');
            nameInput?.focus();
            return;
        }

        if (!email) {
            showMessage('Please enter your email address.', 'error');
            emailInput?.focus();
            return;
        }

        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            emailInput?.focus();
            return;
        }

        if (!message) {
            showMessage('Please enter your message.', 'error');
            messageInput?.focus();
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });

    // Real-time validation feedback
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !validateEmail(email)) {
                this.style.borderColor = 'var(--color-red-400)';
                this.style.boxShadow = '0 0 0 3px rgba(255, 84, 89, 0.1)';
            } else {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }
        });
    }
}

// Scroll-based animations
function initAnimations() {
    // Check if IntersectionObserver is supported
    if (!window.IntersectionObserver) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Animate skill bars
                if (entry.target.classList.contains('skills')) {
                    setTimeout(() => animateSkillBars(), 500);
                }
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe individual elements
    const animatedElements = document.querySelectorAll('.project__card, .experience__item, .skills__category, .achievement__card, .certification__item');
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Animate skill progress bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill__progress');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width || bar.getAttribute('data-width');
            if (width) {
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                    bar.style.transition = 'width 1s ease-out';
                }, 100);
            }
        }, index * 100);
    });
}

// Download CV functionality
function initDownloadCV() {
    const downloadBtn = document.getElementById('download-cv');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a simple CV content
            const cvContent = generateCVContent();
            
            try {
                // Create and trigger download
                const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Rutuja_N_Waghire_CV.txt';
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                
                // Show confirmation message
                showDownloadMessage('CV downloaded successfully!', 'success');
            } catch (error) {
                console.error('Download failed:', error);
                showDownloadMessage('Download failed. Please try again.', 'error');
            }
        });
    }
}

// Generate CV content with updated skills list
function generateCVContent() {
    return `RUTUJA N. WAGHIRE
Computer Engineering Student
Email: waghirerutuja0715@gmail.com
Phone: +91 7058572586
Location: Pune, Maharashtra, India
Portfolio: ${window.location.href}

SUMMARY
Computer Engineering student with demonstrated skills in web development (Netlify, Vercel), C, Python, and Java. 
Seeking opportunities to leverage technical abilities and contribute to impactful projects.

EDUCATION
Bachelor of Engineering in Computer Engineering (CGPA: 8.50)
Jaihind College of Engineering Pune
(Affiliated to Savitribai Phule Pune University)
Aug 2023 - Apr 2027

TECHNICAL SKILLS

Programming Languages:
• HTML/CSS (90%)
• Python (90%)
• JavaScript (85%)
• Java (85%)
• C++ (80%)
• C (75%)

Frameworks & Libraries:
• React (85%)

Technical Skills:
• Web Development (90%)
• GitHub/Git (85%)
• Data Structures & Algorithms (80%)
• Database Management (75%)

Platforms:
• Netlify (85%)
• Vercel (85%)

CURRENT EXPERIENCE

Virtual Intern - Infosys Springboard (June 2025 - Present)
• Gained hands-on experience in Data Structures and Algorithms using Java
• Worked with the Java tech stack
• Learned Agile methodologies with a focus on Scrum practices
• Enhanced communication skills through training in high-impact presentations
• Strengthened core software engineering concepts

FEATURED PROJECTS

1. Wealthwise
   AI-powered investment and portfolio tracking application with intelligent investment suggestions
   Technologies: Python, JavaScript, HTML/CSS, React

2. Web Development Portfolio
   Responsive websites using HTML, CSS, JavaScript, React, deployed on Netlify and Vercel
   Technologies: React, HTML, CSS, JavaScript, Netlify, Vercel

3. PCOD/PCOS Wellness Platform
   Digital wellness solution for PCOS/PCOD guidance using modern web technologies
   Technologies: React, JavaScript, HTML/CSS, Database

4. Lab Automation System
   Automated lab setup with Arduino, sensors, camera surveillance, and mobile app
   Technologies: C++, Arduino, JavaScript, HTML/CSS

5. Techverse Platform
   Dynamic platform connecting students with tech events using modern web development stack
   Technologies: React, JavaScript, HTML/CSS, Database

6. Bus Card Payment System
   Contactless smart payment system for MSRTC buses using embedded programming
   Technologies: C++, Arduino, JavaScript, HTML/CSS

ACHIEVEMENTS
• GMRT Khodad Project Exhibition
• Pentathon 2025
• Flipkart Runway
• Infosys Accelarate
• Smart India Hackathon 2025
• Walmart Sparkathon 2025

CERTIFICATIONS
• INFOSYS PRAGATI COHORT 4
• FULL STACK WEB DEVELOPMENT
• JAVA PROGRAMMING UDEMY
• NPTEL PROGRAMMING WITH JAVA
• INFOSYS SPRINGBOARD CERTIFICATION

CONTACT INFORMATION
Email: waghirerutuja0715@gmail.com
Phone: +91 7058572586

Generated on: ${new Date().toLocaleDateString()}
`;
}

// Show download/general message
function showDownloadMessage(text, type = 'success') {
    const message = document.createElement('div');
    message.className = `toast-message toast-${type}`;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--color-accent-cyan)' : 'var(--color-red-400)'};
        color: ${type === 'success' ? 'var(--color-dark-navy)' : 'var(--color-white)'};
        padding: var(--space-16) var(--space-24);
        border-radius: var(--radius-base);
        z-index: 10000;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 0 0 20px ${type === 'success' ? 'rgba(100, 255, 218, 0.4)' : 'rgba(255, 84, 89, 0.4)'};
        font-weight: var(--font-weight-medium);
        transform: translateX(400px);
        transition: transform 0.3s ease-out;
        max-width: 300px;
    `;
    message.textContent = text;
    
    document.body.appendChild(message);
    
    // Animate in
    setTimeout(() => {
        message.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        message.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 300);
    }, 3000);
}

// Handle all anchor links properly
document.addEventListener('DOMContentLoaded', function() {
    // Handle all links that might be navigation or social links
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just '#' or empty
            if (!href || href === '#') {
                e.preventDefault();
                return;
            }
            
            // Handle navigation to sections
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                    const targetPosition = targetSection.offsetTop - headerHeight + 1;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link if this is a nav link
                    if (this.classList.contains('nav__link')) {
                        document.querySelectorAll('.nav__link').forEach(navLink => {
                            navLink.classList.remove('active');
                        });
                        this.classList.add('active');
                    }
                }
            }
        });
    });
    
    // Handle external links properly
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="mailto:"]');
    externalLinks.forEach(link => {
        // These should open naturally - no preventDefault needed
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
    });
});

// Utility functions
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

// Performance optimization
const debouncedScrollHandler = debounce(function() {
    // Any scroll-based operations that need debouncing
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu) navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    }
    
    // Handle Enter key on navigation toggle
    if (e.key === 'Enter' && e.target.id === 'nav-toggle') {
        e.preventDefault();
        e.target.click();
    }
});

// Make sure navigation toggle is keyboard accessible
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
        navToggle.setAttribute('tabindex', '0');
        navToggle.setAttribute('role', 'button');
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    }
});

// Initialize lazy loading for project images (if any real images are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading initialization
initLazyLoading();

// Add smooth hover effects for social links
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.hero__social-link, .contact__social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Enhanced project card interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project__card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu) navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    }
}, 250));