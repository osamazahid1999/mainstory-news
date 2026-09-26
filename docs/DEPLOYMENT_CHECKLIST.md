# Main Story — Production Deployment Checklist

Use this checklist before deploying `feature/initial-platform` to production. Do not merge to `main` until the checklist is complete and approved.

## 1. Required environment variables

Set these in the production hosting environment:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=<real Sanity project id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_GTM_ID=<optional GTM container id>
NEXT_PUBLIC_GA_MEASUREMENT_ID=<optional direct GA4 id; leave empty when GTM is used>
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<Google Search Console verification value>
```

Do not add Sanity write tokens to the public web deployment unless a future server-only feature explicitly requires them.

## 2. Sanity production checks

- Confirm the production dataset is `production`.
- Confirm required authors, categories, homepage settings and site settings are published.
- Confirm every production article has a unique slug, category, author, publish date, featured image and alt text.
- Confirm Sanity CORS includes the production website origin: `https://mainstorynews.com`.
- Keep localhost origins only for development.
- Confirm Studio access requires authenticated Sanity accounts.

## 3. Build and code validation

From the release branch:

```bash
npm install
npm run build
```

The release is not ready if compilation, type checking, static generation or route generation fails.

Verify these routes are present in the build output:

- `/`
- `/news/[slug]`
- `/category/[slug]`
- `/author/[slug]`
- `/search`
- `/studio/[[...tool]]`
- `/sitemap.xml`
- `/news-sitemap.xml`
- `/rss.xml`
- `/robots.txt`
- `/manifest.webmanifest`

## 4. Public-site QA

Test desktop, tablet and mobile widths.

- Homepage lead story and supporting stories render correctly.
- Story images do not crop important content unexpectedly.
- No text, cards or navigation items overlap.
- Dark, light and system appearance modes work.
- Comfortable and wide layouts work.
- Mobile navigation opens, closes and navigates correctly.
- Search overlay and search results work.
- Article body, inline images, captions, corrections and related stories render correctly.
- Article sidebar falls back to Latest News when the category has no related stories.
- Category pages load CMS stories and fallback content correctly.
- Author pages load profile information and published stories.
- All external/social links open the intended destination.

## 5. SEO and discovery checks

After deployment, confirm these return HTTP 200:

- `https://mainstorynews.com/sitemap.xml`
- `https://mainstorynews.com/news-sitemap.xml`
- `https://mainstorynews.com/rss.xml`
- `https://mainstorynews.com/robots.txt`

For at least one published article, inspect page source and confirm:

- unique title and meta description
- canonical URL
- Open Graph metadata
- Twitter/X card metadata
- `NewsArticle` JSON-LD
- breadcrumb JSON-LD
- published and modified dates
- author name and author URL when available

Submit the sitemap in Google Search Console after the production domain is live.

## 6. Analytics validation

Use either GTM or direct GA4.

Preferred setup: configure `NEXT_PUBLIC_GTM_ID` and manage GA4 through GTM. When GTM is configured, the direct GA4 loader is disabled automatically to avoid duplicate pageviews.

Validate these newsroom events:

- `article_view` — slug, category, author
- `category_view`
- `author_view`
- `search` — query and result count
- `story_click` — slug, category, author
- `category_click`
- `social_click`
- `outbound_click`

Use GA4 DebugView or GTM Preview before launch.

## 7. Security checks

Production responses should include:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: SAMEORIGIN`
- restricted `Permissions-Policy`
- `Cross-Origin-Opener-Policy`
- `Strict-Transport-Security` on the HTTPS production build
- no `X-Powered-By` header

Do not run `npm audit fix --force` on the release branch without reviewing the major dependency upgrades it proposes.

## 8. Domain and HTTPS

- Point `mainstorynews.com` to the selected production host.
- Configure `www.mainstorynews.com` and choose one canonical host.
- Redirect the non-canonical host to the canonical host.
- Confirm SSL/TLS is valid.
- Confirm HTTP redirects to HTTPS.
- Confirm there are no mixed-content requests.

## 9. Performance review

Run Lighthouse on the homepage and a representative article after production deployment.

Review:

- LCP
- CLS
- INP
- image sizing
- mobile rendering
- JavaScript weight
- third-party analytics impact

The embedded Sanity Studio is intentionally much heavier than the public site and should be evaluated separately.

## 10. Editorial launch checks

Before opening the site publicly:

- Replace development/test articles with approved editorial content.
- Remove placeholder/gibberish titles, excerpts and images.
- Confirm breaking-news content is intentional.
- Confirm author bios and public contact information are approved.
- Confirm correction workflow and editorial ownership.
- Confirm privacy, terms, contact and editorial-policy pages required by the publisher are available.

## 11. Release approval

Before merging to `main`:

- final production build passes
- GitHub Actions build passes
- public QA passes
- analytics verification passes
- SEO endpoints pass
- production environment variables are set
- Sanity CORS includes production domain
- deployment target is confirmed
- explicit approval to merge/deploy has been given
