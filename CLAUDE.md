# Pau's World of Wonder

## Stack
- HTML/CSS/JS monolítico (PWA estática)
- Service Worker para cache offline
- Deploy: GitHub Pages https://bikio2026.github.io/paus-world/
- Repo: https://github.com/bikio2026/paus-world
- Puerto dev: 3045

## Estructura
- `index.html` — HTML + CSS
- `app.js` — Toda la lógica (IIFE)
- `data.js` — BIRDS (334), TREES (80), QUOTES (75)
- `sw.js` — Service Worker (paus-v9)
- `photos/birds/` — Fotos locales (b001-b334)
- `photos/trees/` — Fotos locales (t001-t080)
- `sounds/birds/` — Sonidos locales (mp3/ogg)
- `scripts/` — Scripts de generación/descarga (no se deployean)

## Datos
- 334 aves: 80 mundo (b001-b080) + 254 Argentina (b081-b334)
- 80 árboles (t001-t080)
- 75 frases de autores argentinos
- Aves argentinas tienen `regionAR: [...]` con regiones biogeográficas

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

## APIs externas — notas importantes
- **Xeno-canto API v2**: DESCONTINUADA. No usar.
- **Xeno-canto API v3**: Requiere API key registrada. No la tenemos.
- **Xeno-canto descarga directa**: `https://xeno-canto.org/{xcId}/download` FUNCIONA (sin API key)
- **Xeno-canto species pages**: Bloquean bots con challenge JS (Anubis). No scrapear.
- **Wikipedia REST API**: Funciona bien para fotos y texto (`/api/rest_v1/page/summary/`)
- **Wikimedia Commons API**: Funciona bien para búsqueda de archivos audio/foto

## Admin
- URL: `#admin` (password: axelpresidente)
- Permite reset de scores y cache
