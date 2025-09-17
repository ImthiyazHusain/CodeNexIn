// Portfolio Filter and Animation System
class PortfolioManager {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioCards = document.querySelectorAll('.portfolio-card');
        this.activeFilter = 'all';
        
        this.init();
    }
    
    init() {
        // Initialize filter functionality
        this.setupFilterButtons();
        
        // Initialize animations
        this.setupScrollAnimations();
        
        // Initialize card interactions
        this.setupCardInteractions();
        
        // Initialize CTA button interactions
        this.setupCTAButtons();
        
        // Initial animation
        this.animateCardsOnLoad();
    }
    
    setupFilterButtons() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterPortfolio(filter);
                this.updateActiveButton(e.target);
            });
        });
    }
    
    filterPortfolio(filter) {
        this.activeFilter = filter;
        
        this.portfolioCards.forEach((card, index) => {
            const category = card.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            // Add filtering class for smooth transition
            card.classList.add('filtering');
            
            setTimeout(() => {
                if (shouldShow) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                    // Stagger the reveal animation
                    setTimeout(() => {
                        card.classList.remove('filtering');
                    }, index * 100);
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        card.style.display = 'none';
                        card.classList.remove('filtering');
                    }, 300);
                }
            }, 150);
        });
        
        // Update grid layout after filtering
        setTimeout(() => {
            this.updateGridLayout();
        }, 500);
    }
    
    updateActiveButton(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
        
        // Add click animation
        activeButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            activeButton.style.transform = '';
        }, 150);
    }
    
    updateGridLayout() {
        const visibleCards = Array.from(this.portfolioCards).filter(card => 
            !card.classList.contains('hidden')
        );
        
        // Re-animate visible cards
        visibleCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in-up');
        });
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe cards for scroll animations
        this.portfolioCards.forEach(card => {
            observer.observe(card);
        });
        
        // Observe other elements
        const elementsToAnimate = document.querySelectorAll('.hero-content, .filter-section, .cta-content');
        elementsToAnimate.forEach(el => observer.observe(el));
    }
    
    setupCardInteractions() {
        this.portfolioCards.forEach(card => {
            const externalLink = card.querySelector('.external-link');
            const techTags = card.querySelectorAll('.tech-tag');
            
            // Card hover effects
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateCardHover(card, false);
            });
            
            // External link click
            if (externalLink) {
                externalLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleExternalLinkClick(card);
                });
            }
            
            // Tech tag interactions
            techTags.forEach(tag => {
                tag.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.handleTechTagClick(tag);
                });
            });
        });
    }
    
    animateCardHover(card, isHovering) {
        const chartBars = card.querySelectorAll('.bar');
        const techTags = card.querySelectorAll('.tech-tag');
        
        if (isHovering) {
            // Animate chart bars
            chartBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.transform = `scaleY(${1.1 + Math.random() * 0.3})`;
                }, index * 50);
            });
            
            // Animate tech tags
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px)';
                }, index * 30);
            });
        } else {
            // Reset animations
            chartBars.forEach(bar => {
                bar.style.transform = 'scaleY(1)';
            });
            
            techTags.forEach(tag => {
                tag.style.transform = 'translateY(0)';
            });
        }
    }
    
    handleExternalLinkClick(card) {
        const title = card.querySelector('h3').textContent;
        
        // Add click animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
        
        // Show notification (you can replace this with actual navigation)
        this.showNotification(`Opening case study for ${title}...`);
    }
    
    handleTechTagClick(tag) {
        const techName = tag.textContent;
        
        // Add click animation
        tag.style.transform = 'scale(0.9)';
        tag.style.background = '#667eea';
        tag.style.color = 'white';
        
        setTimeout(() => {
            tag.style.transform = 'translateY(-2px)';
            tag.style.background = '';
            tag.style.color = '';
        }, 300);
        
        this.showNotification(`Filtering by ${techName}...`);
    }
    
    setupCTAButtons() {
        const ctaButtons = document.querySelectorAll('.cta-btn');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = e.target.textContent;
                this.handleCTAClick(e.target, buttonText);
            });
            
            // Add ripple effect
            button.addEventListener('mousedown', (e) => {
                this.createRippleEffect(e, button);
            });
        });
    }
    
    handleCTAClick(button, text) {
        // Add click animation
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
        
        // Handle different CTA actions
        if (text.includes('Start Your Project')) {
            this.showNotification('Redirecting to project consultation...');
            // Add your navigation logic here
        } else if (text.includes('View Case Studies')) {
            this.showNotification('Loading detailed case studies...');
            // Add your navigation logic here
        }
    }
    
    createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
            animation: ripple 0.6s linear;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    animateCardsOnLoad() {
        this.portfolioCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100 + 500);
        });
    }
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 500;
            font-size: 14px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Advanced filtering with search
    enableAdvancedFiltering() {
        // This method can be extended for search functionality
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search projects...';
        searchInput.className = 'search-input';
        
        // Add search functionality
        searchInput.addEventListener('input', (e) => {
            this.searchProjects(e.target.value);
        });
        
        return searchInput;
    }
    
    searchProjects(searchTerm) {
        const term = searchTerm.toLowerCase();
        
        this.portfolioCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const technologies = Array.from(card.querySelectorAll('.tech-tag'))
                .map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(term) || 
                           description.includes(term) || 
                           technologies.some(tech => tech.includes(term));
            
            if (matches) {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
    }
}

// Utility functions
const utils = {
    // Smooth scroll to element
    scrollTo(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const targetPosition = elementPosition - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    },
    
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Initialize portfolio manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolioManager = new PortfolioManager();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes fade-in-up {
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
            animation: fade-in-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .search-input {
            width: 100%;
            max-width: 300px;
            padding: 12px 16px;
            border: 2px solid #e5e7eb;
            border-radius: 25px;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .search-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
    `;
    document.head.appendChild(style);
    
    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Portfolio page loaded in ${loadTime.toFixed(2)}ms`);
        });
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioManager, utils };
}
