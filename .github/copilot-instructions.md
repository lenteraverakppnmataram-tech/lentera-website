# AI Agent Instructions for LENTERA Project

## Project Overview
LENTERA (Layanan Edukasi dan Konsultasi Pengelolaan Keuangan) is a financial education and consulting service web application. The project is built using HTML with Tailwind CSS for styling.

## Key Technologies
- HTML5
- Tailwind CSS (via CDN)
- Custom CSS animations and effects
- Google Fonts (Poppins and Open Sans)

## Design Patterns and Conventions

### Styling Conventions
1. **Font Usage**
   - Primary font: Poppins (`font-poppins`)
   - Secondary font: Open Sans (`font-opensans`)
   - Font weights used: 300, 400, 500, 600, 700

2. **Color Scheme**
   - Primary gradient: `linear-gradient(135deg, #0B3C6F 0%, #1e5799 50%, #F9C80E 100%)`
   - Primary blue: `#0B3C6F`
   - Accent yellow: `#F9C80E`

3. **Animation Classes**
   - `.lantern-glow`: Pulsing glow effect
   - `.floating`: Smooth up-down floating animation
   - `.sparkle`: Diagonal sparkle effect
   - `.card-shadow-beautiful`: Interactive card hover effects

### Component Patterns
1. **Gradient Text**
   - Use `.gradient-text` for text with gradient background effect
   - Includes fallback color for browser compatibility

2. **Button Styling**
   - Use `.btn-beautiful` for gradient background buttons with hover effects
   - Includes overflow handling and transition effects

3. **Background Effects**
   - `.wave-bg` for wave SVG background
   - `.hero-gradient` for section background gradients

## Project Structure
The project currently consists of a single `main.html` file that includes all styling and content. This monolithic structure means all changes should be made carefully to maintain visual consistency.

## Best Practices
1. Maintain the established color scheme and gradient patterns
2. Use the defined animation classes for interactive elements
3. Follow the existing font hierarchy with Poppins for headings and Open Sans for body text
4. Preserve the responsive design approach using Tailwind's utility classes

## External Dependencies
- Tailwind CSS (via CDN): `https://cdn.tailwindcss.com`
- Google Fonts: Poppins and Open Sans families
- Element SDK: `/_sdk/element_sdk.js`