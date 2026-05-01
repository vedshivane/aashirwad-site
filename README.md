# Eco Aashirvad

Premium-first Next.js website for Eco Aashirvad, focused on doors, frames, and boards.

Non-production notes, source images, and helper scripts live under `context/`.

## Commands

```bash
npm install
npm run dev
```

## Background themes

Three non-grey background options are available. Switch between them with the
`NEXT_PUBLIC_BG_THEME` environment variable **before** building/starting the dev
server. No code edits required.

| Value | Name | Description |
|-------|------|-------------|
| `A` *(default)* | Classic warm cream | WebGL warm-cream marble canvas. Closest to the previous look — creamy white with barely-perceptible tonal variation and a gentle mouse-parallax gloss. |
| `B` | Clean white + texture | CSS-only. Bright near-white base with subtle diagonal micro-lines and soft warm radial glows at the corners. |
| `C` | Warm gradient banding | CSS-only. Gentle warm horizontal bands that scroll with the page, built from the existing `--surface-*` CSS design tokens. |

### How to switch

**Local development** — create or edit `.env.local`:

```env
NEXT_PUBLIC_BG_THEME=B
```

Then restart the dev server (`npm run dev`).

**Vercel / production** — add `NEXT_PUBLIC_BG_THEME` in your project's
*Settings → Environment Variables* and redeploy.

**Permanent default** — edit `lib/site.ts` and change the fallback in the
`rawBgTheme` line from `"A"` to your preferred option.
