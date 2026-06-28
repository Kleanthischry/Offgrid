/**
 * tailwind.config.js — Off Grid Systems
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
        // Neon green brand palette — used for CTAs, accents, and highlights
        brand: {
          50:  '#f0fff9',
          100: '#ccffe8',
          400: '#00ff88',
          500: '#00e676',
          600: '#00cc66',
          700: '#009944',
        },
        // Deep dark surface scale with green tint (darkest = 900)
        surface: {
          900: '#040b06',
          800: '#081409',
          700: '#0c1c0e',
          600: '#112513',
          500: '#162e19',
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
          '0%,100%': { boxShadow: '0 0 4px 0 rgba(0,255,136,0.5)' },
          '50%':     { boxShadow: '0 0 14px 5px rgba(0,255,136,0.15)' },
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
