---
name: seo-audit
description: Audit and improve SEO for apps/web. Use when adding new pages, preparing a public release, or when the user asks about search ranking, meta tags, structured data, or Core Web Vitals.
source: https://github.com/coreyhaines31/marketingskills --skill seo-audit
apps: [web]
---

## Instructions

1. Verify every page has a unique, descriptive `<title>` tag (50–60 characters) via Next.js `generateMetadata`.
2. Confirm each page has a unique `<meta name="description">` (150–160 characters).
3. Validate heading hierarchy: exactly one `<h1>` per page, logically nested `h2`→`h3`.
4. Ensure all images have descriptive `alt` text — empty `alt=""` only for decorative images.
5. Verify canonical URLs are set (`<link rel="canonical" href="...">`) on all indexable pages.
6. Check that `robots.txt` and `sitemap.xml` are present and correct in the `apps/web/public/` or Next.js metadata exports.
7. Add JSON-LD structured data (`Organization`, `WebSite`, `BreadcrumbList`) to applicable pages.
8. Measure Core Web Vitals (LCP, CLS, INP) via Lighthouse in the browser agent and document the scores.
9. Ensure Open Graph tags (`og:title`, `og:description`, `og:image`) are present for all shareable pages.
10. Confirm no `noindex` directives are leaking to production pages from development configs.

## Trigger Conditions

- User asks to "improve SEO", "fix meta tags", "add structured data", or "check search ranking"
- Shipping a new public-facing page in `apps/web`
- Pre-launch marketing site review
- Running Core Web Vitals performance audit
- Any page in `apps/web/app/` that is publicly indexable
