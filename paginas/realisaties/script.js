// ====================================
// STICKY HEADER & NAV
// ====================================
// noinspection JSDeprecatedSymbols

const header = document.getElementById('main-header');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const menuClose = document.getElementById('menu-close');

window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 100);
});

if (mobileMenu) mobileMenu.addEventListener('click', () => navLinks.classList.add('active'));
if (menuClose) menuClose.addEventListener('click', () => navLinks.classList.remove('active'));

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => navLinks.classList.remove('active'));
});

// ====================================
// INSTANT PORTFOLIO SYSTEEM
// ====================================

/**
 * BALUSTRADES IS NU SAMENGEVOEGD MET TRAPPEN
 */
const projectData = {
    stalendeuren: [
        'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg',
        'img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.jpeg', 'img10.jpeg',
        'img55.jpeg', 'img12.jpeg', 'img13.jpeg', 'img14.jpeg', 'img15.jpeg',
        'img16.jpeg', 'img17.jpeg', 'img18.jpeg', 'img19.jpeg', 'img20.jpeg',
        'img21.jpeg', 'img22.jpeg', 'img23.jpeg', 'img24.jpeg', 'img25.jpeg',
        'img26.jpeg', 'img27.jpeg', 'img28.jpeg', 'img29.jpeg', 'img30.jpeg',
        'img31.jpeg', 'img32.jpeg', 'img33.jpeg', 'img34.jpeg', 'img35.jpeg',
        'img36.jpeg', 'img37.jpeg', 'img38.jpeg', 'img39.JPG', 'img40.jpeg',
        'img41.jpeg', 'img42.JPG', 'img43.JPG', 'img44.jpeg', 'img45.jpeg',
        'img46.jpeg', 'img47.jpeg', 'img48.jpeg', 'img49.JPG', 'img50.jpeg',
        'img51.jpeg', 'img52.jpeg', 'img53.JPG', 'img54.JPG', 'img55.jpeg',
    ],
    trappen: [
        // TRAPPEN
        'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg',
        'img6.jpg', 'img7.jpeg', 'img8.jpeg', 'img9.jpeg', 'img10.jpeg',
        'img55.jpeg', 'img12.jpeg', 'img13.jpeg', 'img14.jpeg', 'img15.jpeg',
        'img16.jpeg', 'img17.jpeg', 'img18.jpeg', 'img19.jpeg', 'img20.jpeg',
        'img21.jpeg', 'img22.jpeg', 'img23.jpeg', 'img24.jpeg', 'img25.jpeg',
        'img26.jpeg', 'img27.jpeg', 'img28.jpeg', 'img29.jpeg', 'img30.jpeg',
        'img31.jpeg', 'img32.jpeg', 'img33.jpeg', 'img34.jpeg', 'img35.jpeg',
        'img36.jpeg', 'img37.jpeg'
    ],
    balustrades: [
        // BALUSTRADES (deze worden SAMEN MET TRAPPEN getoond)
        'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpeg',
        'img6.jpeg', 'img7.jpeg', 'img8.jpeg', 'img9.jpeg', 'img10.jpeg',
        'img55.jpeg', 'img12.jpeg'
    ],
    poorten: [
        'img1.jpg', 'img2.jpg', 'img3.jpeg', 'img4.jpeg', 'img5.jpeg',
        'img6.jpeg', 'img7.jpeg', 'img8.jpeg', 'img9.jpeg', 'img10.jpeg',
        'img55.jpeg', 'img12.jpeg', 'img13.jpeg', 'img14.jpeg', 'img15.jpeg',
        'img16.jpeg'
    ],
    deuren: [
        'img1.jpeg', 'img2.jpeg', 'img3.jpeg', 'img4.jpeg', 'img5.jpeg',
        'img6.jpeg', 'img7.jpeg', 'img8.jpeg', 'img9.jpeg', 'img10.jpeg',
        'img11.JPG', 'img12.jpeg', 'img13.jpeg', 'img14.jpeg', 'img15.jpeg',
        'img16.jpeg', 'img17.jpeg', 'img18.JPG'
    ],
    metaalconstructies: [
        'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg',
        'img6.jpeg', 'img7.jpg', 'img8.jpg', 'img9.jpg', 'img10.jpeg',
        'img55.jpeg', 'img12.jpeg', 'img13.jpeg', 'img14.jpeg', 'img15.jpeg',
        'img16.jpeg', 'img17.jpeg', 'img18.jpeg', 'img19.jpeg', 'img20.jpeg',
        'img21.jpeg', 'img22.jpeg', 'img23.jpeg', 'img24.jpeg', 'img25.jpeg',
        'img26.JPG', 'img27.jpeg', 'img28.jpeg'
    ]
};

const categoryNames = {
    stalendeuren: 'Stalen Deur',
    trappen: 'Trap', // Dit wordt gebruikt voor trappen
    balustrades: 'Balustrade', // Dit wordt gebruikt voor balustrades
    poorten: 'Poort',
    deuren: 'Deur',
    metaalconstructies: 'Metaalconstructie'
};

let currentFilter = 'all';
let lightboxImages = [];
let currentLightboxIndex = 0;

function loadPortfolio() {
    const container = document.getElementById('gallery-container');
    const loadingIndicator = document.getElementById('loading-indicator');

    if (loadingIndicator) loadingIndicator.style.display = 'none';

    let allDisplayImages = [];

    // 1. Verzamel de data op basis van het filter
    for (const category in projectData) {
        // Als filter "trappen" is, toon ZOWEL trappen ALS balustrades
        if (currentFilter === 'all' || currentFilter === category || (currentFilter === 'trappen' && category === 'balustrades')) {
            projectData[category].forEach(fileName => {
                allDisplayImages.push({
                    fileName: fileName,
                    src: `../../img/onderverdeling/${category}/${fileName}`,
                    categoryName: categoryNames[category]
                });
            });
        }
    }

    // 2. Automatische sortering: van groot getal naar klein getal
    allDisplayImages.sort((a, b) => {
        const numA = parseInt(a.fileName.replace(/\D/g, '')) || 0;
        const numB = parseInt(b.fileName.replace(/\D/g, '')) || 0;
        return numB - numA;
    });

    if (allDisplayImages.length === 0) {
        container.innerHTML = `<div class="no-results"><h3>Geen foto's gevonden</h3></div>`;
        return;
    }

    // 3. Render de HTML
    let htmlContent = '';
    allDisplayImages.forEach((image, index) => {
        htmlContent += `
            <div class="gallery-item" onclick="openLightboxInstant(${index})">
                <div class="gallery-item-img-wrapper">
                    <img src="${image.src}" alt="${image.categoryName}" class="gallery-item-img" loading="lazy">
                </div>
                <div class="gallery-item-overlay">
                    <div class="gallery-item-info">
                        <p class="gallery-item-category">${image.categoryName}</p>
                    </div>
                    <div class="gallery-item-zoom"><i class="fa-solid fa-expand"></i></div>
                </div>
            </div>`;
    });

    container.innerHTML = htmlContent;
    lightboxImages = allDisplayImages;
}

// ====================================
// FILTER & LIGHTBOX FUNCTIONALITEIT
// ====================================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        loadPortfolio();
        
        // AUTO-SCROLL NAAR GALLERY SECTIE
        const gallerySection = document.getElementById('gallery-section');
        if (gallerySection) {
            const headerOffset = 100; // Ruimte voor sticky header
            const elementPosition = gallerySection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

window.openLightboxInstant = function (index) {
    currentLightboxIndex = index;
    const modal = document.getElementById('lightbox-modal');
    updateLightboxContent();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

function updateLightboxContent() {
    const img = document.getElementById('lightbox-img');
    const cat = document.getElementById('lightbox-category');
    const count = document.getElementById('lightbox-counter');
    const data = lightboxImages[currentLightboxIndex];

    if (data) {
        img.src = data.src;
        cat.textContent = data.categoryName;
        count.textContent = `${currentLightboxIndex + 1} / ${lightboxImages.length}`;
    }
}

// Sluit functie
window.closeLightbox = function () {
    document.getElementById('lightbox-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
};

// Event Listeners voor knoppen
document.getElementById('lightbox-close').addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
});

document.getElementById('lightbox-next').addEventListener('click', (e) => {
    e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
    updateLightboxContent();
});

document.getElementById('lightbox-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightboxContent();
});

// Sluit bij klik buiten de foto
document.getElementById('lightbox-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Toetsenbord navigatie (Esc, Links, Rechts)
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') {
        currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
        updateLightboxContent();
    }
    if (e.key === 'ArrowLeft') {
        currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightboxContent();
    }
});

// Initialisatie
document.addEventListener('DOMContentLoaded', () => {
    // Lees URL parameter voor filter
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    
    if (filterParam) {
        // Vind de bijbehorende filter button
        const filterButton = document.querySelector(`[data-filter="${filterParam}"]`);
        if (filterButton) {
            // Verwijder active class van alle buttons
            document.querySelector('.filter-btn.active').classList.remove('active');
            // Voeg active class toe aan de juiste button
            filterButton.classList.add('active');
            // Update het filter
            currentFilter = filterParam;
        }
    }
    
    // Laad de portfolio
    loadPortfolio();
    
    // Scroll naar gallery sectie als er een filter parameter is
    if (filterParam) {
        setTimeout(() => {
            const gallerySection = document.getElementById('gallery-section');
            if (gallerySection) {
                const headerOffset = 100;
                const elementPosition = gallerySection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 300); // Kleine delay zodat de pagina eerst kan laden
    }
});

// ====================================
// SCROLL TO TOP BUTTON
// ====================================
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
