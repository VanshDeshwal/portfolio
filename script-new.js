/**
 * Theme Management Module
 */
class ThemeManager {
  constructor() {
    this.themeToggle = document.querySelector('.theme-toggle');
    this.body = document.body;
    this.currentTheme = localStorage.getItem('portfolio-theme') || 'light';
    
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.bindEvents();
  }

  setTheme(theme) {
    this.currentTheme = theme;
    this.body.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    
    // Update theme toggle accessibility
    this.themeToggle.setAttribute(
      'aria-label', 
      `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`
    );
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  bindEvents() {
    this.themeToggle?.addEventListener('click', () => this.toggleTheme());
    
    // Keyboard support
    this.themeToggle?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }
}

/**
 * Smooth Scroll Management Module
 */
class ScrollManager {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // Smooth scroll for anchor links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          this.scrollToElement(targetElement);
        }
      }
    });
  }

  scrollToElement(element) {
    const offsetTop = element.offsetTop - 80; // Account for fixed header
    
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

/**
 * Animation Management Module
 */
class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    this.initScrollAnimations();
    this.initLazyLoading();
  }

  initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe project cards for staggered animations
    document.querySelectorAll('.project-card').forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      
      observer.observe(card);
    });
  }

  initLazyLoading() {
    if (!('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

/**
 * Performance Utilities
 */
class PerformanceUtils {
  static debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

/**
 * Analytics and Tracking (if needed)
 */
class Analytics {
  constructor() {
    this.trackingEnabled = this.hasConsent();
  }

  hasConsent() {
    // Check for user consent for analytics
    return localStorage.getItem('analytics-consent') === 'true';
  }

  trackEvent(eventName, properties = {}) {
    if (!this.trackingEnabled) return;
    
    // Add your analytics tracking here
    console.log('Event tracked:', eventName, properties);
  }

  trackPageView(page) {
    if (!this.trackingEnabled) return;
    
    // Add your page view tracking here
    console.log('Page view tracked:', page);
  }
}

/**
 * Main Portfolio Application
 */
class PortfolioApp {
  constructor() {
    this.modules = {};
    this.init();
  }

  init() {
    // Initialize all modules
    this.modules.theme = new ThemeManager();
    this.modules.scroll = new ScrollManager();
    this.modules.animation = new AnimationManager();
    this.modules.analytics = new Analytics();

    // Track initial page load
    this.modules.analytics.trackPageView(window.location.pathname);

    // Add global event listeners
    this.bindGlobalEvents();
  }

  bindGlobalEvents() {
    // Handle external link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[target="_blank"]');
      if (link) {
        this.modules.analytics.trackEvent('external_link_click', {
          url: link.href,
          text: link.textContent.trim()
        });
      }
    });

    // Handle project interactions
    document.addEventListener('click', (e) => {
      const projectCard = e.target.closest('.project-card');
      if (projectCard) {
        const projectTitle = projectCard.querySelector('.project-title')?.textContent;
        this.modules.analytics.trackEvent('project_interaction', {
          project: projectTitle
        });
      }
    });

    // Handle theme toggle
    document.addEventListener('click', (e) => {
      if (e.target.closest('.theme-toggle')) {
        this.modules.analytics.trackEvent('theme_toggle', {
          new_theme: this.modules.theme.currentTheme
        });
      }
    });

    // Handle scroll events (throttled)
    window.addEventListener('scroll', 
      PerformanceUtils.throttle(() => {
        this.handleScroll();
      }, 100)
    );

    // Handle resize events (debounced)
    window.addEventListener('resize',
      PerformanceUtils.debounce(() => {
        this.handleResize();
      }, 250)
    );
  }

  handleScroll() {
    // Add scroll-based functionality here if needed
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    
    // You could add a scroll progress indicator here
    this.updateScrollProgress(scrollPercent);
  }

  handleResize() {
    // Handle responsive layout adjustments if needed
    console.log('Window resized:', window.innerWidth, window.innerHeight);
  }

  updateScrollProgress(percent) {
    // This could update a progress bar or trigger animations
    document.documentElement.style.setProperty('--scroll-progress', `${percent}%`);
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

// Handle page visibility changes for analytics
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('Page hidden');
  } else {
    console.log('Page visible');
  }
});
