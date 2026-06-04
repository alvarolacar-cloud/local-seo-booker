# Rediseño Home: estructura Upwork + contenido Rankin

Reemplazamos por completo `src/routes/index.tsx` siguiendo la composición exacta de la captura de Upwork, manteniendo el header actual y reutilizando datos de Rankin (sectores, ciudades, oportunidades).

## Secciones (en orden, copiando Upwork)

1. **Banner verde fino superior** (sobre el hero)
   - "Deja de buscar. Encuentra el hueco con el plan Pro." + CTA "Empezar →"

2. **Hero card oscura con imagen de fondo**
   - Título: "Posiciona al ritmo de tu ambición"
   - Subtítulo: "Negocios locales que usan datos reales de Google para detectar oportunidades y convertirlas en clientes."
   - **Tabs**: "Quiero posicionar mi negocio" / "Soy agencia/consultor"
   - **Search bar** (sector + ciudad) con botón "Buscar"
   - Chips bajo el search: Fontaneros, Dentistas, Abogados, Restaurantes (rápidos)

3. **Logos partners** (centrado, "CONFÍAN EN NOSOTROS")

4. **"Encuentra oportunidades para cada tipo de negocio"**
   - Grid 5×2 de tarjetas blancas con icono verde + nombre sector (Fontanería, Dentistas, Abogados, Restaurantes, Reformas, Peluquerías, Talleres, Electricistas, Sanidad, Profesionales)

5. **"Cómo funciona"** + toggle "Para negocios" / "Para agencias"
   - 3 columnas con imagen arriba y texto debajo:
     - "Análisis gratis siempre" + CTA verde "Hacer análisis"
     - "Recibe tu informe"
     - "Posiciona y mide resultados"

6. **Bloque oscuro "Calcula el potencial de tu sector"**
   - Izquierda: título + subtítulo + input "tu sector/ciudad" + botón verde "Calcular"
   - Derecha: gráfica decorativa de estimación (Bajo/Medio/Alto)

7. **"Elige cómo quieres trabajar con nosotros"** (Pricing)
   - 2 cards: **Básico** (gratis) vs **Pro** (badge "POPULAR")
   - Lista de features con checks verdes, CTA verde "Empezar gratis" en cada uno
   - Link inferior: "Comparar planes en detalle"

8. **"Resultados reales en Rankin"** (Testimoniales)
   - Grid 3×2 de tarjetas con quote + nombre/cargo + avatar pequeño
   - Onda verde decorativa de fondo

9. **"Reconocidos por el sector"**
   - Fila de 6 badges/insignias (G2-style)

10. **Banner verde grande final**
    - "Encuentra el hueco que tu negocio necesita" + botón blanco "Ver oportunidades"

11. **Footer** (mantener `<SiteFooter />`)

## Detalles técnicos

- Mantener `<SiteHeader />` actual sin tocar.
- Reutilizar `sectors`, `cities`, `opportunidades` ya importados, además de los assets ya disponibles (`sector-*`, `city-*`, `service-*`, `report-*`).
- Paleta: usar tokens existentes; el verde del CTA = `bg-accent` (ya es nuestro azul/acento), pero como referencia Upwork es verde — usar `--accent` actual del proyecto para coherencia con el header (no introducir verde nuevo salvo que se pida).
- Hero card: fondo oscuro `bg-primary` con imagen tenue a la derecha (overlay).
- Sin cambios de routing, ni de header, ni de datos.
- Eliminamos las secciones actuales (Trending, Featured opportunity, Popular cities, FAQ, etc.) — toda la home se rehace.

## Pregunta abierta

¿Mantenemos el **acento azul actual** de Rankin para los CTAs (coherencia con el header) o quieres que los botones sean **verde Upwork** (`#14a800`)?
