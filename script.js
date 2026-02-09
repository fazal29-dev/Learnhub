// LearnHub E-Learning Platform JavaScript by Fazal Shaikh

document.addEventListener('DOMContentLoaded', function() {
    console.log("LearnHub by Fazal Shaikh - E-Learning Platform loaded");
    
    // Initialize the platform
    const learnHub = new LearnHub();
    learnHub.init();
});

class LearnHub {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileToggle = document.querySelector('.mobile-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.courseCards = document.querySelectorAll('.course-card');
    }
    
    init() {
        this.bindEvents();
        this.initAnimations();
    }
    
    bindEvents() {
        // Mobile menu toggle
        this.mobileToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.toggleMobileMenu();
        });
        
        // Smooth scrolling for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    this.navLinks.forEach(navLink => navLink.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Close mobile menu if open
                    this.navMenu.classList.remove('active');
                    this.mobileToggle.classList.remove('active');
                }
            });
        });
        
        // Course filter functionality
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterCourses(btn.textContent);
            });
        });
        
        // Enroll buttons
        const enrollButtons = document.querySelectorAll('.primary-btn');
        enrollButtons.forEach(btn => {
            if (btn.textContent.includes('Enroll') || btn.textContent.includes('Now')) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.enrollInCourse(btn);
                });
            }
        });
        
        // Preview buttons
        const previewButtons = document.querySelectorAll('.outline-btn');
        previewButtons.forEach(btn => {
            if (btn.textContent.includes('Preview')) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.previewCourse(btn);
                });
            }
        });
        
        // Sign up buttons
        const signUpButtons = document.querySelectorAll('.signup-btn, .secondary-btn');
        signUpButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.redirectToSignUp();
            });
        });
    }
    
    toggleMobileMenu() {
        this.mobileToggle.classList.toggle('active');
        
        // Animate hamburger lines
        const lines = this.mobileToggle.querySelectorAll('span');
        if (this.mobileToggle.classList.contains('active')) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            lines[0].style.transform = 'rotate(0)';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'rotate(0)';
        }
    }
    
    filterCourses(category) {
        // Update active filter button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Filter courses based on category
        this.courseCards.forEach(card => {
            const courseCategory = card.querySelector('.course-category').textContent;
            
            if (category === 'All' || courseCategory.includes(category)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    enrollInCourse(btn) {
        const courseCard = btn.closest('.course-card');
        const courseTitle = courseCard.querySelector('h3').textContent;
        
        // Show enrollment confirmation
        alert(`Enrollment initiated for: ${courseTitle}\n\nRedirecting to checkout...`);
        
        // Simulate enrollment process
        btn.textContent = 'Enrolling...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = 'Enrolled!';
            btn.style.backgroundColor = '#2ecc71';
            btn.style.borderColor = '#2ecc71';
        }, 1500);
    }
    
    previewCourse(btn) {
        const courseCard = btn.closest('.course-card');
        const courseTitle = courseCard.querySelector('h3').textContent;
        
        alert(`Preview mode activated for: ${courseTitle}\n\nThis will open a demo lesson.`);
        
        // Simulate preview opening
        btn.textContent = 'Loading...';
        
        setTimeout(() => {
            btn.textContent = 'Preview Opened';
            btn.disabled = true;
        }, 1000);
    }
    
    redirectToSignUp() {
        alert('Redirecting to sign up page...');
        // In a real application, this would redirect to the signup page
    }
    
    initAnimations() {
        // Animate elements when they come into view
        const observerOptions = {
            threshold: 0.1
        };
        
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Animate course cards
        this.courseCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                elementObserver.observe(card);
            }, index * 100); // Stagger the animation
        });
        
        // Animate feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                elementObserver.observe(card);
            }, index * 150);
        });
        
        // Animate stat items
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                elementObserver.observe(item);
            }, index * 100);
        });
    }
}

// Initialize parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        const speed = 0.5;
        
        if (parallax) {
            parallax.style.backgroundPositionY = -(scrolled * speed) + 'px';
        }
    });
}

// Initialize parallax when page loads
window.addEventListener('load', initParallax);