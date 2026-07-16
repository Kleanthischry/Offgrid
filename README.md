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
├── robots.txt          # Search-engine crawl rules (set your domain)
├── sitemap.xml         # Sitemap (set your domain)
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
    └── translations.js      # EN / RU / EL translation strings (T object)
```

**Stack:** Tailwind CSS CDN · Font Awesome 6 · Google Fonts (Inter + Rajdhani) · Vanilla JS

**Theme:** The palette is derived from the logo — deep **navy** surfaces, **forest-green** primary accent, and a **gold** secondary accent. Brand tokens live in `js/tailwind.config.js` (`brand`, `gold`, `surface`); matching literals are in `css/styles.css`.

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
- [x] **`robots.txt` / `sitemap.xml`** — added (see the domain note below).
- [x] **Logo-matched theme** — palette retuned to the logo's navy / forest-green / gold.

### Must-have
- [ ] **Set the real domain** — replace `REPLACE-WITH-YOUR-DOMAIN` in `robots.txt` and `sitemap.xml`, and consider making `og:image` an absolute URL, once the deploy domain is known.
- [ ] **Wire up the contact form** — `contact.html` submits via `submitForm()` in `main.js` but has no real backend. Connect to a service such as Formspree, EmailJS, or a serverless function so enquiries actually get delivered.
- [ ] **Remove remaining equipment-brand names** — per the "don't name the equipment" positioning, brands still appear in page copy: the "trusted brands" logo rows on `index.html` and `about.html` (SMA, BYD, Victron), a testimonial on `about.html`, and several `faq.html` answers (BYD, Pylontech, Victron, SMA, Fronius). Decide whether to genericise or keep these.

### Nice-to-have
- [ ] **Expand i18n coverage** — `translations.js` covers `index.html` and `projects.html`. The other secondary pages (about, solutions, faq, contact) still render English-only text; their static copy should be added to the `T` object and tagged with `data-i18n` attributes.
- [ ] **Crop `DALY` logo out of `images/battery.jpg`** — the battery photo still shows a manufacturer logo baked into the image.
- [ ] **Deploy** — publish to a static host (GitHub Pages, Netlify, Vercel, or Cloudflare Pages). GitHub Pages setup: _Settings → Pages → Source: main branch / root_.
