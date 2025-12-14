# Rachit Tamrakar - Portfolio Website

A professional portfolio website showcasing projects, experience, and technical skills.

## Overview

This is a simple, single-page portfolio website built with vanilla HTML, CSS, and minimal JavaScript. It's designed to be fast, responsive, and easy to deploy.

## Structure

- `index.html` - Personal information, education, skills, experience, and contact details
- `projects.html` - Detailed showcase of technical projects
- `styles.css` - Styling and responsive design

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Clean Navigation**: Easy navigation between pages
- **Professional Layout**: Modern card-based design with hover effects
- **Fast Loading**: No external dependencies, all code is self-contained
- **Print Friendly**: Optimized for printing/PDF export

## How to Use

### Local Viewing

Simply open `index.html` in any web browser:
```bash
# From the website directory
open index.html
# or
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Deployment Options

#### GitHub Pages
1. Create a new repository on GitHub
2. Push this website folder to the repository
3. Go to Settings > Pages
4. Select the branch and folder containing these files
5. Your site will be live at `https://yourusername.github.io/repository-name`

#### Netlify
1. Create account at netlify.com
2. Drag and drop the website folder
3. Site goes live instantly with a custom URL

#### Vercel
1. Create account at vercel.com
2. Import the repository or upload files
3. Automatic deployment with custom domain support

#### Traditional Web Hosting
Upload all files to your web hosting via FTP/SFTP to the public_html or www directory.

## Customization

### Updating Content
- Edit `index.html` to update personal information, education, experience
- Edit `projects.html` to add/remove/modify projects
- Update contact information in the contact section

### Styling
- Modify `styles.css` to change colors, fonts, spacing
- Color scheme is defined in CSS variables at the top of styles.css for easy theming

### Adding Pages
1. Create new HTML file (e.g., `blog.html`)
2. Copy the header and nav structure from existing pages
3. Add link to navigation menu in all pages
4. Follow the same styling patterns

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No external dependencies
- Minimal CSS/HTML
- Fast load times (<100KB total)
- SEO friendly structure

## License

Personal portfolio - all content and projects belong to Rachit Tamrakar.
