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
        // Amber brand palette — used for CTAs, accents, and highlights
        brand: {
          50:  '#fffbeb',
          100: '#fef3c7',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        // Dark surface scale — the main UI layer stack (darkest = 900)
        surface: {
          900: '#09090f',
          800: '#111118',
          700: '#18181f',
          600: '#21212b',
          500: '#2a2a35',
        },
      },

      animation: {
        'spin-slow':     'spin 18s linear infinite',
        'spin-slow-rev': 'spin 12s linear infinite reverse',
        'pulse-amber':   'pulseAmber 2.5s ease-in-out infinite',
        'float':         'float 4s ease-in-out infinite',
      },

      keyframes: {
        // Soft amber glow pulse used on live-indicator dots
        pulseAmber: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(245,158,11,0)' },
          '50%':     { boxShadow: '0 0 0 8px rgba(245,158,11,0)' },
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
