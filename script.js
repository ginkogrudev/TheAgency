document.addEventListener('DOMContentLoaded', () => {
    console.log("The Syndicate: Intel Loaded. Clear for operation.");

    // ----------------------------------------------------
    // 1. Dynamic Navigation Shadow on Scroll
    // ----------------------------------------------------
// Magnifying Glass Scroll Effect
    const magSection = document.getElementById('magnifier-section');
    const glass = document.getElementById('magnifying-glass');
    const magContent = document.getElementById('magnifier-content');

    if (magSection && glass && magContent) {
        window.addEventListener('scroll', () => {
            const rect = magSection.getBoundingClientRect();
            // Calculate how far down the user has scrolled within this specific section
            const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
            
            // Scale from 1 to 40 times its original size
            const scaleValue = 1 + (scrollProgress * 40);
            glass.style.transform = `scale(${scaleValue})`;

            // Once the lens is massive, fade in the CTA button inside it
            if (scaleValue > 15) {
                magContent.style.opacity = '1';
                magContent.style.pointerEvents = 'auto'; // Make button clickable
            } else {
                magContent.style.opacity = '0';
                magContent.style.pointerEvents = 'none';
            }
        });
    }

    const nav = document.getElementById('main-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('shadow-[0_4px_30px_rgba(112,0,255,0.15)]');
            } else {
                nav.classList.remove('shadow-[0_4px_30px_rgba(112,0,255,0.15)]');
            }
        });
    }

    // ----------------------------------------------------
    // 2. Smooth Scroll for Anchor Links
    // ----------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ----------------------------------------------------
    // 3. Accessible Mobile Menu Toggle
    // ----------------------------------------------------
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
            
            // Toggle State
            mobileBtn.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            mobileMenu.setAttribute('aria-hidden', isExpanded);
            
            // Toggle Icons
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });

        // Close mobile menu if a link inside it is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.click();
            });
        });
    }

    // ----------------------------------------------------
    // 4. Clearance Page: URL Drop to Mailto Router
    // ----------------------------------------------------
    const urlForm = document.getElementById('urlForm');
    if (urlForm) {
        urlForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const urlInput = document.getElementById('company-url').value;
            
            // Route directly to your portfolio email
            const email = "ginko@ginkogrudev.com";
            const subject = encodeURIComponent("Please review my site");
            const body = encodeURIComponent("Hi Ginko,\n\nPlease take a look at my website: " + urlInput + "\n\nLet's talk soon.");
            
            // Trigger the native mail client
            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        });
    }
});