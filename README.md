# CompressKit

Free, private, browser-based image compression and utility platform.

Compress, resize and convert JPG, PNG and WebP images without uploading files to a server.

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Lucide React
- Canvas API (client-side image processing)
- JSZip for multi-file downloads

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start local development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Environment variables

Copy `.env.example` to `.env.local` and fill in values as needed:

```bash
NEXT_PUBLIC_SITE_URL=https://getcompresskit.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_SLOT_BANNER=
NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE=
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=
NEXT_PUBLIC_ADS_ENABLED=false
```

None of these are required for local development. Ads and Analytics stay disabled until IDs are provided and `NEXT_PUBLIC_ADS_ENABLED=true`.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Add the environment variables above.
4. Deploy. Vercel detects Next.js automatically.

Or from the CLI:

```bash
npm i -g vercel
vercel
```

## Google Analytics

1. Create a GA4 property and copy the Measurement ID.
2. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local` / Vercel.
3. Scripts load from `src/components/AnalyticsScripts.tsx`.
4. Events are sent from `src/lib/analytics.ts`:
   - `upload_image`
   - `compression_started`
   - `compression_completed`
   - `download_image`
   - `tool_used`
   - `conversion_completed`
   - `resize_completed`

## Google AdSense

1. Create AdSense ad units (banner / rectangle / sidebar).
2. Set `NEXT_PUBLIC_ADSENSE_CLIENT_ID` and slot IDs.
3. Set `NEXT_PUBLIC_ADS_ENABLED=true`.
4. Placeholders live in `src/components/ads/AdComponents.tsx`.
5. Central config is in `src/lib/ads.ts`.

Ad placements are intentionally outside upload controls and download buttons.

## Google Search Console

After deploy:

1. Verify ownership of your domain.
2. Submit `https://getcompresskit.com/sitemap.xml`.
3. `robots.txt` is generated at `/robots.txt`.

## Project structure

```text
src/
  app/                 # Routes (App Router)
  components/          # UI + tools
  data/                # Tools directory + FAQ copy
  lib/                 # Compression, SEO, analytics helpers
content/blog/          # MDX articles
public/                # Static assets
```

## Adding a new tool later

1. Create a page under `src/app/your-tool/page.tsx`.
2. Reuse `ToolPageShell`, uploader patterns and SEO helpers.
3. Add an entry in `src/data/tools.ts`.
4. Link it from the header/footer if it belongs in primary navigation.
5. Add FAQ content in `src/data/faq.ts` when useful.
6. Update `src/app/sitemap.ts` with the new route.

Keep processing client-side whenever possible. Prefer shared components over duplicating tool UI.

## Privacy model

Image compression, resizing and conversion run in the browser with the Canvas API. Files are not uploaded to CompressKit servers for MVP processing.

## License

Private project source. Update this section if you open-source the repository.
