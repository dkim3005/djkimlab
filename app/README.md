# djkimlab.com — Next.js app

Source for [djkimlab.com](https://djkimlab.com) — Dongjin Kim's
portfolio, project showcase, and technical wiki.

## Stack

- **Next.js 16** (App Router, Turbopack, fully SSG except the
  `opengraph-image` route handler).
- **Tailwind v4** with CSS variables for the dark palette.
- **react-markdown + remark-gfm + rehype-highlight** for the wiki —
  markdown lives under `/wiki/` at the repo root and is loaded at build
  time via `src/lib/wiki.ts`.
- Self-hosted Geist / Geist Mono via `@font-face` in `globals.css`
  (`public/fonts/`).

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export of every route into .next/
npm run start        # production server on :3000
npm run lint
```

## Deployment

This app is self-hosted on a personal server. `keep-alive.sh` runs
`npm run start` in an infinite loop so a crash restarts the server
within a couple of seconds. The public hostname `djkimlab.com` reaches
the local port via a Cloudflare Tunnel.

To deploy a new commit:

```bash
git pull origin main
cd app && npm install && npm run build
# Then kill the existing next-server PID on :3000; keep-alive picks up
# the new build automatically on its next loop iteration.
```

## Layout

```
src/app/
├── layout.tsx                        # root metadata, JSON-LD, star canvas
├── page.tsx                          # landing — projects + experience
├── opengraph-image.tsx               # 1200x630 dynamic OG card
├── sitemap.ts / robots.ts            # SEO surface
├── components/StarField.tsx          # background canvas (a11y-aware)
├── projects/mlviz/                   # interactive ML timeline + demos
└── wiki/                             # markdown-backed wiki + topic pages
```

## Architecture decisions

See [`../wiki/decisions/`](../wiki/decisions) for the ADRs behind the
stack choices (Next.js + Tailwind v4, TypeScript, CSS approach).
