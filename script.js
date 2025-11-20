// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignore empty anchors
            if (href === '#' || href === '#!') {
                return;
            }
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile navbar if open
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
                
                // Smooth scroll to target
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // Fade-in Animation on Scroll
    // ===================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Configuration de l'Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // L'élément doit être visible à 15% pour déclencher l'animation
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajoute la classe 'visible' pour déclencher l'animation
                entry.target.classList.add('visible');
                
                // Optionnel : arrêter d'observer après l'animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments fade-in
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // ===================================
    // Active Navbar Link on Scroll
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Mettre à jour au scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Mettre à jour au chargement
    updateActiveNavLink();
    
    // ===================================
    // Navbar Shadow on Scroll
    // ===================================
    const navbar = document.querySelector('.navbar');
    
    function updateNavbarShadow() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
    }
    
    window.addEventListener('scroll', updateNavbarShadow);
    updateNavbarShadow();
    
    // ===================================
    // Performance: Debounce Scroll Events
    // ===================================
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Optimiser les événements de scroll
    window.addEventListener('scroll', debounce(function() {
        updateActiveNavLink();
        updateNavbarShadow();
    }, 10));
    
    // ===================================
    // Add Hover Effect to Cards
    // ===================================
    const hoverCards = document.querySelectorAll('.hover-card');
    
    hoverCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // ===================================
    // Service Cards Touch Support (Mobile)
    // ===================================
    const serviceCards = document.querySelectorAll('.service-card-hover');
    
    // Pour mobile, toggle la classe active au tap
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Seulement pour les appareils tactiles
            if ('ontouchstart' in window) {
                e.preventDefault();
                
                // Toggle active state
                const isActive = this.classList.contains('active');
                
                // Fermer toutes les autres cartes
                serviceCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.classList.remove('active');
                    }
                });
                
                // Toggle cette carte
                if (isActive) {
                    this.classList.remove('active');
                } else {
                    this.classList.add('active');
                }
            }
        });
    });
    
    // ===================================
    // Accordion Enhanced Behavior
    // ===================================
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to accordion item when opened on mobile
            if (window.innerWidth < 768) {
                setTimeout(() => {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const buttonPosition = this.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: buttonPosition,
                        behavior: 'smooth'
                    });
                }, 350); // Wait for accordion animation
            }
        });
    });
    
    // ===================================
    // Email Protection (Optional)
    // ===================================
    // Protection basique contre le scraping d'emails
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('contextmenu', function(e) {
            // Vous pouvez ajouter une logique de protection ici si nécessaire
        });
    });
    
    // ===================================
    // Loading Animation (Optional)
    // ===================================
    // Forcer l'affichage initial des éléments hero
    const heroSection = document.querySelector('.hero-section .fade-in');
    if (heroSection) {
        setTimeout(() => {
            heroSection.classList.add('visible');
        }, 100);
    }
    
    // ===================================
    // Console Message (Branding)
    // ===================================
    console.log(
        '%c👨‍💻 L\'Ingé Patrimoine %c\n' +
        'La finance enfin logique.\n' +
        'Développé avec rigueur et passion.',
        'color: #00D9FF; font-size: 20px; font-weight: bold;',
        'color: #0A2540; font-size: 14px;'
    );
    
    // ===================================
    // Handle External Links
    // ===================================
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        // Ensure security attributes are set
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // ===================================
    // Mobile Menu Auto-Close on Outside Click
    // ===================================
    document.addEventListener('click', function(event) {
        const navbarCollapse = document.getElementById('navbarNav');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const isClickInsideNav = navbarCollapse.contains(event.target);
            const isClickOnToggler = navbarToggler.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggler) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        }
    });
    
    // ===================================
    // Preload Important Assets
    // ===================================
    // Créer un lien de preconnect pour les CDN
    const preconnectLink = document.createElement('link');
    preconnectLink.rel = 'preconnect';
    preconnectLink.href = 'https://cdn.jsdelivr.net';
    document.head.appendChild(preconnectLink);
    
    // ===================================
    // Form Validation Enhancement (pour futur usage)
    // ===================================
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
    
    // ===================================
    // Analytics Ready (Placeholder)
    // ===================================
    // Fonction pour tracker les clics sur les CTA
    function trackCTAClick(ctaName) {
        console.log(`CTA clicked: ${ctaName}`);
        // Intégration future avec Google Analytics, Plausible, etc.
        // Example: gtag('event', 'cta_click', { 'cta_name': ctaName });
    }
    
    // Ajouter le tracking aux boutons CTA principaux
    const ctaButtons = document.querySelectorAll('.btn-accent, .btn-success, .btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ctaText = this.textContent.trim();
            trackCTAClick(ctaText);
        });
    });
    
    // ===================================
    // Responsive Table Handler (pour futur usage)
    // ===================================
    function makeTablesResponsive() {
        const tables = document.querySelectorAll('table:not(.table-responsive)');
        tables.forEach(table => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('table-responsive');
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });
    }
    
    // ===================================
    // Back to Top Button (Optional - Disabled by Default)
    // ===================================
    /*
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTopButton.className = 'btn btn-accent position-fixed bottom-0 end-0 m-4';
    backToTopButton.style.display = 'none';
    backToTopButton.style.zIndex = '9999';
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    */
    
    // ===================================
    // Performance Monitoring
    // ===================================
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page chargée en ${pageLoadTime}ms`);
        });
    }
    
    // ===================================
    // Service Worker Registration (pour PWA future)
    // ===================================
    /*
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered:', registration))
                .catch(error => console.log('SW registration failed:', error));
        });
    }
    */
});

// ===================================
// Global Utility Functions
// ===================================

// Fonction pour copier du texte dans le presse-papiers
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Texte copié: ' + text);
                // Optionnel: afficher une notification toast
            })
            .catch(err => {
                console.error('Erreur de copie:', err);
            });
    }
}

// Fonction pour détecter si l'utilisateur est sur mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Log si on est sur mobile
if (isMobileDevice()) {
    console.log('📱 Navigation mobile détectée');
}

// Export pour utilisation éventuelle dans d'autres scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        copyToClipboard,
        isMobileDevice
    };
}
