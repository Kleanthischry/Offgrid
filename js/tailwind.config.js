/**
 * tailwind.config.js - Off Grid Systems
 *
 * Extends the default Tailwind theme with project-specific design tokens.
 * Loaded synchronously after the Tailwind CDN script so these custom
 * utilities are available when the page's classes are first resolved.
 */
tailwind.config = {
  theme: {
    extend: {

      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        heading: ['Rajdhani', 'sans-serif'],
      },

      colors: {
        // Forest-green brand palette (from logo) - CTAs, accents, highlights
        brand: {
          50:  '#f2f7ee',
          100: '#dcecd0',
          400: '#8fca6f',
          500: '#6ba84e',
          600: '#4a7a3c',
          700: '#3a5f30',
        },
        // Golden accent (from logo sun) - secondary highlights
        gold: {
          400: '#f2ba45',
          500: '#e9a62b',
          600: '#c78a1f',
        },
        // Deep navy surface scale (from logo navy; darkest = 900)
        surface: {
          900: '#0b1220',
          800: '#0f1728',
          700: '#141f34',
          600: '#1a2740',
          500: '#21304e',
        },
      },

      animation: {
        'spin-slow':     'spin 18s linear infinite',
        'spin-slow-rev': 'spin 12s linear infinite reverse',
        'pulse-amber':   'pulseAmber 2.5s ease-in-out infinite',
        'float':         'float 4s ease-in-out infinite',
      },

      keyframes: {
        // Neon green glow pulse used on live-indicator dots
        pulseAmber: {
          '0%,100%': { boxShadow: '0 0 4px 0 rgba(143,202,111,0.5)' },
          '50%':     { boxShadow: '0 0 14px 5px rgba(143,202,111,0.15)' },
        },
        // Gentle vertical float used on decorative elements
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
      },

    }
  }
};
