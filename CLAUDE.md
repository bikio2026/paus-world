# Pau's World of Wonder

## Stack
- HTML/CSS/JS monolítico (PWA estática)
- Service Worker para cache offline (fotos + sonidos)
- Deploy: GitHub Pages https://bikio2026.github.io/paus-world/
- Repo: https://github.com/bikio2026/paus-world
- Puerto dev: 3045
- Versión actual: **v2.0** (Argentina Edition)

## Estructura
- `index.html` — HTML + CSS (incluye SVG inline del ave con albiceleste)
- `app.js` — Toda la lógica (IIFE, ~1280 líneas)
- `data.js` — BIRDS (334), TREES (80), QUOTES (75)
- `sw.js` — Service Worker (paus-v10)
- `photos/birds/` — Fotos locales (b001-b334, ~30MB)
- `photos/trees/` — Fotos locales (t001-t080)
- `sounds/birds/` — 123 sonidos locales MP3 (15s, 64kbps mono, ~12MB total)
- `scripts/` — Scripts de generación/descarga (no se deployean)

## Datos
- 334 aves: 80 mundo (b001-b080) + 254 Argentina (b081-b334)
- 80 árboles (t001-t080)
- 75 frases de autores argentinos
- Aves argentinas tienen `regionAR: [...]` con regiones biogeográficas
- 123 aves tienen `soundUrl: "sounds/birds/bXXX.mp3"` (sonido local)
- ~211 aves sin sonido (especies argentinas raras sin audio online)

## Categorías del quiz
- **Aves del Mundo** (`birds`): b001-b080, mapa planisferio SVG
- **Aves de Argentina** (`birds-ar`): b081-b334, mapa Argentina SVG con regiones
- **Árboles del Mundo** (`trees`): t001-t080, mapa planisferio SVG, música de fondo

## Regiones argentinas
| Key | Región |
|-----|--------|
| `pampa` | Pampa (Buenos Aires, La Pampa, S Santa Fe) |
| `nea` | NEA/Litoral (Misiones, Corrientes, Chaco, Formosa) |
| `noa` | NOA (Salta, Jujuy, Tucumán, Catamarca) |
| `cuyo` | Cuyo (Mendoza, San Juan, San Luis) |
| `centro` | Centro (Córdoba, La Rioja, Sgo del Estero) |
| `patagonia` | Patagonia (Río Negro, Neuquén, Chubut, Sta Cruz, TdF) |
| `todo` | Todo el país (aves ubicuas) |

## Mapas SVG
- **Planisferio**: viewBox `0 0 360 180`, constantes `WORLD_MAP_PATHS` y `REGION_COORDS` en app.js
- **Argentina**: viewBox `0 0 200 400`, constantes `AR_MAP_PATHS` y `AR_REGION_COORDS` en app.js
- Selección automática: `birds-ar` → mapa Argentina, el resto → planisferio

## Sonidos
- Todos locales en `sounds/birds/`. No hay streaming remoto.
- Solo se usa `soundUrl` en data.js (no más `xcId`)
- El sonido NO se detiene al responder (se puede escuchar después)
- `stopBirdSound()` se llama al iniciar nueva ronda, ver resultados, o salir
- Fuentes de los 123 sonidos:
  - 80 de Xeno-canto (descarga directa por xcId)
  - 26 de Wikimedia Commons
  - 9 de sonidosdeaves.cl (Supabase público)
  - 8 de La Nación guía sonora (JWPlayer CDN)

## APIs externas — notas importantes
- **Xeno-canto API v2**: DESCONTINUADA. No usar.
- **Xeno-canto API v3**: Requiere API key registrada. No la tenemos.
- **Xeno-canto descarga directa**: `https://xeno-canto.org/{xcId}/download` FUNCIONA (sin API key)
- **Xeno-canto species pages**: Bloquean bots con challenge JS (Anubis). No scrapear.
- **Wikipedia REST API**: Funciona bien para fotos y texto (`/api/rest_v1/page/summary/`)
- **Wikimedia Commons API**: Funciona bien para búsqueda de archivos audio/foto
- **sonidosdeaves.cl**: Supabase público, patrón `https://khpildxpvcfmlrlvjxzk.supabase.co/storage/v1/object/public/birdsounds/{UUID}.mp3`
- **La Nación guía sonora**: JWPlayer CDN, patrón `https://cdn.jwplayer.com/videos/{ID}-hz5z2Tv4.m4a`

## Admin
- URL: `#admin` (password: axelpresidente)
- Permite reset de scores y cache

---

## Changelog

### v2.0 — Argentina Edition 🇦🇷 (2026-02-23)
- 254 aves argentinas en 6 regiones biogeográficas (total 334 aves)
- Mapa SVG de Argentina con regiones resaltadas por especie
- 123 cantos de aves locales (Xeno-canto, Wikimedia, sonidosdeaves.cl, La Nación)
- Sonido reproducible después de responder (no se corta al elegir opción)
- Ícono SVG de ave con camiseta albiceleste para categoría AR
- Service Worker v10 con cache de fotos + sonidos
- Lógica de sonido simplificada: solo `soundUrl`, eliminado `xcId`

### v1.1 — Stable (2026-02-22)
- Música ambient funcional para quiz de árboles
- 80 aves del mundo + 80 árboles
- 192 aves de Buenos Aires agregadas (b081-b272)
- 352 fotos locales (birds + trees)
- 35 aves con sonidos de Wikimedia Commons
- Categoría "Aves de Argentina" (sin mapa propio aún)
- Service Worker v8, .gitignore, limpieza de deploy

### v1.0 — Lanzamiento inicial (2026-02-16)
- Quiz de aves del mundo (50) y árboles (50)
- Frases literarias de autores argentinos
- Mapa planisferio SVG con hábitat
- Panel admin (#admin)
- Deploy GitHub Pages
- Service Worker v6
