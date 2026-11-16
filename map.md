# map.md — debuggertr-website (fast-recovery index)

Terse pointers only. Update on every change. Public repo: no secrets, no local paths.

- **Stack:** Next.js 16.4.6 (App Router, Turbopack), React 19.3, next-intl, npm + `package-lock.json`. Node pinned via `engines.node` = 24.x (Vercel dropped Node 20 on 2026-10-01). No GitHub Actions.
- **Deploy:** Vercel git integration. Merge/push to `main` = production deploy of www.debuggertr.com. PR branches get Vercel preview builds.
- **Routing:** `src/proxy.ts` = locale routing (en unprefixed; tr/lv/de prefixed) + production block for `/admin` and `/api/admin/*`. Locale list is duplicated in `proxy.ts` and `src/messages` — keep in lock-step.
- **Admin tools (local dev only):** page `src/app/admin`, API `src/app/api/admin/*`. They write `src/data/*.json` and `public/cvs/`; changes ship by commit.
  - Invariant: every handler calls `adminGuard(req)` (`src/lib/admin-guard.ts`) first and exports `dynamic = "force-dynamic"`. Guard = 404 outside `next dev` (NODE_ENV inlined at build; VERCEL_ENV preview/production), 403 for non-localhost Host or cross-site Origin/Sec-Fetch-Site in dev. Independent of `proxy.ts`.
- **CV pages:** `/cvs/[slug]` (`src/app/cvs/[slug]/`) render `src/data/cvs.json` → `htmlContent` (docx → mammoth, same pipeline as `api/admin/cvs/upload`). Original file in `public/cvs/` (`fileName`); `next.config.ts` sends `noindex` + attachment for `/cvs/*.docx|pdf`. Inline partner icons (Capgemini, Asahi) sized by `img[alt=…]` in `CvProfileClient.tsx` (screen + print CSS) — keep alt text when re-uploading.
- **Tracking:** `src/data/tracking.json` is the source of truth, injected by `src/components/SEO/TrackingScripts.tsx`. A new tracker host also needs the CSP in `next.config.ts`.
- **AGENTS.md:** its agent-rules block is rewritten by `next dev` (`agentRules`); commit it after Next upgrades.
- **Open threads:**
  - Lint is red: `npx eslint src` = 8 errors: 3 `no-html-link-for-pages` + 5 react-hooks 7.1 rules (AdminClient, CvProfileClient). Plain `npm run lint` also scans untracked `out/` + `graphify-out/` (thousands of noise hits). `next build` does not run lint.
  - `/api/admin/publish` copies `out/` from the old static export (dropped in c7251b7), so it publishes a stale copy.
  - Dev-only `npm audit`: 7 moderate via `minimatch` under typescript-eslint (pinned by eslint-config-next).
  - Skipped majors: eslint 10, typescript 7, framer-motion 14, @hookform/resolvers 7, @types/node 26.
- **Security log:** 2026-10-23 next 16.2.2 → 16.4.2, sharp 0.35.5, `npm audit fix`; `npm audit --omit=dev` = 0. Route-level admin guard added. 2026-11-16 next 16.4.6, react 19.3.1, in-range minors + `npm audit fix`; prod audit = 0.
- graphify: built 2026-11-16 (`graphify-out/` in `.git/info/exclude`).
