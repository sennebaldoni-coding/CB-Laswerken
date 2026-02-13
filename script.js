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
// TYPING ANIMATIE IN HERO
// ====================================
const words = ["Metaalconstructies", "Trappen", "Leuningen", "Deuren", "Poorten", "Balustrades"];
const typeTarget = document.getElementById('fading-word');
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typeTarget) return;
    
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typeTarget.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeTarget.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let speed = isDeleting ? 80 : 150;
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        speed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 500;
    }
    
    setTimeout(type, speed);
}

// Start typing animatie wanneer pagina geladen is
document.addEventListener('DOMContentLoaded', type);

// ====================================
// PROJECTEN CAROUSEL NAVIGATIE
// ====================================
const projectsGrid = document.querySelector('.projects-grid');
const nextArrow = document.getElementById('next-arrow');
const prevArrow = document.getElementById('prev-arrow');

if (nextArrow && projectsGrid) {
    nextArrow.addEventListener('click', () => {
        projectsGrid.scrollBy({
            left: 350,
            behavior: 'smooth'
        });
    });
}

if (prevArrow && projectsGrid) {
    prevArrow.addEventListener('click', () => {
        projectsGrid.scrollBy({
            left: -350,
            behavior: 'smooth'
        });
    });
}

// Touch swipe support voor mobiel
let touchStartX = 0;
let touchEndX = 0;

if (projectsGrid) {
    projectsGrid.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    projectsGrid.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left
        projectsGrid.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right
        projectsGrid.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    }
}

// ====================================
// LIGHTBOX FUNCTIONALITEIT
// ====================================
function openLightbox(element) {
    const imgSrc = element.querySelector('img').src;
    const lightboxImg = document.getElementById('lightbox-img');
    const lightbox = document.getElementById('lightbox');
    
    if (lightboxImg && lightbox) {
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'initial';
    }
}

// Sluit lightbox met ESC toets
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Voorkom dat lightbox sluit bij klik op afbeelding
const lightboxImg = document.getElementById('lightbox-img');
if (lightboxImg) {
    lightboxImg.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

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
    const animateElements = document.querySelectorAll('.service-card, .why-card, .project-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

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
});

// ====================================
// CONSOLE BERICHT (OPTIONEEL)
// ====================================
console.log('%cCB-Laswerken', 'font-size: 24px; font-weight: bold; color: #1a2b8f;');
console.log('%cVakmanschap in metaal', 'font-size: 14px; color: #666;');
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