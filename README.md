# Off Grid Systems — Website

Static multi-page website for an off-grid solar energy company. No build step required — open any `.html` file directly in a browser.

---

## Running / Testing

### Quickstart (zero setup)

1. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
2. Navigate between pages using the navbar links.

That's it. There is no server, bundler, or package manager involved.

### Recommended: local dev server

Opening `file://` URLs works, but a local server avoids any CORS quirks with fonts or scripts:

**Using VS Code Live Server extension**
- Right-click `index.html` → _Open with Live Server_

**Using Node `serve`**
```bash
npx serve .
```
Then visit `http://localhost:3000`.

**Using Python**
```bash
python -m http.server 8080
```
Then visit `http://localhost:8080`.

---

## Project Structure

```
/
├── index.html          # Home page
├── solutions.html      # Products & packages
├── projects.html       # Portfolio / case studies
├── about.html          # Company story, team, testimonials
├── contact.html        # Quote request form
├── thanks.html         # Post-form confirmation page
├── logo.png            # ← MISSING (see tasks below)
├── css/
│   └── styles.css      # Custom CSS (dark theme, utilities)
└── js/
    ├── tailwind.config.js   # Tailwind theme extension (colors, fonts)
    ├── main.js              # All page behaviour (navbar, theme, i18n, form)
    └── translations.js      # EN / RU / EL translation strings (T object)
```

**Stack:** Tailwind CSS CDN · Font Awesome 6 · Google Fonts (Inter + Rajdhani) · Vanilla JS

---

## Features

- Dark / light theme toggle (persisted in `localStorage`)
- Language switcher: English 🇺🇸 / Russian 🇷🇺 / Greek 🇬🇷 (persisted in `localStorage`)
- Scroll-reveal animations, animated counters, back-to-top button
- Mobile-responsive navbar with hamburger menu
- Contact / quote request form

---

## Tasks Left To Do

### Must-have
- [ ] **Add `logo.png`** — save the company logo badge as `logo.png` in the project root. Until then the navbar falls back to the icon + text lockup automatically.
- [ ] **Wire up the contact form** — `contact.html` submits via `submitForm()` in `main.js` but has no real backend. Connect to a service such as Formspree, EmailJS, or a serverless function so enquiries actually get delivered.
- [ ] **Add `og:image` meta tags** — `index.html` and other pages have `og:type` but no `og:image` or `og:url`, which limits social sharing previews.

### Nice-to-have
- [ ] **Expand i18n coverage** — `translations.js` covers the home page (`index.html`). The secondary pages (about, solutions, projects, contact) still render English-only text; their static copy should be added to the `T` object and tagged with `data-i18n` attributes.
- [ ] **Real project images** — `projects.html` likely uses placeholder gradients or stock images; replace with actual installation photos.
- [ ] **Favicon** — no `favicon.ico` or `<link rel="icon">` is present; add one for browser tab / bookmark appearance.
- [ ] **`robots.txt` / `sitemap.xml`** — add before deploying publicly so search engines crawl correctly.
- [ ] **Deploy** — publish to a static host (GitHub Pages, Netlify, Vercel, or Cloudflare Pages). GitHub Pages setup: _Settings → Pages → Source: main branch / root_.
