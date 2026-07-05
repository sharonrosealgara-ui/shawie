# Deploying Sharon Rose — Portfolio

This project is a **static site** — a set of HTML files, `support.js`, and an `assets/` folder. The entry point is `index.html`, which opens **Portfolio Hub**. Every project page links to the others by filename, so the whole folder deploys as-is.

Pages included: Portfolio Hub · Digital Solutions Studio (Portfolio) · Shawie Bakes & Events · Shawie Admin · Shawie Portal · Shawie Auth · Shawie Blog · Shawie Architecture · Canva Wedding Invitation guide.

---

## Option 1 — Netlify (easiest, recommended)

**Drag-and-drop:**
1. Download the whole project folder.
2. Go to **app.netlify.com/drop**.
3. Drag the folder onto the page. You get a live URL in seconds (e.g. `sharonrose.netlify.app`).
4. In Netlify → Site settings → Domain, you can rename it or add a custom domain.

A `netlify.toml` is already included, so no build settings are needed.

**From GitHub (auto-deploy on every push):** connect the repo (Option 2) in Netlify → "Add new site" → "Import from Git". Publish directory: `.` (root). No build command.

---

## Option 2 — GitHub + GitHub Pages

1. Create a new repository on github.com.
2. Upload the project files (drag them into the repo's "Add file → Upload files", or use git):
   ```
   git init
   git add .
   git commit -m "Sharon Rose portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
   git push -u origin main
   ```
3. Repo → **Settings → Pages** → Source: `main` branch, `/ (root)` → Save.
4. Your site goes live at `https://YOUR-USERNAME.github.io/portfolio/`.

> Tip: filenames contain spaces (e.g. `Shawie Admin.dc.html`). GitHub Pages and Netlify handle these fine. If you ever see a broken link, it's a space-encoding issue — tell me and I'll rename files to hyphenated versions and rewire the links.

---

## Option 3 — WordPress

WordPress runs PHP, so these standalone HTML pages are added **as static files**, not as a theme:

**A. Embed the standalone file (simplest):**
1. Use the bundled single-file version `Sharon Rose - Portfolio.html` (everything inlined).
2. In WordPress, upload it via **Media** or FTP to `/wp-content/uploads/`.
3. Create a page and add a **Custom HTML block** with an iframe:
   ```html
   <iframe src="/wp-content/uploads/Sharon-Rose-Portfolio.html"
           style="width:100%;height:100vh;border:0"></iframe>
   ```

**B. Full multi-page site under a subfolder:**
1. Via FTP/cPanel File Manager, upload the whole project folder to your site root, e.g. `/portfolio/`.
2. Visit `https://yourdomain.com/portfolio/` — it serves independently of WordPress.
3. Link to it from your WordPress menu (Appearance → Menus → Custom Link).

> WordPress note: WordPress can't "edit" these pages from its dashboard — they're self-contained designs. For a natively-editable WordPress build, the pages would need to be rebuilt as a theme/blocks (a separate development task).

---

## Already wired & real
- **WhatsApp** buttons → `wa.me/639369037613`
- **Calendly** → `calendly.com/sharonrosealgara/30min`
- **Email** → `mailto:sharonrosealgara@gmail.com`
- **Shawie Auth** sign-up & password-reset → compose a notification email to `sharonrosealgara@gmail.com`

## Contact form → real submissions (already wired for Netlify)
The Shawie Auth **sign-up** and **password-reset** forms are wired as **Netlify Forms**. Once this site is deployed on Netlify, every submission is captured under **Netlify dashboard → Forms** and can email you automatically:
1. Deploy to Netlify (Option 1 above).
2. Netlify auto-detects the forms (`shawie-signup`, `password-reset`, `contact`) from `index.html`.
3. In **Site settings → Forms → Form notifications**, add an email notification to `sharonrosealgara@gmail.com`.

Before deploy (opening the file locally), the same forms fall back to opening a pre-filled email to you via `mailto:` — so nothing is ever lost.
