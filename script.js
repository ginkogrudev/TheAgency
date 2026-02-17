document.addEventListener('DOMContentLoaded', () => {
    console.log("The Syndicate: Intel Loaded.");

    // Dynamic Navigation Shadow on Scroll
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-[0_4px_30px_rgba(112,0,255,0.15)]');
        } else {
            nav.classList.remove('shadow-[0_4px_30px_rgba(112,0,255,0.15)]');
        }
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});