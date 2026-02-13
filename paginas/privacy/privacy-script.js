// ====================================
// STICKY HEADER FUNCTIONALITEIT
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
// MOBIELE MENU TOGGLE
// ====================================
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const menuClose = document.getElementById('menu-close');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (menuClose) {
    menuClose.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.style.overflow = 'initial';
    });
}

// Sluit menu bij klik op link
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.body.style.overflow = 'initial';
        }
    });
});

// ====================================
// ACTIVE NAV LINK TIJDENS SCROLLEN
// ====================================
const sections = document.querySelectorAll('.privacy-section');
const navLinksPrivacy = document.querySelectorAll('.privacy-nav-link');

function updateActiveLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 150)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinksPrivacy.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

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
                const headerHeight = 100;
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
// SCROLL TO TOP BUTTON
// ====================================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
scrollTopBtn.setAttribute('aria-label', 'Scroll naar boven');
document.body.appendChild(scrollTopBtn);

// Voeg styling toe
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

// Toon/verberg button tijdens scrollen
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll naar boven bij klik
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ====================================
// READING PROGRESS BAR
// ====================================
const progressBar = document.createElement('div');
progressBar.className = 'reading-progress';
document.body.appendChild(progressBar);

// Styling
const progressStyle = document.createElement('style');
progressStyle.textContent = `
    .reading-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #1a2b8f 0%, #4b6cb7 100%);
        z-index: 10001;
        transition: width 0.1s ease;
    }
`;
document.head.appendChild(progressStyle);

// Update progress tijdens scrollen
function updateReadingProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    
    progressBar.style.width = progress + '%';
}

window.addEventListener('scroll', updateReadingProgress);

// ====================================
// FADE IN ANIMATIES
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

// Observeer privacy secties
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.privacy-section');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
