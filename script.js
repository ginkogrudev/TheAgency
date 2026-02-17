document.addEventListener('DOMContentLoaded', () => {
    console.log("The Syndicate: Intel Loaded. Clear for operation.");

    // ----------------------------------------------------
    // 1. Dynamic Navigation Shadow on Scroll
    // ----------------------------------------------------
// Magnifying Glass Scroll Effect
   // ----------------------------------------------------
    // The Pink Void: Expanding Circle Scroll Effect
    // ----------------------------------------------------
    const circleSection = document.getElementById('circle-section');
    const expandingCircle = document.getElementById('expanding-circle');
    const circleContent = document.getElementById('circle-content');
    const circleText = document.getElementById('circle-text');
    const scrollPrompt = document.getElementById('scroll-prompt');

    if (circleSection && expandingCircle && circleContent) {
        window.addEventListener('scroll', () => {
            // requestAnimationFrame forces the browser to paint at 60fps (PageSpeed 100/100 practice)
            window.requestAnimationFrame(() => {
                const rect = circleSection.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // Calculate scroll progress (0 to 1) exactly within this section
                let scrollProgress = 0;
                if (rect.top <= 0) {
                    scrollProgress = Math.min(1, Math.abs(rect.top) / (rect.height - windowHeight));
                }

                // Scale the 16px circle up to 300x its size (4800px) to cover massive 4k screens
                const maxScale = 300; 
                const scaleValue = 1 + (scrollProgress * maxScale);
                
                // Hardware accelerated scale
                expandingCircle.style.transform = `scale(${scaleValue})`;

                // Trigger the CTA reveal when the circle covers the screen (around 40% scrolled)
                if (scrollProgress > 0.4) {
                    circleContent.style.opacity = '1';
                    circleContent.style.pointerEvents = 'auto'; // Make CTA clickable
                    
                    if (circleText) circleText.style.opacity = '0';
                    if (scrollPrompt) scrollPrompt.style.opacity = '0';
                } else {
                    circleContent.style.opacity = '0';
                    circleContent.style.pointerEvents = 'none'; // Prevent accidental clicks
                    
                    if (circleText) circleText.style.opacity = '1';
                    if (scrollPrompt) scrollPrompt.style.opacity = '1';
                }
            });
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