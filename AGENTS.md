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
- supabase: base de datos Postgres, autenticación, edge functions, realtime, storage y más. Usar para queries SQL, migraciones, advisors, logs y gestión del proyecto.

## Supabase

- Project URL: usar `supabase_get_project_url` para obtenerla
- API Keys: usar `supabase_get_publishable_keys` para obtener las keys (nunca exponer `service_role` en el cliente)
- Migraciones: usar `supabase_apply_migration` para DDL, `supabase_execute_sql` para queries de solo lectura
- **CRUCIAL:** SIEMPRE crear el archivo `.sql` correspondiente en `supabase/migrations/` cada vez que se manipule la base de datos (DDL, DML, RLS, políticas, triggers, etc.). `supabase_apply_migration` aplica los cambios en la nube pero NO genera el archivo local. El archivo debe existir para mantener el historial de migraciones versionado en git.
- Advisors: correr `supabase_get_advisors` (tipo `security` y `performance`) después de cambios de schema
- Logs: usar `supabase_query_logs` para debugging, filtrando por `source` como `edge_logs`, `postgres_logs`, `function_edge_logs`

## Skills

- `/spec` — Usaremos esta habilidad para crear las especificaciones
- `/spec-impl` — Usaremos este skill para hacer las implementaciones
- `/spec-verifier` — Agente para verificar criterios de aceptación de un spec. Revisa el código, compara screenshots con Playwright + vision, valida buenas prácticas con Context7, y marca los checkboxes del spec.
- `/supabase` — Usar en CUALQUIER tarea que involucre Supabase: base de datos, auth, edge functions, realtime, storage, RLS, migraciones, schemas, debugging, logs. Cargar antes de escribir o cambiar cualquier cosa relacionada con Supabase.
- `/supabase-postgres-best-practices` — Cargar ANTES de escribir o modificar cualquier cosa que viva en la base de datos Postgres: tablas, columnas, tipos de datos, indexes, triggers, funciones, RLS, migraciones, queries. Incluye optimización de queries, gestión de conexiones, seguridad y patrones de acceso a datos.

## Commands

### Verify Spec

Para verificar un spec implementado, usa el agente `spec-verifier`:

```
/spec-verifier specs/NN-slug.md
```

Ejemplos:
- `/spec-verifier specs/01-feed-home.md`
- `/spec-verifier 01`
- `/spec-verifier 01-home-feed`

El agente:
1. Lee el spec y extrae los criterios de aceptación
2. Navega la app con Playwright y toma screenshots
3. Compara visualmente con `references/screenshots/` usando vision
4. Valida prácticas de Next.js 16 con Context7
5. Corre `npm run lint` y typecheck
6. Revisa errores de consola
7. Marca `[x]`/`[ ]` en el spec y fija problemas de código

## Reglas de codigo

- Usar codigo limpio, nombres, funciones, variables, etc en ingles.