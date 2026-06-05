# Plan de actuación — Web Rankin (Agencia SEO local)

## Visión general
Convertir el actual `index.tsx` (one-pager) en una **web multi-página** con 8 rutas, manteniendo el diseño visual ya aprobado (estilo Booking adaptado, paleta navy + ámbar, tokens en `src/styles.css`). Cada página tendrá su propio rol en el funnel: home → sector/ciudad → conversión (valoración gratis).

## Estructura de rutas (TanStack Start)

| Tu archivo HTML | Ruta en la app | Archivo |
|---|---|---|
| `index.html` | `/` | `src/routes/index.tsx` (refactor) |
| `sectores.html` | `/sectores` | `src/routes/sectores.index.tsx` |
| `sectores/fontaneros.html` | `/sectores/$sector` | `src/routes/sectores.$sector.tsx` |
| `valoracion.html` | `/oportunidades` | `src/routes/oportunidades.index.tsx` |
| `oportunidades/fontaneros-madrid.html` | `/oportunidades/$slug` | `src/routes/oportunidades.$slug.tsx` |
| `casos-exito.html` | `/casos-exito` | `src/routes/casos-exito.tsx` |
| `como-funciona.html` | `/como-funciona` | `src/routes/como-funciona.tsx` |
| `guias.html` | `/guias` | `src/routes/guias.tsx` |

> Nota: uso `/oportunidades` en lugar de `/valoracion` porque el contenido que describes (listado comparativo) encaja mejor con ese nombre y deja `valoracion` libre para el CTA real ("solicita tu valoración gratis"). Si prefieres mantener `/valoracion`, me lo dices.

## Arquitectura compartida

1. **Layout común** (`__root.tsx`): header con nav (Inicio · Sectores · Oportunidades · Casos · Cómo funciona · Guías) + botón "Auditoría gratis", y footer reutilizable. Hoy el header/footer viven dentro de `index.tsx`; los extraigo a `src/components/site/Header.tsx` y `Footer.tsx`.
2. **Datos mock centralizados** en `src/data/`:
   - `sectors.ts` (12 sectores con icono, keyword, descripción, ciudades disponibles)
   - `cities.ts` (Madrid, Barcelona, Valencia, Sevilla, Bilbao, Málaga)
   - `opportunities.ts` (datos de búsqueda mensual, competencia, evolución por sector+ciudad)
   - `cases.ts` (casos de éxito con antes/después)
3. **SEO por ruta**: cada página define su `head()` con title, description, og:title, og:description únicos (crítico para una web de agencia SEO — predicamos con el ejemplo).

## Contenido por página

**`/` (Home)** — Refactor del index actual. Mantiene hero, bloque de sectores (cards que ahora enlazan a `/sectores/$sector`), 4 servicios, "cómo trabajamos" resumido, 2-3 casos destacados, ciudades, CTA auditoría. Más corta que ahora, deriva a las páginas internas.

**`/sectores`** — Grid completo de los 12 sectores. Cada card: icono, sector, ciudades disponibles, "X negocios ya posicionados", CTA "Ver plan SEO". Filtro por ciudad arriba.

**`/sectores/$sector`** (ej. `/sectores/fontaneros`) — Landing comercial:
- Hero: "SEO local para fontaneros en [ciudad]"
- Bloque "oportunidad local" (mini-dato: X búsquedas/mes en Madrid)
- Servicios aplicados al sector
- 2 casos del mismo sector
- FAQ específica
- CTA grande "Solicita tu valoración gratis"

**`/oportunidades`** — Tabla/grid comparativa: sector × ciudad, con columnas búsquedas/mes, competencia (baja/media/alta), oportunidad (score). Cada fila enlaza a `/oportunidades/$slug`. Filtros por ciudad y sector.

**`/oportunidades/$slug`** (ej. `/oportunidades/fontaneros-madrid`) — Informe analítico:
- Resumen: búsquedas mensuales, CPC medio, tendencia 12 meses (gráfico recharts)
- Distritos con más potencial (lista con barras)
- Top keywords del sector
- Servicios más buscados
- Casos relacionados
- CTA "Quiero este informe para mi negocio"

**`/casos-exito`** — Grid de casos (fontanería, dental, abogados, electricistas, inmobiliarias, reformas). Cada card: foto, sector, ciudad, métrica clave (ej. "+312% llamadas en 6 meses"), testimonio corto. Filtro por sector.

**`/como-funciona`** — 4-5 pasos en formato timeline vertical (Valoración → Plan → Implementación → Medición → Mejora), cada paso con descripción detallada, qué entregamos, plazos. Bloque FAQ al final.

**`/guias`** — Listado de artículos/recursos (Google Maps, SEO local, reseñas, etc.). Cards tipo blog con categoría, tiempo de lectura, CTA "Leer guía". Por ahora sin páginas de detalle (placeholders), salvo que quieras también las internas.

## Detalles técnicos

- React + TanStack Router (file-based). Sin backend por ahora (todo mock data).
- Tokens de diseño y componentes shadcn existentes. Sin colores hardcodeados.
- Recharts (ya disponible) para el gráfico de tendencia en `/oportunidades/$slug`.
- Imágenes: reutilizo las 14 ya generadas. Genero 2-3 más solo si hace falta (cabeceras de Cómo funciona y Guías).
- Responsive desde 390px (viewport actual del usuario).

## Orden de ejecución sugerido

1. Extraer Header/Footer + crear data mock + tipos
2. Refactor `/` (más corta, deriva a internas)
3. `/sectores` + `/sectores/$sector`
4. `/oportunidades` + `/oportunidades/$slug`
5. `/casos-exito`, `/como-funciona`, `/guias`
6. Revisar SEO meta de cada ruta + enlaces internos

## Lo que NO incluyo (avísame si lo quieres)
- Formulario funcional (hoy es solo UI; conectarlo requiere Lovable Cloud + email)
- Páginas de detalle dentro de Guías (artículos individuales)
- Blog real, multi-idioma, área cliente
- Páginas legales (aviso legal, privacidad, cookies)

¿Le doy luz verde así o quieres ajustar algo (nombres de rutas, sectores, qué entra en cada página)?