# Portfolio Web Agent Guide

## Commands

- Use pnpm: `pnpm dev`, `pnpm lint`, and `pnpm build`. There is no test or standalone typecheck script; `pnpm build` performs the production/type validation.

## Structure

- This is a single Next.js App Router application. The active route is `src/app/page.tsx`; shared document setup, fonts, and metadata are in `src/app/layout.tsx`.
- Global styles and the Tailwind CSS 4 import/theme live in `src/app/globals.css`. Tailwind is configured through `postcss.config.mjs`, not a Tailwind config file.
- Use the `@/*` import alias for modules under `src/`.
- Treat `.next/` as generated output. The starter README refers to `app/page.tsx`, but the real source path is `src/app/page.tsx`.
