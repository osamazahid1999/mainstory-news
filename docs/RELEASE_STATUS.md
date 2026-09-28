# Main Story — Release Status

Branch: `feature/initial-platform`

This document separates verified engineering work from production-only checks that still require real deployment values or manual review.

## Verified in code / CI

- Next.js 15 production build configuration is in place.
- TypeScript validation is enabled during `next build`.
- Sanity Studio is embedded at `/studio`.
- Homepage, article, category, author and search routes are implemented.
- Search queries published Sanity articles with mock fallback.
- Breaking News is driven by Sanity and supports scheduling, priority and links.
- Article SEO includes canonical metadata, Open Graph, Twitter/X metadata and NewsArticle JSON-LD.
- Author pages include Person structured data.
- Organization-level NewsMediaOrganization structured data is present.
- Standard sitemap, Google News sitemap, RSS and robots routes are implemented.
- GA4 and GTM integrations are environment-driven.
- Newsroom analytics events are implemented.
- Production security headers are configured.
- Public About, Editorial Policy, Corrections and Contact routes exist.
- Newsletter UI does not accept submissions unless a provider URL is configured.
- Footer social links are driven by Sanity Site Settings.
- PR remains a draft and `main` has not been merged.

## Production values still required

Set these on the production host as applicable:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_NEWSLETTER_SIGNUP_URL=
```

Use GTM or direct GA4. If GTM is configured, the direct GA4 loader is disabled automatically.

## Manual checks still required before deployment approval

- Run `git pull`, `npm install` and `npm run build` on the final branch snapshot.
- Test homepage, article, category, author, search and Studio routes locally.
- Test desktop, tablet and mobile widths.
- Verify light, dark and system appearance modes.
- Verify wide and comfortable layouts.
- Publish real Sanity content and remove development/test stories before launch.
- Configure the production Sanity CORS origin for `https://mainstorynews.com`.
- Configure Search Console and validate ownership.
- Validate GTM/GA4 events in Preview/DebugView.
- Set the public contact email and approved social links in Sanity Site Settings.
- Connect the newsletter provider if newsletter signup should be enabled at launch.
- Finalize publisher-specific Privacy Policy and Terms language.
- Point DNS and confirm canonical host, SSL and HTTP-to-HTTPS redirects.
- Run Lighthouse against the deployed homepage and at least one article.
- Confirm sitemap, news sitemap, RSS and robots return HTTP 200 in production.
- Confirm no mixed-content requests or browser console errors.
- Obtain explicit approval before merging or deploying.

## Release gate

Do not treat the project as deployed or merge-ready until:

1. the latest CI build passes,
2. the final local build passes,
3. manual browser QA passes,
4. production environment values are configured,
5. real editorial/legal content is approved, and
6. explicit merge/deployment approval is given.
