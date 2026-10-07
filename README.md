# Podium

Landing page de PODIUM, hidratación deportiva en polvo formulada en Costa Rica.
Sitio estático (HTML, CSS y JS, sin build): `index.html`, `styles.css`, `main.js`.

## Publicar en Vercel
Importar el repo en vercel.com/new, framework "Other", sin build command.

## Configuración
En `main.js`, objeto `CONFIG`:
- `whatsapp`: número con código de país (ej. `50688887777`).
- `storeUrl`: URL de la tienda o checkout. Si está vacío, los botones de los planes abren WhatsApp con el plan elegido.

Cada clic en un botón con `data-track` se envía a `window.dataLayer` como `cta_click`, listo para GA4 o Google Tag Manager.

## Pendientes (buscar `TODO` en el código)
- Precio, porciones y fórmula real (mg por porción).
- Fotos de producto y de deportes.
- Reseñas reales (no publicar testimonios inventados).
- Confirmar envíos, métodos de pago y garantía.
- Dominio: canonical, og:url, og:image, sitemap y datos estructurados de producto.
- URLs de redes sociales y páginas de políticas.
- Favicon.
