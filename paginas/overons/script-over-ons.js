// ====================================
// STICKY HEADER FUNCTIONALITEIT
// ====================================
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// ====================================
// MOBIELE MENU TOGGLE
// ====================================
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const menuClose = document.getElementById('menu-close');
const navItems = document.querySelectorAll('.nav-item');

function toggleMenu() {
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'initial';
}

if (mobileMenu) {
    mobileMenu.addEventListener('click', toggleMenu);
}

if (menuClose) {
    menuClose.addEventListener('click', toggleMenu);
}

// Sluit menu bij klik op link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// ====================================
// SMOOTH SCROLL VOOR ANCHOR LINKS
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ====================================
// SCROLL ANIMATIES (FADE IN)
// ====================================
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

// Observeer elementen die ge-animeerd moeten worden
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.value-card, .about-text, .about-image');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ====================================
// INTERACTIEVE KAART KLIK
// ====================================
const mapContainer = document.querySelector('.styled-map-container');
if (mapContainer) {
    mapContainer.addEventListener('click', function() {
        const iframe = this.querySelector('iframe');
        if (iframe) {
            iframe.style.pointerEvents = 'auto';
        }
    });
    
    // Disable pointer events on scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        const iframe = mapContainer ? mapContainer.querySelector('iframe') : null;
        if (iframe) {
            iframe.style.pointerEvents = 'none';
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                iframe.style.pointerEvents = 'auto';
            }, 500);
        }
    });
}

// ====================================
// LAZY LOADING VOOR AFBEELDINGEN
// ====================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ====================================
// PARALLAX EFFECT OP HERO (OPTIONEEL)
// ====================================
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
    window.addEventListener('scroll', () => {
        // noinspection JSDeprecatedSymbols
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        if (scrolled < window.innerHeight) {
            heroImg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ====================================
// PRELOADER (OPTIONEEL)
// ====================================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
    
    // Trigger scroll animaties voor elementen die al in view zijn
    const event = new Event('scroll');
    window.dispatchEvent(event);
});

// ====================================
// BADGE ANIMATIE BIJ SCROLL
// ====================================
const badge = document.querySelector('.about-image-badge');
if (badge) {
    const badgeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                badge.style.animation = 'bounceIn 0.8s ease';
            }
        });
    }, { threshold: 0.5 });

    badgeObserver.observe(badge);
}

// Voeg bounce animatie toe
const style = document.createElement('style');
style.textContent = `
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3) translateY(50px);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// ====================================
// CONSOLE BERICHT (OPTIONEEL)
// ====================================
console.log('%cCB-Laswerken', 'font-size: 24px; font-weight: bold; color: #1a2b8f;');
console.log('%cOver Ons - Vakmanschap in Metaal', 'font-size: 14px; color: #666;');
console.log('%cWebsite ontwikkeld door Senne Baldoni', 'font-size: 12px; color: #888; font-style: italic;');

// SCROLL TO TOP BUTTON
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
scrollTopBtn.setAttribute('aria-label', 'Scroll naar boven');
document.body.appendChild(scrollTopBtn);

const scrollTopStyle = document.createElement('style');
scrollTopStyle.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #1a2b8f 0%, #4b6cb7 100%);
        color: #fff;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 8px 25px rgba(26, 43, 143, 0.3);
        z-index: 1000;
    }
    
    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 35px rgba(26, 43, 143, 0.4);
    }
    
    @media (max-width: 768px) {
        .scroll-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
        }
    }
`;
document.head.appendChild(scrollTopStyle);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});