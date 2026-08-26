<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` — dev server at http://localhost:3000
- `npm run build` — production build; also the only typecheck path (there is no separate `typecheck` / `tsc` script)
- `npm run lint` — runs `eslint` directly. `next lint` was removed in Next.js 16, so this is the canonical linter.
- No test runner is configured.

## Gotchas

- `npm run lint` lints the whole repo, including `references/pantallas/support.js`. That file is a vendored, generated dc-runtime (its header says "GENERATED — do not edit") and has pre-existing errors — do not try to fix it; it is not app code.
- Next.js 16 breaking changes differ from training data — always check `node_modules/next/dist/docs/` before writing framework code. Concrete in-repo example: `app/page.tsx` uses `priority` on `next/image`, which is deprecated in v16 in favor of `preload`.

## Architecture

- Next.js 16 App Router. `app/` (`layout.tsx`, `page.tsx`) is the entrypoint and is still the create-next-app scaffold — the real product lives in `references/`.
- `references/` is the source of truth for what to build:
  - `references/pantallas/*.dc.html` — visual/UX spec for every screen (feed, niños, avisos, login, crear-publicación, family views, etc.). Open them in a browser; they are standalone HTML.
  - `references/screenshots/*.png` — PNG previews of the same screens.
  - `references/pantallas/support.js` — runtime for the `.dc.html` mockups; generated, never edit.
- Tailwind v4 via `@tailwindcss/postcss`; configuration is CSS-based in `app/globals.css` (`@import "tailwindcss"` + `@theme`), there is no `tailwind.config.js`.
- Path alias: `@/*` → `./*` (tsconfig).

## MCPs

- Playwright: screenshots y cualquier salida relacionada deben ir en `.playwright-mcp/` (gitignored). El navegador configurado es `msedge` (ver `opencode.json`).
- context7: usar para traer documentación actualizada de Next.js / Tailwind antes de escribir código.

## Spec Driven Development - Skills
- /spec Usaremos esta habilidad para crear las especificaciones
- /spec-impl Usaremos este skill para hacer las implementaciones


