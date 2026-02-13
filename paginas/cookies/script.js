// ====================================
// STICKY HEADER
// ====================================
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// ====================================
// MOBIELE MENU
// ====================================
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const menuClose = document.getElementById('menu-close');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.add('active');
    });
}

if (menuClose) {
    menuClose.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
}

const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ====================================
// ACTIVE NAV HIGHLIGHTING
// ====================================
const sections = document.querySelectorAll('.cookies-section');
const cookiesNavLinks = document.querySelectorAll('.cookies-nav-link');

function updateActiveLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 150)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    cookiesNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ====================================
// SMOOTH SCROLL (Voor navigatie linkjes)
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Check of het een geldige link is en niet alleen '#'
        if (href && href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = 100; // Pas aan aan jouw header hoogte
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ====================================
// BROWSER ACCORDION (Voor cookie pagina)
// ====================================
const browserItems = document.querySelectorAll('.browser-item');

if (browserItems.length > 0) {
    browserItems.forEach(item => {
        const header = item.querySelector('.browser-header');
        if(header) {
            header.addEventListener('click', () => {
                // Sluit alle andere items
                browserItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle het geklikte item
                item.classList.toggle('active');
            });
        }
    });
}

// ====================================
// SCROLL TO TOP BUTTON (GECORRIGEERD)
// ====================================

// 1. Maak de knop aan
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
scrollTopBtn.setAttribute('aria-label', 'Scroll naar boven');
document.body.appendChild(scrollTopBtn);

// 2. Maak de CSS stijl aan
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
        display: flex; /* Zorgt dat het pijltje in het midden staat */
        align-items: center;
        justify-content: center;
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

// 3. Voeg de stijl nu pas toe aan de head (Nu bestaat 'scrollTopStyle' wel!)
document.head.appendChild(scrollTopStyle);

// 4. Voeg de functionaliteit toe
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