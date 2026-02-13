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
    });
}

if (menuClose) {
    menuClose.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
}

// Sluit menu bij klik op link
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ====================================
// CONTACT FORMULIER FUNCTIONALITEIT
// ====================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Haal formulier waarden op
        const naam = document.getElementById('naam').value;
        const bedrijf = document.getElementById('bedrijf').value;
        const email = document.getElementById('email').value;
        const telefoon = document.getElementById('telefoon').value;
        const onderwerp = document.getElementById('onderwerp').value;
        const bericht = document.getElementById('bericht').value;
        
        // Valideer privacy checkbox
        const privacy = document.getElementById('privacy').checked;
        if (!privacy) {
            alert('U moet akkoord gaan met de privacyverklaring.');
            return;
        }
        
        // Creëer email template
        const emailSubject = `Offerte aanvraag: ${onderwerp}`;
        const emailBody = createEmailTemplate(naam, bedrijf, email, telefoon, onderwerp, bericht);
        
        // Open email client met vooringevulde template
        // Open de mail client
        window.location.href = `mailto:info@cb-laswerken.be?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Toon bevestiging
        showSuccessMessage();
        
        // Reset formulier na 2 seconden
        setTimeout(() => {
            contactForm.reset();
        }, 2000);
    });
}

// ====================================
// EMAIL TEMPLATE CREËREN
// ====================================
function createEmailTemplate(naam, bedrijf, email, telefoon, onderwerp, bericht) {
    const bedrijfTekst = bedrijf ? `Bedrijf: ${bedrijf}\n` : '';
    
    return `
OFFERTE AANVRAAG - CB-LASWERKEN
================================

CONTACTGEGEVENS
---------------
Naam: ${naam}
${bedrijfTekst}Email: ${email}
Telefoon: ${telefoon}

ONDERWERP
---------
${onderwerp}

BERICHT
-------
${bericht}

================================

Deze aanvraag is verzonden via het contactformulier op cb-laswerken.be
Datum: ${new Date().toLocaleDateString('nl-BE', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
})}

--
Met vriendelijke groet,
${naam}
`;
}

// ====================================
// SUCCES BERICHT TONEN
// ====================================
function showSuccessMessage() {
    // Creëer succes overlay
    const successOverlay = document.createElement('div');
    successOverlay.className = 'success-overlay';
    successOverlay.innerHTML = `
        <div class="success-message">
            <div class="success-icon">
                <i class="fa-solid fa-check-circle"></i>
            </div>
            <h3>Email client geopend!</h3>
            <p>Uw email client is geopend met een vooraf ingevulde bericht.<br>Klik op verzenden om uw offerte aanvraag te versturen.</p>
        </div>
    `;
    
    document.body.appendChild(successOverlay);
    
    // Voeg styling toe
    const style = document.createElement('style');
    style.textContent = `
        .success-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .success-message {
            background: #fff;
            padding: 50px 40px;
            border-radius: 30px;
            text-align: center;
            max-width: 500px;
            animation: slideUp 0.5s ease;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .success-icon {
            font-size: 4rem;
            color: #27ae60;
            margin-bottom: 25px;
            animation: scaleIn 0.5s ease 0.2s both;
        }
        
        .success-message h3 {
            font-size: 1.8rem;
            color: #333;
            margin-bottom: 15px;
            font-weight: 700;
        }
        
        .success-message p {
            color: #666;
            font-size: 1rem;
            line-height: 1.6;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes scaleIn {
            from { transform: scale(0); }
            to { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Verwijder na 3 seconden
    setTimeout(() => {
        successOverlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            successOverlay.remove();
        }, 300);
    }, 3000);
    
    // Voeg fadeOut animatie toe
    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(fadeOutStyle);
}

// ====================================
// FORMULIER VALIDATIE FEEDBACK
// ====================================
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    // Real-time validatie feedback
    input.addEventListener('blur', function() {
        validateInput(this);
    });
    
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateInput(this);
        }
    });
});

function validateInput(input) {
    const formGroup = input.closest('.form-group');
    
    // Verwijder oude error
    const oldError = formGroup.querySelector('.error-message');
    if (oldError) oldError.remove();
    input.classList.remove('error');
    
    // Check validiteit
    if (input.hasAttribute('required') && !input.value.trim()) {
        showError(input, 'Dit veld is verplicht');
        return false;
    }
    
    // Email validatie
    if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            showError(input, 'Voer een geldig emailadres in');
            return false;
        }
    }
    
    // Telefoon validatie
    if (input.type === 'tel' && input.value) {
        const phoneRegex = /^[\d\s\-+()\/.]{8,}$/;
        if (!phoneRegex.test(input.value)) {
            showError(input, 'Voer een geldig telefoonnummer in');
            return false;
        }
    }
    
    return true;
}

function showError(input, message) {
    input.classList.add('error');
    const formGroup = input.closest('.form-group');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
    
    // Voeg error styling toe als die nog niet bestaat
    if (!document.getElementById('error-styles')) {
        const errorStyle = document.createElement('style');
        errorStyle.id = 'error-styles';
        errorStyle.textContent = `
            .form-group input.error,
            .form-group select.error,
            .form-group textarea.error {
                border-color: #e74c3c;
                background: #fff5f5;
            }
            
            .error-message {
                color: #e74c3c;
                font-size: 0.85rem;
                margin-top: 5px;
                font-weight: 600;
            }
        `;
        document.head.appendChild(errorStyle);
    }
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
// INTERACTIEVE KAART KLIK
// ====================================
const mapContainer = document.querySelector('.map-container');
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
        const iframe = mapContainer.querySelector('iframe');
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
// AUTO-FORMAT TELEFOON NUMMER
// ====================================
const phoneInput = document.getElementById('telefoon');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Format: 0476/79.56.15
        if (value.length > 0) {
            if (value.length <= 4) {
                e.target.value = value;
            } else if (value.length <= 6) {
                e.target.value = value.slice(0, 4) + '/' + value.slice(4);
            } else if (value.length <= 8) {
                e.target.value = value.slice(0, 4) + '/' + value.slice(4, 6) + '.' + value.slice(6);
            } else {
                e.target.value = value.slice(0, 4) + '/' + value.slice(4, 6) + '.' + value.slice(6, 8) + '.' + value.slice(8, 10);
            }
        }
    });
}

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
// ====================================
// SMOOTH SCROLL TO HASH ON PAGE LOAD
// ====================================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                const headerHeight = 100;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }, 100);
});