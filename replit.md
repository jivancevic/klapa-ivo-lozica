# Klapa Ivo Lozica Website

## Overview

This is a bilingual promotional website for Klapa Ivo Lozica, a Croatian acapella group specializing in traditional Dalmatian music. The site serves as a digital presence to showcase their musical heritage, performances, achievements, and booking information for tourists and cultural enthusiasts visiting Korčula.

## System Architecture

### Frontend Architecture
- **Static Single-Page Application (SPA)**: Built with vanilla HTML, CSS, and JavaScript
- **No Framework Dependencies**: Pure web technologies for maximum compatibility and performance
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Progressive Enhancement**: Core functionality works without JavaScript

### Technology Stack
- **HTML5**: Semantic markup with proper SEO meta tags and accessibility features
- **CSS3**: Modern styling with custom properties, animations, and responsive design
- **Vanilla JavaScript**: Client-side interactions, internationalization, and dynamic content
- **External Libraries**:
  - Google Fonts (Playfair Display, Montserrat)
  - Font Awesome icons
  - AOS (Animate On Scroll) library

## Key Components

### 1. Navigation System
- Fixed translucent navigation bar with smooth scrolling
- Hamburger menu for mobile devices
- Language toggle functionality (English/Croatian)
- Hover effects with red underline (#E53935)

### 2. Internationalization (i18n)
- **Translation System**: JSON-based translations stored in `js/translations.js`
- **Dynamic Content Switching**: Real-time language switching without page reload
- **SEO Support**: Proper hreflang attributes for search engines
- **Default Language**: English with Croatian as alternative

### 3. Visual Components
- **Hero Section**: Full-viewport background with color overlay
- **Timeline Component**: Horizontal awards timeline with alternating animations
- **Card Layouts**: Guest program features with icon-based design
- **Image Gallery**: Placeholder system for easy asset replacement

### 4. Animation System
- **AOS Integration**: Scroll-triggered animations for enhanced user experience
- **Custom Animations**: Smooth transitions and hover effects
- **Performance Optimized**: Once-only animations to prevent performance issues

## Data Flow

### Language Switching Process
1. User clicks language toggle (ENG/HR)
2. JavaScript updates `currentLanguage` global variable
3. `loadTranslations()` function updates all elements with `data-i18n` attributes
4. Language preference stored for session persistence

### Navigation Flow
1. User interacts with navigation links
2. Smooth scroll behavior navigates to target sections
3. Mobile menu automatically closes after navigation
4. Active section highlighting updates based on scroll position

### Content Loading
1. Static HTML provides base structure and content
2. JavaScript enhances with dynamic features on DOM ready
3. CSS handles responsive layout and visual presentation
4. External assets loaded asynchronously for performance

## External Dependencies

### CDN Resources
- **Google Fonts**: Typography (Playfair Display, Montserrat)
- **Font Awesome**: Icon library for UI elements
- **AOS Library**: Scroll animations

### Third-Party Integrations
- **SEO Optimization**: Open Graph meta tags for social media sharing
- **Analytics Ready**: Structure prepared for Google Analytics integration
- **Performance**: Preconnect hints for faster font loading

## Deployment Strategy

### Optimized Node.js Server
- **Production Server**: Custom Node.js HTTP server for fast health checks
- **Health Check Endpoint**: `/health` responds in <50ms for deployment systems
- **Static File Serving**: Efficient serving of HTML, CSS, JS, and image assets
- **Graceful Shutdown**: Proper SIGTERM handling for deployment environments
- **Performance**: Root endpoint responds in ~30ms for quick health checks

### File Structure
```
/
├── index.html (main entry point)
├── server.js (optimized Node.js server)
├── css/styles.css (all styling)
├── js/
│   ├── script.js (main functionality)
│   └── translations.js (i18n content)
└── assets/ (images and static content)
```

### Performance Considerations
- Minimal JavaScript for fast loading
- CSS optimization with custom properties
- Image placeholder system for easy optimization
- Lazy loading ready structure

## Changelog

- June 26, 2025: Initial setup
- June 28, 2025: Fixed deployment health check issues by replacing Python HTTP server with optimized Node.js server for faster response times (<50ms)

## User Preferences

Preferred communication style: Simple, everyday language.