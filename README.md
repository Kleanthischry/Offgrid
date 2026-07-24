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
├── projects.html       # Portfolio / gallery of installed off-grid systems
├── about.html          # Company story, team, testimonials
├── faq.html            # Frequently asked questions
├── contact.html        # Quote request form
├── thanks.html         # Post-form confirmation page
├── CNAME               # Custom domain for GitHub Pages (off-gridsystems.com)
├── robots.txt          # Search-engine crawl rules
├── sitemap.xml         # Sitemap (off-gridsystems.com URLs)
├── images/
│   ├── logo.jpg        # Company logo (navbar, footer, favicon, og:image)
│   ├── battery.jpg     # Install photo — lithium battery bank
│   ├── inv solis.jpg   # Install photo — home hybrid inverter
│   ├── inverter invt.jpg  # Install photo — three-phase / factory
│   ├── solis system.jpg   # Install photo — complete power room
│   └── README.md       # Notes on gallery image filenames
├── css/
│   └── styles.css      # Custom CSS (navy/green/gold theme, utilities)
└── js/
    ├── tailwind.config.js   # Tailwind theme extension (colors, fonts)
    ├── main.js              # All page behaviour (navbar, theme, i18n, form)
    ├── translations.js      # EN / RU / EL translation strings (T object)
    └── faq-i18n.js          # FAQ Q&A translations (loaded only on faq.html)
```

**Stack:** Tailwind CSS CDN · Font Awesome 6 · Google Fonts (Inter + Rajdhani) · Vanilla JS

**Theme:** The palette is derived from the logo — deep **navy** surfaces, **forest-green** primary accent, and a **gold** secondary accent. Brand tokens live in `js/tailwind.config.js` (`brand`, `gold`, `surface`); matching literals are in `css/styles.css`.

---

## Deployment

Hosted on **GitHub Pages** from the `main` branch (`/` root) at the custom domain **off-gridsystems.com** (set via the `CNAME` file).

**Deploy = push to `main`.** GitHub Pages rebuilds automatically on every push.

One-time setup (already configured):
1. **GitHub → Settings → Pages** → Source: `main` / root; Custom domain: `off-gridsystems.com`; Enforce HTTPS.
2. **Namecheap → Advanced DNS** — `A @` → `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`; `CNAME www` → `kleanthischry.github.io.`

> If you ever change the domain, update it in **four** places: `CNAME`, `robots.txt`, `sitemap.xml`, and the `og:image` tags in every `*.html`.

---

## Features

- Dark / light theme toggle (persisted in `localStorage`)
- Language switcher: English 🇺🇸 / Russian 🇷🇺 / Greek 🇬🇷 (persisted in `localStorage`)
- Scroll-reveal animations, animated counters, back-to-top button
- Mobile-responsive navbar with hamburger menu
- Contact / quote request form

---

## Tasks Left To Do

### Done
- [x] **Logo** — `images/logo.jpg` is wired into the navbar and footer (in a white chip) on every page.
- [x] **Real project images** — `projects.html` is now a gallery of actual installation photos in `images/`.
- [x] **Favicon** — `<link rel="icon">` + `apple-touch-icon` point at the logo on every page.
- [x] **`og:image`** — added to every page (points at the logo).
- [x] **`robots.txt` / `sitemap.xml`** — added, pointing at `off-gridsystems.com`.
- [x] **Logo-matched theme** — palette retuned to the logo's navy / forest-green / gold.
- [x] **Custom domain** — `CNAME` + absolute `og:image` set to `off-gridsystems.com`; DNS configured (see Deployment above).
- [x] **FAQ i18n** — all 12 Q&A translated (EN/RU/EL) in `js/faq-i18n.js`; answers use `data-i18n-html` (rich markup preserved); FAQ equipment brands genericised.
- [x] **Real contact email** — `offgridsystemscy@gmail.com` set across all pages.
- [x] **Removed fake US phone & address** — stripped the demo phone and Denver address from nav, footers, CTAs, and the contact page (site is now email-only).

### Must-have
- [ ] **Wire up the contact form** — `contact.html` submits via `submitForm()` in `main.js` but has no real backend. Connect to a service such as Formspree, EmailJS, or a serverless function so enquiries actually get delivered.
- [ ] **Remove remaining equipment-brand names** — the `faq.html` answers have been genericised, but brands still appear as the "trusted brands" logo rows on `index.html` and `about.html` (SMA, BYD, Victron) and in a testimonial on `about.html`. Decide whether to genericise or keep these.

### Nice-to-have
- [ ] **Add real phone / address (optional)** — the fake US phone (`+1 (555) 123-4567`) and address (`123 Solar Way, Denver, CO`) have been removed site-wide; the site is now email-only. Add a real Cyprus phone/address if/when you want them back (nav, footers, and the contact-page details card). Note: the orphaned `con.phone.*` / `con.hq.*` keys remain in `translations.js` for reuse.
