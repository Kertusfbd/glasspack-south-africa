# Alliance Glass Pack — Website

Static HTML/CSS/JS site, no build step, no framework, no dependencies to install.
Everything in this folder is ready to upload as-is.

## Deploying

Upload the **contents** of this folder to your web root — not the folder itself.
`index.html` needs to sit directly at the domain root (e.g. `public_html/index.html`
on most cPanel/Hostinger-style hosting), not inside a subfolder like
`public_html/site/index.html`, or all the internal links will break.

## File structure

```
index.html                      Home
about.html                      About
markets.html                    Markets (Food & Bev / Spirits & Wine / Beauty)
capabilities.html               Capabilities (Stock, NPD, Decoration)
documentation.html              Documentation hub (links to Privacy Policy & T&C)
privacy-policy.html             Privacy Policy — full readable page
terms-and-conditions.html       Terms & Conditions — full readable page
contact.html                    Contact page + enquiry form
blog.html                       Resources/blog listing page
blog-wine-bottle-shapes.html    Article
blog-glass-vs-plastic.html      Article
blog-cap-closure-guide.html     Article

style.css                       ALL styling for every page — single shared stylesheet
script.js                       Nav scroll effect, scroll-reveal animations, form banner logic

images/                         All photos, logo files, and the NPD illustration
documents/                      privacy-policy.pdf and terms-and-conditions.pdf (see below)

sitemap.xml                     For search engines — update if the domain changes
robots.txt                      For search engines — update if the domain changes
```

Every page is a self-contained HTML file with its own `<head>` (title, meta
description, JSON-LD schema). There's no templating — editing shared elements
like the nav or footer means editing them in each HTML file individually. This
is intentional (kept simple, no build tools required) but worth knowing before
a global nav change turns into 12 find-and-replace edits.

## Before going live — things to check

1. **Domain in canonical/OG tags, sitemap.xml, and robots.txt** — currently set to
   `https://www.allianceglasspack.com/`. If the live domain differs, this needs
   updating (a find-and-replace across all `.html` files plus the two root files
   covers it).

2. **Clean URLs (no .html extension) — requires `.htaccess`.** Every internal
   link now points to e.g. `/markets` instead of `/markets.html`. This only
   works if the `.htaccess` file at the root of this folder is uploaded
   alongside everything else — it's what tells the Apache server to serve
   `markets.html` when someone requests `/markets`, and to redirect anyone
   who lands on `/markets.html` directly back to the clean version. If your
   host doesn't run Apache (Hostinger does), this file needs to be swapped
   for the equivalent config on whatever server software is actually in use.

3. **Contact form activation (one-time step)** — the form in `contact.html` posts
   to FormSubmit (a free third-party form-relay service, no backend needed). The
   **first ever submission** from the live site triggers a confirmation email to
   `nitin@glasspack.co` that must be clicked to activate delivery. Until that's
   done, submissions will silently not arrive. After that, every submission
   emails both `nitin@glasspack.co` and `Jessica.ist@glasspack.co`, and
   auto-replies to the sender with contact details as a fallback.

4. **PDF documents are password-protected against editing, not against opening.**
   Both PDFs in `/documents` open freely with no password, but can't be edited
   without an owner password (Nitin has it). See `documents/README.txt` for
   details if either document ever needs to be updated.

5. **Fonts load from Google Fonts CDN** (`fonts.googleapis.com`) — this requires
   the live site to have outbound access to that domain, which is standard on
   virtually all hosting but worth knowing if there's an unusually locked-down
   firewall/CSP in place.

6. **Submit `sitemap.xml` to Google Search Console** once live — this is what
   actually gets the site crawled quickly rather than waiting for organic
   discovery.

## Making content edits

- **Text content**: edit directly in the relevant `.html` file — it's plain
  readable markup, no build step to re-run afterward.
- **Images**: swap files in `/images` (keep the same filename to avoid needing
  to update HTML/CSS references, or update both if renaming).
- **Colors/fonts/spacing**: all in `style.css`, organized in sections with
  comment headers (e.g. `/* HERO */`, `/* MARKETS PAGE */`) roughly in the order
  pages appear in the nav.
- **Adding a new blog article**: easiest to duplicate one of the existing
  `blog-*.html` files as a starting template (nav/footer/schema structure is
  already correct), swap the content, then add a card for it to `blog.html`
  and a `<url>` entry to `sitemap.xml`.
