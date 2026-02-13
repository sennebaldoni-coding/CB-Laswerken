// ====================================
// CB-LASWERKEN COOKIE CONSENT SYSTEEM
// Universeel - werkt op alle pagina's
// GEFIXTE VERSIE - Google Maps error opgelost
// ====================================

(function() {
    'use strict';

    // ====================================
    // COOKIE HULPFUNCTIES
    // ====================================
    
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function deleteCookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
    }

    // ====================================
    // GOOGLE MAPS LADEN
    // ====================================
    
    // Globale initMap functie voor Google Maps callback
    window.initMap = function() {
        console.log('✅ Google Maps API succesvol geladen');
        
        // Als je een map element hebt op de pagina, initialiseer het hier:
        const mapElement = document.getElementById('map');
        if (mapElement) {
            // Voorbeeld: CB-Laswerken locatie
            const cbLocation = { lat: 50.7987, lng: 5.3464 }; // Borgloon
            const map = new google.maps.Map(mapElement, {
                zoom: 15,
                center: cbLocation,
                styles: [
                    {
                        "featureType": "all",
                        "elementType": "geometry.fill",
                        "stylers": [{ "saturation": -100 }]
                    }
                ]
            });
            
            // Marker toevoegen
            new google.maps.Marker({
                position: cbLocation,
                map: map,
                title: 'CB-Laswerken'
            });
        }
    };

// ====================================
    // 2. GOOGLE MAPS LADEN (AANGEPAST)
    // ====================================

    function loadGoogleMaps() {
        // Check of Google Maps al geladen is
        if (window.google && window.google.maps) {
            return;
        }

        // Check of we op de contactpagina zijn
        if (!document.getElementById('google-map')) {
            return;
        }

        const script = document.createElement('script');
        // HIER ZIT DE FIX: zie je '&loading=async' aan het einde?
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDynmmu6hFI2JTS_P1bP0rBXImspW_okUM&callback=initMap&loading=async';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        console.log('Google Maps script geladen (Async)');
    }

    // ====================================
    // GOOGLE ANALYTICS LADEN (OPTIONEEL)
    // ====================================
    
    function loadGoogleAnalytics() {
        // Als je Google Analytics wilt gebruiken:
        // 1. Uncomment de code hieronder
        // 2. Vervang 'G-XXXXXXXXXX' met jouw Google Analytics ID
        
        /*
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
        
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
        document.head.appendChild(script);
        
        console.log('📊 Google Analytics geladen');
        */
    }

    // ====================================
    // COOKIES VERWIJDEREN
    // ====================================
    
    function deleteAnalyticsCookies() {
        deleteCookie('_ga');
        deleteCookie('_gid');
        deleteCookie('_gat');
        deleteCookie('_gat_gtag_G_XXXXXXXXXX');
    }

    // ====================================
    // COOKIES LADEN OP BASIS VAN CONSENT
    // ====================================
    
    function loadCookies(consent) {
        // Essentiële cookies (altijd actief)
        setCookie('cb_session', 'active', 1);
        setCookie('cb_language', 'nl', 365);
        
        // Functionele cookies (Google Maps)
        if (consent.functional) {
            setCookie('cb_preferences', 'enabled', 180);
            loadGoogleMaps();
            console.log('✅ Functionele cookies (Google Maps) geladen');
        } else {
            deleteCookie('cb_preferences');
            console.log('❌ Functionele cookies uitgeschakeld');
        }
        
        // Analytische cookies (Google Analytics)
        if (consent.analytics) {
            loadGoogleAnalytics();
            console.log('✅ Analytische cookies geladen');
        } else {
            deleteAnalyticsCookies();
            console.log('❌ Analytische cookies uitgeschakeld');
        }
    }

    // ====================================
    // BANNER EN MODAL FUNCTIES
    // ====================================
    
    function showCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            setTimeout(() => {
                banner.classList.add('show');
            }, 1000); // Toon na 1 seconde
        }
    }

    function hideCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('show');
        }
    }

    function openCookieModal() {
        const modal = document.getElementById('cookie-modal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Laad huidige voorkeuren
            const consent = getCookie('cb_consent');
            if (consent) {
                try {
                    const consentData = JSON.parse(consent);
                    const functionalCheckbox = document.getElementById('functional-cookies');
                    const analyticsCheckbox = document.getElementById('analytics-cookies');
                    
                    if (functionalCheckbox) functionalCheckbox.checked = consentData.functional || false;
                    if (analyticsCheckbox) analyticsCheckbox.checked = consentData.analytics || false;
                } catch (e) {
                    console.error('Error parsing consent data:', e);
                }
            }
        }
    }

    function closeCookieModal() {
        const modal = document.getElementById('cookie-modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    // ====================================
    // NOTIFICATIE TONEN
    // ====================================
    
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `cookie-notification ${type}`;
        notification.innerHTML = `
            <i class="fa-solid fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Verwijder na 3 seconden
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.4s ease';
            setTimeout(() => {
                notification.remove();
            }, 400);
        }, 3000);
    }

    // ====================================
    // COOKIE CONSENT CHECKEN
    // ====================================
    
    function checkCookieConsent() {
        const consent = getCookie('cb_consent');
        if (!consent) {
            console.log('🍪 Geen cookie consent gevonden - toon banner');
            showCookieBanner();
        } else {
            try {
                // Laad cookies op basis van consent
                const consentData = JSON.parse(consent);
                console.log('✅ Cookie consent gevonden:', consentData);
                loadCookies(consentData);
            } catch (e) {
                console.error('Error parsing consent:', e);
                showCookieBanner();
            }
        }
    }

    // ====================================
    // EVENT LISTENERS
    // ====================================
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 Cookie consent systeem gestart');
        
        // Check consent bij pagina laden
        checkCookieConsent();
        
        // Accepteer alle cookies
        const acceptBtn = document.getElementById('btn-cookie-accept');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', function() {
                const consent = {
                    essential: true,
                    functional: true,
                    analytics: true,
                    timestamp: new Date().toISOString()
                };
                
                setCookie('cb_consent', JSON.stringify(consent), 365);
                loadCookies(consent);
                hideCookieBanner();
                showNotification('Alle cookies geaccepteerd');
                console.log('✅ Alle cookies geaccepteerd');
            });
        }
        
        // Open cookie instellingen vanuit banner
        const settingsBtn = document.getElementById('btn-cookie-settings');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', function() {
                hideCookieBanner();
                openCookieModal();
                console.log('⚙️ Cookie instellingen geopend');
            });
        }
        
        // Sluit modal
        const closeBtn = document.getElementById('cookie-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeCookieModal);
        }
        
        // Sluit modal bij klik buiten modal
        const modal = document.getElementById('cookie-modal');
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target.id === 'cookie-modal') {
                    closeCookieModal();
                }
            });
        }
        
        // Escape key om modal te sluiten
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeCookieModal();
            }
        });
        
        // Sla cookie voorkeuren op
        const saveBtn = document.getElementById('btn-cookie-save');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                const functionalCheckbox = document.getElementById('functional-cookies');
                const analyticsCheckbox = document.getElementById('analytics-cookies');
                
                const consent = {
                    essential: true, // Altijd true
                    functional: functionalCheckbox ? functionalCheckbox.checked : false,
                    analytics: analyticsCheckbox ? analyticsCheckbox.checked : false,
                    timestamp: new Date().toISOString()
                };
                
                setCookie('cb_consent', JSON.stringify(consent), 365);
                loadCookies(consent);
                closeCookieModal();
                hideCookieBanner();
                showNotification('Cookie voorkeuren opgeslagen');
                console.log('✅ Cookie voorkeuren opgeslagen:', consent);
            });
        }
    });

    // ====================================
    // GLOBALE FUNCTIE VOOR HANDMATIG OPENEN
    // ====================================
    
    window.openCookieSettings = openCookieModal;
    
    // Debug functie (kan verwijderd worden in productie)
    window.debugCookies = function() {
        const consent = getCookie('cb_consent');
        console.log('Current consent:', consent ? JSON.parse(consent) : 'Geen consent');
        console.log('All cookies:', document.cookie);
    };

})();
