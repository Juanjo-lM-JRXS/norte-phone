# Norte · página web (pagina-web-b1)

Página de **Norte**, la tienda que trae iPhone originales de EE. UU. a Colombia.
Eslogan: *"Te lo traemos. Lo ves llegar."*

## Cómo correrla

Requisitos: **Node 22.22.3 o superior** (o Node 24) y npm.

```bash
git clone https://github.com/Juanjo-lM-JRXS/norte-phone.git
cd norte-phone
npm install
cp .env.example .env   # opcional: el proyecto corre con los valores por defecto
npm start            # desarrollo en http://localhost:4200
npm run build        # build de producción prerenderizado en dist/pagina-web-b1/browser
npm run preview      # sirve el build con Brotli y caché, como un hosting real (http://localhost:4300)
npm test             # pruebas unitarias (Vitest)
npm run contraste    # tabla de contraste WCAG de la paleta
npm run a11y         # auditoría de accesibilidad sobre el build (necesita Chrome; ver ACCESIBILIDAD.md)
```

Las dependencias (`node_modules`) y el build (`dist`) no se suben al repositorio; `npm install` las
reconstruye localmente a partir de `package-lock.json`. Las variables de entorno son opcionales y están
documentadas en `.env.example`.

El build es **HTML estático**: se puede subir tal cual a Firebase Hosting, Netlify, Vercel, GitHub Pages
o cualquier hosting estático. Sube el contenido de `dist/pagina-web-b1/browser`.

## Antes de publicar (contenido pendiente)

Todo lo pendiente está marcado de forma visible en la página para que no se publique por error.

| Qué | Dónde se cambia |
|---|---|
| Número real de WhatsApp | `src/app/core/config/norte-config.ts` |
| Condiciones de la garantía (duración y cobertura) | `garantia` en `src/app/core/content/norte.content.ts` (poner `definida: true`) |
| Testimonios reales, con permiso del cliente | `testimonios` en `norte.content.ts` (poner `ejemplo: false`) |
| Foto real del equipo | `producto.fotoPendiente` en `norte.content.ts` y el componente del hero |
| Revisar respuestas de eSIM y garantía | `preguntas` con `porRevisar: true` en `norte.content.ts` |

## Estructura

```
src/
├── app/
│   ├── core/                     servicios globales, configuración y layout
│   │   ├── config/               NORTE_CONFIG (InjectionToken): número de WhatsApp
│   │   ├── content/
│   │   │   ├── norte.content.ts  ÚNICA fuente de precios, planes, FAQ y testimonios
│   │   │   ├── content.facade.ts fachada con signals; las features solo leen de aquí
│   │   │   ├── pricing.service.ts cálculo de precios, anticipo y saldo (+ pruebas)
│   │   │   └── reglas-internas.ts pisos de precio: solo los usan las pruebas
│   │   ├── services/             WhatsApp, preferencias de movimiento, seguimiento de scroll
│   │   ├── state/pedido.store.ts pedido armado en Planes (compartido con Contacto y la barra)
│   │   └── layout/               header + menú, footer, barra fija de celular
│   ├── shared/
│   │   ├── ui/                   Sello Norte, logo, etiqueta de envío, botón de WhatsApp, placeholder
│   │   ├── directives/           inclinación 3D, progreso de sección, en vista
│   │   ├── pipes/                cop (5.650.000 COP)
│   │   └── utils/
│   └── features/                 una carpeta por sección
│       ├── hero/                 hero-section.ts (contenedor) + hero-view.ts (presentación)
│       ├── como-funciona/  planes/  confianza/  el-parche/  preguntas/  contacto/
└── styles/                       _tokens (design tokens), _base, _vidrio
scripts/                          auditoría, contraste y servidor de vista previa
docs/                             enlaces a los documentos fuente
```

Cada sección tiene un **contenedor** (`*-section.ts`), que inyecta la fachada y el estado, y una
**vista** (`*-view.ts`), que solo recibe `input()` y emite `output()`. Las vistas no conocen servicios.

## Decisiones de diseño

**Concepto: la ruta del pedido.** Toda la página se lee como un envío: la etiqueta del hero, la línea de
seguimiento del header que avanza mientras bajas, las cinco etapas de "Cómo funciona", el resumen del pedido
en forma de guía y el mensaje "despachado" en Contacto.

**Vidrio propio de Norte.** Tinte azul noche al 80% (el contraste no depende de lo que pase por detrás) y un
borde de luz cálida naranja en una esquina, la "luz de etiqueta". Con `prefers-reduced-transparency` o sin
soporte de `backdrop-filter`, las superficies pasan a sólidas.

**Color con reglas de contraste.**
- Los botones naranja llevan texto azul noche; el blanco sobre naranja no pasa (2,6:1).
- El verde se usa solo en verificación y "Entregado", siempre con texto azul noche. Por eso el botón de
  WhatsApp es naranja y no verde.
- Se agregó el "grafito claro" #A9B1BE para texto secundario sobre fondo oscuro, porque el grafito de la
  paleta no pasa ahí (2,8:1).

**Planes como armador, no como tarjetas.** Se escoge cómo recibirlo y un beneficio con radio buttons, así la
regla "un solo beneficio" del modelo de negocio se cumple por diseño. El regateo no aparece en ninguna parte.
Lo que se arma llena el mensaje de WhatsApp en toda la página.

**Los pisos de precio no se publican.** 5.500.000 y 5.450.000 COP viven en `reglas-internas.ts`, que solo
importan las pruebas. Si estuvieran en los datos, cualquiera los vería en el JavaScript del sitio. Una prueba
recorre todas las combinaciones y falla si alguna rompe la regla de oro.

**Movimiento con propósito.** Hay un solo momento orquestado al cargar (se dibuja la ruta, se asienta la
etiqueta y cae el sello). Después, todo responde al scroll o a la persona: la ruta se llena, la moneda del
Sello gira del pedido a la verificación, el serial de ejemplo se escribe y pasa a "Verificado", y el menú se
despliega como una guía. Con `prefers-reduced-motion` no hay animaciones y todo se ve en su estado final.

**3D con CSS, sin Three.js.** La etiqueta del hero, la tarjeta del Parche y la moneda del Sello usan
`perspective` y `transform`. Three.js pesa unos 150 KB comprimido y aquí no aportaba lo que costaba.

**Rendimiento.**
- Angular 22 sin zone.js, con prerender estático.
- Hidratación incremental: cada sección carga su JavaScript solo al llegar a pantalla, y el footer nunca
  (es HTML estático).
- Las fuentes son los archivos de Google Fonts servidos desde el propio sitio.
- JavaScript inicial: 67 KB comprimido.

| Lighthouse (servidor con Brotli) | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|
| Celular | 99 | 100 | 100 | 100 |
| Escritorio | 99 | 100 | 100 | 100 |

**Marca.** No se usa "Apple", "iPhone" ni la manzana como parte de la marca, ni la fuente SF Pro, ni imágenes
oficiales. "iPhone" y "Apple" solo aparecen para describir el producto y el proceso de verificación, y el pie
aclara que Norte no está afiliada a Apple Inc.
