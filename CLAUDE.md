# Tanner Golf

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- No CMS — content lives in typed files under `content/` (shapes in `content/types.ts`)
- Waitlist sign-ups go to the client's Google Sheet (`scripts/google-sheets-waitlist.gs`)
- Hosted on Vercel

## Content rules
- Every piece of visible text lives in `content/` — no hardcoded copy in components.
- Images live in `public/images/` and are referenced from `content/` as a `Photo` (`src`, `alt`, optional `position` for cropping), rendered via `components/Photo.tsx` (`next/image`).
- Tournament years: each year's pages live in `content/<year>/` and are registered in `content/seasons.ts`; the menu is in `content/site.ts`.
- Designs come from Figma; build pages to match the Figma frames.

@AGENTS.md
