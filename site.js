(function() {
    'use strict';

    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScroll = 0;
        let navbarOffset = 0;
        const navbarHeight = navbar.offsetHeight;
        const scrollThreshold = 10;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll <= scrollThreshold) {
                navbarOffset = 0;
                navbar.style.transform = 'translateY(0)';
                lastScroll = currentScroll;
                return;
            }

            const scrollDelta = currentScroll - lastScroll;
            navbarOffset = Math.max(-navbarHeight, Math.min(0, navbarOffset - scrollDelta));

            navbar.style.transform = `translateY(${navbarOffset}px)`;
            lastScroll = currentScroll;
        });
    }

    document.addEventListener('DOMContentLoaded', initNavbarScroll);
})();
