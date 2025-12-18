(function() {
    'use strict';

    /**
     * Mark the active link in the side navigation based on the current path.
     */
    function setActiveNavLinks() {
        const links = document.querySelectorAll('.side-nav a');
        if (!links.length) return;

        const current = window.location.pathname.split('/').pop() || 'index.html';

        links.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;

            const target = href.split('/').pop();
            const isActive = target === current || (target === 'index.html' && current === '');

            if (isActive) {
                link.classList.add('active');
                const group = link.closest('.nav-group');
                if (group) {
                    group.classList.add('active-group');
                }
            }
        });
    }

    /**
     * Allow collapsing nav groups on smaller screens for readability.
     */
    function initNavGroups() {
        const groups = Array.from(document.querySelectorAll('.nav-group'));
        if (!groups.length) return;

        const isSmallScreen = () => window.matchMedia('(max-width: 1024px)').matches;
        const storageKey = 'navGroupState';

        const loadState = () => {
            try {
                const raw = localStorage.getItem(storageKey);
                return raw ? JSON.parse(raw) : {};
            } catch (e) {
                return {};
            }
        };

        const saveState = (state) => {
            try {
                localStorage.setItem(storageKey, JSON.stringify(state));
            } catch (e) {
                // ignore storage failures
            }
        };

        const state = loadState();

        groups.forEach(group => {
            const toggle = group.querySelector('.nav-group-toggle');
            const submenu = group.querySelector('.nav-submenu');
            const key = group.getAttribute('data-group');
            if (!toggle || !submenu) return;

            const setOpenState = (open, persist = false) => {
                group.classList.toggle('open', open);
                toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
                if (persist && key) {
                    state[key] = open;
                    saveState(state);
                }
            };

            const hasStoredState = key && Object.prototype.hasOwnProperty.call(state, key);
            // Default state if nothing stored: open on desktop, open for the active group on mobile.
            const defaultOpen = !isSmallScreen() || group.classList.contains('active-group');
            const shouldStartOpen = hasStoredState ? !!state[key] : defaultOpen;
            setOpenState(shouldStartOpen);

            toggle.addEventListener('click', () => {
                const willOpen = !group.classList.contains('open');

                // Close siblings on small screens to reduce scroll.
                if (isSmallScreen()) {
                    groups.forEach(other => {
                        if (other !== group) {
                            const otherToggle = other.querySelector('.nav-group-toggle');
                            if (otherToggle) {
                                other.classList.remove('open');
                                otherToggle.setAttribute('aria-expanded', 'false');
                                const otherKey = other.getAttribute('data-group');
                                if (otherKey) {
                                    state[otherKey] = false;
                                }
                            }
                        }
                    });
                    saveState(state);
                }

                setOpenState(willOpen, true);
            });
        });
    }

    /**
     * Mobile nav toggle / overlay handling.
     */
    function initMobileNav() {
        const toggle = document.querySelector('.nav-mobile-toggle');
        const overlay = document.querySelector('.nav-overlay');
        const sideNav = document.querySelector('.side-nav');
        if (!toggle || !sideNav) return;

        const isSmallScreen = () => window.matchMedia('(max-width: 1024px)').matches;

        const setNavOpen = (open) => {
            document.body.classList.toggle('nav-open', open);
            toggle.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        };

        toggle.addEventListener('click', () => {
            const willOpen = !document.body.classList.contains('nav-open');
            setNavOpen(willOpen);
        });

        if (overlay) {
            overlay.addEventListener('click', () => setNavOpen(false));
        }

        // Close nav when a link is clicked on mobile.
        const navLinks = sideNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isSmallScreen()) {
                    setNavOpen(false);
                }
            });
        });

        // Close on resize back to desktop.
        window.addEventListener('resize', () => {
            if (!isSmallScreen()) {
                setNavOpen(false);
            }
        });
    }

    /**
     * Persist sidebar scroll position between pages so it doesn't jump back to top.
     */
    function initNavScrollPersistence() {
        const sideNav = document.querySelector('.side-nav');
        if (!sideNav) return;

        const storageKey = 'sideNavScrollTop';

        // Restore prior scroll position
        try {
            const saved = parseInt(localStorage.getItem(storageKey), 10);
            if (Number.isFinite(saved)) {
                sideNav.scrollTop = saved;
            }
        } catch (e) {
            // ignore
        }

        const save = () => {
            try {
                localStorage.setItem(storageKey, String(sideNav.scrollTop));
            } catch (e) {
                // ignore storage failures
            }
        };

        // Save on scroll and before navigation away
        sideNav.addEventListener('scroll', () => {
            save();
        });
        window.addEventListener('beforeunload', save);
        window.addEventListener('pagehide', save);
    }

    document.addEventListener('DOMContentLoaded', () => {
        setActiveNavLinks();
        initNavGroups();
        initMobileNav();
        initNavScrollPersistence();
    });
})();
