# Urgent Studio deployment

Deploy this repository as a separate Vercel project, with this folder as the Vercel Root Directory.

`vercel.json` builds the Sanity Studio and publishes its `dist` folder as a static site.

## Build settings

- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm build`
- Output directory: `dist`

## Production environment variables

```text
SANITY_STUDIO_PROJECT_ID=ugk0i5rc
SANITY_STUDIO_DATASET=production
```

## After deployment

1. Attach the dedicated CMS subdomain in Vercel, for example `cms.your-domain.com`.
2. In Sanity project CORS settings, add `http://localhost:3333` with credentials and the exact HTTPS CMS subdomain with credentials.
3. Sign in to the deployed Studio and confirm it connects to the `production` dataset.

Do not add the storefront domain to credentialed Studio CORS. The Studio and storefront are independent deployments.
