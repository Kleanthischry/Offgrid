/**
 * main.js - Off Grid Systems
 *
 * All page behaviour in one file, grouped into logical sections:
 *   1. Navbar scroll effect + back-to-top button
 *   2. Mobile hamburger menu
 *   3. Active nav-link highlight (IntersectionObserver)
 *   4. Scroll-reveal fade-in animation
 *   5. Animated number counters
 *   6. Dark / light theme toggle
 *   7. Language switcher
 *   8. Contact / quote form
 *
 * Depends on js/translations.js (loaded first) for the T and LANG_META globals.
 * Functions called via HTML onclick attributes (toggleTheme, setLang,
 * toggleLangMenu, submitForm) must stay in global scope - do not wrap in
 * a module or IIFE unless you also export them to window.
 */

/* =========================================================================
   1. NAVBAR - scroll-triggered frosted-glass effect + back-to-top button
   ========================================================================= */

const navbar = document.getElementById('navbar');

const onScroll = () => {
  // Add .scrolled after 60 px to activate the glass background (see CSS)
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Show the back-to-top button only after scrolling 400 px
  const backBtn = document.getElementById('back-to-top');
  backBtn.classList.toggle('hidden', window.scrollY < 400);
  backBtn.classList.toggle('flex',   window.scrollY >= 400);
};

window.addEventListener('scroll', onScroll, { passive: true });


/* =========================================================================
   2. MOBILE HAMBURGER MENU
   ========================================================================= */

const hamburger     = document.getElementById('hamburger');
const hamburgerIcon = document.getElementById('hamburger-icon');
const mobileMenu    = document.getElementById('mobile-menu');
let menuOpen        = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  mobileMenu.setAttribute('aria-hidden', String(!menuOpen));
  // Swap between ☰ and × icons
  hamburgerIcon.className = menuOpen ? 'fas fa-xmark text-xl' : 'fas fa-bars text-xl';
});

// Auto-close when a nav link inside the mobile menu is tapped
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburgerIcon.className = 'fas fa-bars text-xl';
  });
});


/* =========================================================================
   3. ACTIVE NAV-LINK HIGHLIGHT
   On multi-page sites each nav link points to another page, so we mark the
   active link by matching the current page name against each href.
   The IntersectionObserver is kept for any remaining same-page #anchor links.
   ========================================================================= */

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav .nav-link');

// Normalise a path or href to a bare page name; '' (home) becomes 'index'.
// Works with both extensionless URLs ("/about") and legacy ".html" links.
const pageName = p => (p || '').split('#')[0].split('/').pop().replace(/\.html$/, '') || 'index';
const currentPage = pageName(window.location.pathname);
navLinks.forEach(link => {
  if (pageName(link.getAttribute('href')) === currentPage) link.classList.add('active');
});

// Keep the observer for any same-page #anchor links (only toggles those links)
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        // Only update links that are pure #anchors - leave page links alone
        if (href.startsWith('#')) {
          link.classList.toggle('active', href === '#' + id);
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(section => navObserver.observe(section));


/* =========================================================================
   4. SCROLL-REVEAL FADE-IN
   Elements with class "reveal" start at opacity 0 + translateY(24px).
   When they enter the viewport, .in is added to trigger the CSS transition.
   ========================================================================= */

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target); // animate once; stop watching
    }
  });
}, {
  threshold:  0.1,
  rootMargin: '0px 0px -40px 0px', // trigger slightly before the element fully enters
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* =========================================================================
   5. ANIMATED NUMBER COUNTERS
   Elements need:  class="counter"
                   data-target="500"     (final number)
                   data-suffix="+"       (optional text appended after number)
                   data-decimals="1"     (optional decimal places, default 0)
   ========================================================================= */

function animateCounter(el) {
  const target   = parseFloat(el.dataset.target);
  const suffix   = el.dataset.suffix   || '';
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const duration = 1800; // total animation time in ms
  const step     = 16;   // update interval (~60 fps)
  const steps    = duration / step;
  let   current  = 0;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current.toFixed(decimals) + suffix;
  }, step);
}

// Start each counter the first time it scrolls into view
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true'; // flag so it only fires once
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));


/* =========================================================================
   6. DARK / LIGHT THEME
   Preference is stored in localStorage under the key "theme".
   The CSS file contains all visual overrides under html.light { ... }.
   ========================================================================= */

// Apply saved preference immediately on load (IIFE to avoid polluting scope)
(function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);
})();

function applyTheme(theme) {
  const html    = document.documentElement;
  const icon    = document.getElementById('theme-icon');
  const mobIcon = document.getElementById('mob-theme-icon');

  if (theme === 'light') {
    html.classList.add('light');
    if (icon)    icon.className    = 'fas fa-sun text-sm';
    if (mobIcon) mobIcon.className = 'fas fa-sun text-sm';
  } else {
    html.classList.remove('light');
    if (icon)    icon.className    = 'fas fa-moon text-sm';
    if (mobIcon) mobIcon.className = 'fas fa-moon text-sm';
  }

  localStorage.setItem('theme', theme);
}

// Called by onclick="toggleTheme()" on the theme button in the HTML
function toggleTheme() {
  const isDark = !document.documentElement.classList.contains('light');
  applyTheme(isDark ? 'light' : 'dark');
}


/* =========================================================================
   7. LANGUAGE SWITCHER
   Uses data-i18n attributes in the HTML as translation keys.
   Locale is persisted in localStorage under the key "lang".
   T and LANG_META are defined in js/translations.js (loaded before this file).
   ========================================================================= */

// Restore the last-used language, or default to English
let currentLang = localStorage.getItem('lang') || 'en';

// Walk every [data-i18n] element and update its text content
function applyTranslations(lang) {
  const strings = T[lang] || T.en; // fall back to English if locale is missing
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (strings[key] !== undefined) el.textContent = strings[key];
  });
  // data-i18n-html: rich content (paragraphs, lists, <strong>) set as innerHTML
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (strings[key] !== undefined) el.innerHTML = strings[key];
  });
  document.documentElement.lang = lang; // keep <html lang="…"> in sync
}

// Called by onclick="setLang('en')" etc. on the language buttons
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  // Refresh the flag + code shown on the desktop switcher button
  const meta   = LANG_META[lang];
  const flagEl = document.getElementById('lang-flag');
  const codeEl = document.getElementById('lang-code');
  if (flagEl) flagEl.textContent = meta.flag;
  if (codeEl) codeEl.textContent = meta.code;

  // Close the dropdown after selection
  const menu    = document.getElementById('lang-menu');
  const chevron = document.getElementById('lang-chevron');
  if (menu)    menu.classList.add('hidden');
  if (chevron) chevron.style.transform = '';

  applyTranslations(lang);
}

// Called by onclick="toggleLangMenu()" on the desktop switcher button
function toggleLangMenu() {
  const menu    = document.getElementById('lang-menu');
  const chevron = document.getElementById('lang-chevron');
  const isOpen  = !menu.classList.contains('hidden');
  menu.classList.toggle('hidden', isOpen);
  if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
}

// Close the dropdown when the user clicks anywhere outside the switcher widget
document.addEventListener('click', e => {
  const switcher = document.getElementById('lang-switcher');
  if (switcher && !switcher.contains(e.target)) {
    const menu    = document.getElementById('lang-menu');
    const chevron = document.getElementById('lang-chevron');
    if (menu)    menu.classList.add('hidden');
    if (chevron) chevron.style.transform = '';
  }
});

// Apply stored language on first load
setLang(currentLang);


/* =========================================================================
   8. CONTACT / QUOTE FORM
   Shows a loading spinner during submission, then a success message.
   Replace the setTimeout block with a real fetch() call to your backend.
   ========================================================================= */

// Called by onsubmit="submitForm(event)" on the <form> element
async function submitForm(e) {
  e.preventDefault();

  const form    = document.getElementById('quote-form');
  const btn     = document.getElementById('submit-btn');
  const icon    = document.getElementById('btn-icon');
  const text    = document.getElementById('btn-text');
  const success = document.getElementById('form-success');

  // ── Loading state ──
  btn.disabled     = true;
  icon.className   = 'fas fa-spinner fa-spin text-xs relative z-10';
  text.textContent = 'SENDING…';

  try {
    const res = await fetch('https://formspree.io/f/mvzjozqj', {
      method:  'POST',
      body:    new FormData(form),
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      window.location.href = 'thanks';
    } else {
      throw new Error('Server error');
    }
  } catch {
    icon.className   = 'fas fa-exclamation-triangle text-xs relative z-10';
    text.textContent = 'FAILED - TRY AGAIN';
    btn.disabled     = false;
  }
}
