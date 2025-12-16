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
        
        const imageHtml = project.image 
            ? `<img src="${project.image}" alt="${project.imageAlt}" onerror="this.style.display='none'">`
            : `<div class="placeholder-image">${project.placeholder}</div>`;
        
        const tagsHtml = project.tags
            .map(tag => `<span>${tag}</span>`)
            .join('\n                            ');
        
        const linkTextHtml = hasLink 
            ? '<span class="project-link-compact">Learn More →</span>'
            : '';
        
        return `
                <${elementType} ${linkAttr} class="project-card-compact${linkClass}">
                    <div class="project-card-image">
                        ${imageHtml}
                    </div>
                    <div class="project-card-body">
                        <h3>${project.title}</h3>
                        <p class="project-meta-compact">${project.organization} • ${project.timeframe}</p>
                        <p class="impact-line">${project.impact}</p>
                        <div class="project-tags-compact">
                            ${tagsHtml}
                        </div>
                        ${linkTextHtml}
                    </div>
                </${elementType}>`;
    }

    /**
     * Renders a category section with projects
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
        
        return `
        <section class="${sectionClass}">
            <h2 class="section-title">${category.title}</h2>
            <div class="projects-card-grid">
                ${projectsHtml}
            </div>
        </section>`;
    }

    /**
     * Renders projects for the index page (featured only)
     */
    window.renderIndexProjects = function() {
        const featuredProjects = Object.values(PROJECTS)
            .filter(p => p.categories.includes('featured'));
        
        const container = document.getElementById('featured-projects-container');
        if (!container) return;
        
        const subtitle = '<p class="section-subtitle">Highlights from my portfolio - <a href="projects.html">view all projects →</a></p>';
        const projectsHtml = featuredProjects
            .map(project => renderProjectCard(project))
            .join('\n');
        
        container.innerHTML = `
            <h2>Featured Work</h2>
            ${subtitle}
            <div class="projects-card-grid">
                ${projectsHtml}
            </div>`;
    };

    /**
     * Renders all projects organized by category for projects page
     */
    window.renderAllProjects = function() {
        const container = document.getElementById('all-projects-container');
        if (!container) return;
        
        const sections = [];
        
        // Featured section
        const featuredProjects = Object.values(PROJECTS)
            .filter(p => p.categories.includes('featured'));
        sections.push(renderCategorySection('featured', featuredProjects));
        
        // Industrial section
        const industrialProjects = Object.values(PROJECTS)
            .filter(p => p.categories.includes('industrial') && !p.categories.includes('featured'));
        // Add vision system with extra tags for industrial section
        const visionWithExtraTags = {...PROJECTS.visionSystem, tags: [...PROJECTS.visionSystem.tags, 'Multithreading']};
        industrialProjects.unshift(visionWithExtraTags);
        sections.push(renderCategorySection('industrial', industrialProjects));
        
        // Rocketry section
        const rocketryProjects = Object.values(PROJECTS)
            .filter(p => p.categories.includes('rocketry') && !p.categories.includes('featured'));
        // Add Solaris Mk II with extra tags for rocketry section
        const solarisMk2WithExtraTags = {...PROJECTS.solarisMk2, 
            impact: 'Won Jim Furfaro Award at IREC 2025 for 4kN hybrid engine with complete ground station electronics',
            tags: ['Python', 'STM32', 'MQTT', 'RS422', 'SCADA']};
        rocketryProjects.unshift(solarisMk2WithExtraTags);
        sections.push(renderCategorySection('rocketry', rocketryProjects));
        
        // Robotics section
        const roboticsProjects = Object.values(PROJECTS)
            .filter(p => p.categories.includes('robotics') && !p.categories.includes('featured'));
        roboticsProjects.unshift(PROJECTS.fruitRobot);
        sections.push(renderCategorySection('robotics', roboticsProjects));
        
        container.innerHTML = sections.join('\n');
    };

    // Auto-render on page load
    document.addEventListener('DOMContentLoaded', function() {
        if (document.getElementById('featured-projects-container')) {
            renderIndexProjects();
        }
        if (document.getElementById('all-projects-container')) {
            renderAllProjects();
        }
    });
})();
