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

## Marca
Los logos vienen de la *Guía de uso · Placa Podio* (v1, octubre 2026), en vector:
- En la página están como símbolos SVG al inicio del `<body>`: `#placa`, `#placa-sm` (corte pequeño), `#logo-h` (horizontal) y `#logo-v` (apilado). Toman el color de `color` en CSS.
- Archivos sueltos en `assets/marca/` y favicons en `assets/`.
- Reglas: horizontal en el encabezado (mín. 140 px de ancho), apilado y centrado en empaques, placa sola en sellos, corte pequeño como favicon. No rotar, no deformar, sin sombras, nunca dentro de un círculo.
- Lema: "Ciencia para tu constancia".

## Modo prelanzamiento
Mientras no haya producto a la venta, precios, fórmula y planes muestran "Muy pronto" y los botones llevan a la lista de lanzamiento (`#lanzamiento`).
La sección de reseñas está oculta con el atributo `hidden`; quitarlo cuando haya reseñas reales.
El empaque del hero y las tarjetas de deportes son ilustraciones de marca originales; reemplazarlas por fotos reales cuando existan.

## Páginas legales
`privacidad.html`, `terminos.html` y `cookies.html` son páginas separadas, enlazadas desde el pie de página. Son un borrador para el prelanzamiento basado en la Ley 8968 (datos personales) y la Ley 7472 (consumidor): deben revisarse con un abogado y completarse con la razón social, cédula jurídica y domicilio antes de vender.

## Pendientes (buscar `TODO` en el código)
- Precio, porciones y fórmula real (mg por porción).
- Fotos de producto y de deportes.
- Reseñas reales (no publicar testimonios inventados).
- Confirmar envíos, métodos de pago y garantía.
- Dominio: canonical, og:url, og:image, sitemap y datos estructurados de producto.
- URLs de redes sociales y páginas de políticas.
- Favicon.
