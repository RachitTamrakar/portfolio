// Rendering functions for project cards
(function() {
    'use strict';

    /**
     * Renders a single project card
     * @param {Object} project - Project data object
     * @returns {string} HTML string for the project card
     */
    function renderProjectCard(project) {
        const hasLink = !!project.link;
        const elementType = hasLink ? 'a' : 'article';
        const linkClass = hasLink ? ' has-page' : '';
        const linkAttr = hasLink ? `href="${project.link}"` : '';
        
        // Build responsive image markup using srcset / sizes / loading
        function buildImageHtml(p) {
            if (!p.image) return `<div class="placeholder-image">${p.placeholder || ''}</div>`;
            const src = p.image;
            const extMatch = src.match(/\.([a-zA-Z0-9]+)$/);
            const ext = extMatch ? extMatch[1] : 'png';
            const base = src.replace(/\.[^.]+$/, '');
            const widths = Array.isArray(p.imageWidths) ? p.imageWidths : [1600, 1024, 640];
            const sizes = p.imageSizes || '(max-width:600px) 100vw, 33vw';
            const loading = p.loading || 'lazy';
            const srcset = widths.map(w => `${base}-w${w}.${ext} ${w}w`).join(', ');
            // choose a sensible default src (middle width)
            const mid = widths[Math.floor(widths.length / 2)];
            const fallback = `${base}-w${mid}.${ext}`;
            return `<img src="${fallback}" srcset="${srcset}" sizes="${sizes}" alt="${p.imageAlt || ''}" loading="${loading}" onerror="this.style.display='none'">`;
        }

        const imageHtml = buildImageHtml(project);
        
        const tags = Array.isArray(project.tags) ? project.tags : [];
        const tagsHtml = tags
            .map(tag => `<span>${tag}</span>`)
            .join('\n                            ');
        
        const linkTextHtml = hasLink 
            ? '<span class="project-link-compact">Learn More &rarr;</span>'
            : '';
        
        return `
                <${elementType} ${linkAttr} class="project-card-compact${linkClass}">
                    <div class="project-card-image">
                        ${imageHtml}
                    </div>
                    <div class="project-card-body">
                        <h3>${project.title}</h3>
                        <p class="project-meta-compact">${project.organization} &middot; ${project.timeframe}</p>
                        <p class="impact-line">${project.impact}</p>
                        <div class="project-tags-compact">
                            ${tagsHtml}
                        </div>
                        ${linkTextHtml}
                    </div>
                </${elementType}>`;
    }

    /**
     * Renders a category section with projects in a carousel
     * @param {string} categoryKey - Category identifier
     * @param {Array} projects - Array of project objects
     * @returns {string} HTML string for the entire section
     */
    function renderCategorySection(categoryKey, projects) {
        const category = CATEGORIES[categoryKey];
        const altBgClass = category.altBg ? ' alt-bg' : '';
        const sectionClass = categoryKey === 'featured' 
            ? 'featured-projects-section' 
            : `projects-section${altBgClass}`;
        
        const projectsHtml = projects
            .map(project => renderProjectCard(project))
            .join('\n');
        
        const carouselId = `carousel-${categoryKey}`;
        
        // If the page already includes a top-level header (e.g. a category page with
        // `.page-header-clean h1`), don't repeat the title here. This prevents a
        // visually duplicate heading when rendering a single-category page.
        const showSectionHeader = !(document && document.querySelector && document.querySelector('.page-header-clean h1'));
        const headerHtml = showSectionHeader ? `<h2 class="section-title">${category.title}</h2>` : '';

        return `
        <section class="${sectionClass}">
            ${headerHtml}
            <div class="carousel-container">
                <button class="carousel-btn carousel-prev" data-carousel="${carouselId}" aria-label="Previous">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div class="carousel" id="${carouselId}">
                    <div class="carousel-track">
                        ${projectsHtml}
                    </div>
                </div>
                <button class="carousel-btn carousel-next" data-carousel="${carouselId}" aria-label="Next">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
            <div class="carousel-dots" data-carousel="${carouselId}"></div>
        </section>`;
    }

    /**
     * Renders projects for the index page (featured only)
     */
    window.renderIndexProjects = function() {
        const featuredProjects = sortProjectsForDisplay(Object.values(PROJECTS)
            .filter(p => p.categories.includes('featured')));
        
        const container = document.getElementById('featured-projects-container');
        if (!container) return;
        
        const projectsHtml = featuredProjects
            .map(project => renderProjectCard(project))
            .join('\n');
        
        container.innerHTML = `
            <section class="featured-projects-section">
                <h2 class="section-title">Featured Work</h2>
                <div class="projects-card-grid">
                    ${projectsHtml}
                </div>
            </section>`;
    };

    /**
     * Helper: parse the most-relevant year from a project's timeframe string
     * Returns 0 if no year found.
     */
    function parseProjectYear(timeframe) {
        if (!timeframe || typeof timeframe !== 'string') return 0;
        const years = timeframe.match(/\d{4}/g);
        if (!years) return 0;
        return Math.max(...years.map(y => parseInt(y, 10)));
    }

    /**
     * Helper: sort projects so that projects with their own page (`link`) come first,
     * then by most-recent year (descending).
     */
    function sortProjectsForDisplay(projects) {
        return projects.sort((a, b) => {
            const aHasLink = !!a.link;
            const bHasLink = !!b.link;
            if (aHasLink !== bHasLink) return aHasLink ? -1 : 1;
            const ay = parseProjectYear(a.timeframe);
            const by = parseProjectYear(b.timeframe);
            return by - ay; // most recent first
        });
    }

    /**
     * Renders all projects organized by category for projects page
     */
    window.renderAllProjects = function() {
        const container = document.getElementById('all-projects-container');
        if (!container) return;
        
        const sections = [];
        
        Object.keys(CATEGORIES)
            .filter(key => key !== 'featured')
            .forEach(categoryKey => {
                const projectsForCategory = sortProjectsForDisplay(Object.values(PROJECTS)
                    .filter(p => p.categories.includes(categoryKey)));
                
                if (projectsForCategory.length === 0) return;
                sections.push(renderCategorySection(categoryKey, projectsForCategory));
            });
        
        container.innerHTML = sections.join('\n');
    };

    /**
     * Render a single category page (e.g., industrial / rocketry / robotics)
     * @param {string} categoryKey - category identifier
     */
    window.renderCategoryProjects = function(categoryKey) {
        const container = document.getElementById('category-projects-container');
        if (!container || !CATEGORIES[categoryKey]) return;

        const projectsForCategory = sortProjectsForDisplay(Object.values(PROJECTS)
            .filter(p => p.categories.includes(categoryKey)));

        if (projectsForCategory.length === 0) {
            container.innerHTML = '<p class="empty-state">Projects coming soon.</p>';
            return;
        }

        container.innerHTML = renderCategorySection(categoryKey, projectsForCategory);
    };

    // Auto-render on page load
    document.addEventListener('DOMContentLoaded', function() {
        const hasFeaturedContainer = document.getElementById('featured-projects-container');
        const hasAllProjectsContainer = document.getElementById('all-projects-container');
        const categoryContainer = document.getElementById('category-projects-container');
        const categoryKey = categoryContainer ? categoryContainer.dataset.category : null;

        if (hasFeaturedContainer) {
            renderIndexProjects();
        }
        if (hasAllProjectsContainer) {
            renderAllProjects();
        }
        if (categoryKey) {
            renderCategoryProjects(categoryKey);
        }
        if (document.querySelector('.carousel')) {
            setTimeout(initializeCarousels, 0);
        }
    });

    /**
     * Initialize all carousels on the page
     */
    function initializeCarousels() {
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            const id = carousel.id;
            const track = carousel.querySelector('.carousel-track');
            const slides = track.querySelectorAll('.project-card-compact, .featured-project-card');
            const prevBtn = document.querySelector(`[data-carousel="${id}"].carousel-prev`);
            const nextBtn = document.querySelector(`[data-carousel="${id}"].carousel-next`);
            const dotsContainer = document.querySelector(`.carousel-dots[data-carousel="${id}"]`);
            
            if (slides.length === 0) return;
            
            let currentIndex = 0;
            let slidesPerView = getSlidesPerView();
            let maxIndex = Math.max(0, slides.length - slidesPerView);
            
            function getSlidesPerView() {
                if (window.innerWidth < 768) return 1;
                if (window.innerWidth < 1024) return 2;
                return 3;
            }
            
            // Create all dots once
            const dotsWrapper = document.createElement('div');
            dotsWrapper.style.position = 'relative';
            dotsWrapper.style.display = 'flex';
            dotsWrapper.style.gap = '0.5rem';
            dotsWrapper.style.alignItems = 'center';
            
            for (let i = 0; i < slides.length; i++) {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.setAttribute('data-index', i);
                dot.addEventListener('click', () => {
                    let targetIndex;
                    if (i < currentIndex) {
                        targetIndex = i;
                    } else if (i >= currentIndex + slidesPerView) {
                        targetIndex = i - slidesPerView + 1;
                    } else {
                        return; // Already visible
                    }
                    targetIndex = Math.max(0, Math.min(targetIndex, maxIndex));
                    goToSlide(targetIndex);
                });
                dotsWrapper.appendChild(dot);
            }
            
            // Create active oval overlay
            const activeOval = document.createElement('div');
            activeOval.classList.add('carousel-dot-active');
            dotsWrapper.appendChild(activeOval);
            
            dotsContainer.appendChild(dotsWrapper);
            
            function getTrackGap() {
                const gapValue = getComputedStyle(track).gap || '0';
                const parsed = parseFloat(gapValue);
                return Number.isFinite(parsed) ? parsed : 0;
            }

            function updateCarousel() {
                slidesPerView = getSlidesPerView();
                maxIndex = Math.max(0, slides.length - slidesPerView);
                
                const slideWidth = slides[0].offsetWidth;
                const gap = getTrackGap();
                const offset = -(currentIndex * (slideWidth + gap));
                track.style.transform = `translateX(${offset}px)`;
                
                // Update dot visibility and oval position
                const dots = dotsContainer.querySelectorAll('.carousel-dot');
                const activeOval = dotsContainer.querySelector('.carousel-dot-active');
                const visibleStart = currentIndex;
                const visibleEnd = currentIndex + slidesPerView - 1;
                
                const dotWidth = 12;
                const dotGap = 8; // 0.5rem
                let visibleDotsBeforeOval = 0;
                
                dots.forEach((dot, index) => {
                    const isVisible = index >= visibleStart && index <= visibleEnd;
                    if (isVisible) {
                        dot.style.opacity = '0';
                        dot.style.pointerEvents = 'none';
                    } else {
                        dot.style.opacity = '1';
                        dot.style.pointerEvents = 'auto';
                        if (index < visibleStart) {
                            visibleDotsBeforeOval++;
                        }
                    }
                });
                
                // Position and size the oval
                const ovalWidth = (dotWidth * slidesPerView) + (dotGap * (slidesPerView - 1));
                const leftPosition = visibleDotsBeforeOval * (dotWidth + dotGap);
                
                activeOval.style.width = `${ovalWidth}px`;
                activeOval.style.transform = `translateX(${leftPosition}px)`;
                
                // Hide/show buttons
                if (currentIndex === 0) {
                    prevBtn.style.visibility = 'hidden';
                } else {
                    prevBtn.style.visibility = 'visible';
                }
                
                if (currentIndex >= maxIndex) {
                    nextBtn.style.visibility = 'hidden';
                } else {
                    nextBtn.style.visibility = 'visible';
                }
                
                // Hide dots if all content fits in view
                if (maxIndex === 0) {
                    dotsContainer.style.display = 'none';
                } else {
                    dotsContainer.style.display = 'flex';
                }
            }
            
            function goToSlide(index) {
                currentIndex = Math.max(0, Math.min(index, maxIndex));
                updateCarousel();
            }
            
            function next() {
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    updateCarousel();
                }
            }
            
            function prev() {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            }
            
            prevBtn.addEventListener('click', prev);
            nextBtn.addEventListener('click', next);
            
            // Handle window resize
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    const newSlidesPerView = getSlidesPerView();
                    const newMaxIndex = Math.max(0, slides.length - newSlidesPerView);
                    currentIndex = Math.min(currentIndex, newMaxIndex);
                    updateCarousel();
                }, 150);
            });
            
            // Initial update
            updateCarousel();
        });
    }
    
})();
