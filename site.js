(function() {
    'use strict';

    // Single source of truth for navigation structure.
    const NAV_MODEL = {
        brand: { href: 'index.html', label: 'Rachit Tamrakar' },
        links: [
            { href: 'index.html', label: 'Home' },
            { href: 'about.html', label: 'About' },
            { href: 'resume.html', label: 'Resume', extraClass: 'nav-cta' },
            { href: 'projects.html', label: 'All Projects' },
        ],
        groups: [
            {
                key: 'industrial',
                label: 'Industrial Automation & Computer Vision',
                href: 'industrial.html',
                items: [
                    { href: 'vision-inspection-system.html', label: 'High-Speed Inspection System' },
                ],
            },
            {
                key: 'rocketry',
                label: 'Rocketry & Propulsion',
                href: 'rocketry.html',
                items: [
                    { href: 'solaris-mk-ii.html', label: 'Solaris Mk II & GSE Electronics' },
                    { href: 'arc-pyro-ignitor.html', label: '14 kV High Voltage Ignitor' },
                    { href: 'solaris-mk-iii.html', label: 'Solaris Mk III Testing' },
                ],
            },
            {
                key: 'robotics',
                label: 'Robotics & Competitions',
                href: 'robotics.html',
                items: [
                    { href: 'irec-2025-zenith.html', label: 'IREC 2025: Project Zenith' },
                    { href: 'autonomous-fruit-robot.html', label: 'Autonomous Fruit Robot' },
                ],
            },
        ],
        contact: { href: 'mailto:tamrakar.rachit2004@gmail.com', label: 'Contact' },
        linkedin: 'https://www.linkedin.com/in/rachit-tamrakar/'
    };

    /**
     * Inject a single, consistent side nav into pages that provide a mount point.
     */
    function renderSideNav() {
        if (document.querySelector('.side-nav')) return;

        const mount = document.querySelector('[data-nav-root]');
        if (!mount) return;

        const primaryLinks = NAV_MODEL.links.map(link => {
            const extraClass = link.extraClass ? ` ${link.extraClass}` : '';
            return `<a href="${link.href}" class="nav-link${extraClass}">${link.label}</a>`;
        }).join('\n            ');

        const groupedLinks = NAV_MODEL.groups.map(group => {
            const submenu = group.items.map(item =>
                `<a href="${item.href}" class="nav-sublink">${item.label}</a>`
            ).join('\n                    ');

            return `
            <div class="nav-group open" data-group="${group.key}">
                <div class="nav-group-head">
                    <a href="${group.href}" class="nav-group-link">${group.label}</a>
                    <button class="nav-group-toggle" type="button" aria-label="Toggle submenu" aria-expanded="true">
                        <span class="chevron">&#9656;</span>
                    </button>
                </div>
                <div class="nav-submenu">
                    ${submenu}
                </div>
            </div>`;
        }).join('');

        const navMarkup = `
        <aside class="side-nav">
            <div class="side-nav-brand">
                <a href="${NAV_MODEL.brand.href}" class="logo">${NAV_MODEL.brand.label}</a>
            </div>
            <div class="side-nav-links">
                ${primaryLinks}
                ${groupedLinks}
                <a href="${NAV_MODEL.contact.href}" class="nav-link nav-cta">${NAV_MODEL.contact.label}</a>
            </div>
        </aside>
        <div class="nav-overlay" aria-hidden="true"></div>`;

        mount.insertAdjacentHTML('beforebegin', navMarkup);
        mount.remove();
    }

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

    /**
     * Inject a consistent footer into pages. Placed inside `.page-content` to
     * allow the existing layout CSS to keep it full-bleed and pinned to the bottom.
     */
    function renderFooter() {
        if (document.querySelector('footer.site-footer')) return;

        const linkedin = NAV_MODEL.linkedin ? NAV_MODEL.linkedin : 'https://www.linkedin.com/';

        // Derive plain email (remove mailto: if present). Footer shows full email as text.
        let emailText = '';
        if (NAV_MODEL.contact && NAV_MODEL.contact.href) {
            emailText = NAV_MODEL.contact.href.replace(/^mailto:/i, '');
        }

        const footerMarkup = `
        <footer class="site-footer">
            <div class="container">
                <p>${emailText} &nbsp;•&nbsp; <a href="${linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
            </div>
        </footer>`;

        const mount = document.querySelector('.page-content');
        if (mount) {
            mount.insertAdjacentHTML('beforeend', footerMarkup);
        } else {
            document.body.insertAdjacentHTML('beforeend', footerMarkup);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderSideNav();
        setActiveNavLinks();
        initNavGroups();
        initMobileNav();
        initNavScrollPersistence();
        renderFooter();
    });
})();
