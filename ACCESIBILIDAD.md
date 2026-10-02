# Checklist de accesibilidad y usabilidad

Meta: WCAG 2.2 nivel AA. Resultados del 2 de octubre de 2026 sobre el build de producción.

## Cómo se probó

- **`npm run a11y`** (`scripts/auditoria.mjs`): abre el build en Chromium con Playwright. Corre axe-core con las
  reglas WCAG 2.0, 2.1 y 2.2 A/AA y las buenas prácticas, y además hace pruebas propias de teclado, áreas
  táctiles, zoom de texto, movimiento reducido y regla de los tres clics. Resultado: **22/22**.
- **`npm run contraste`** (`scripts/contraste.mjs`): calcula el contraste de cada combinación de color usada,
  incluido el peor caso del vidrio. Resultado: **15/15**.
- **Lighthouse 12** con `npm run preview`: Accesibilidad **100** en celular y escritorio.
- **Pruebas unitarias** (`npm test`): **11/11**. Incluyen un solo `h1`, landmark `main`, enlace para saltar
  al contenido, precios visibles y que el regateo no aparezca.
- **Revisión visual** con capturas en 390 px y 1440 px.

Para correr la auditoría en tu equipo: `npm run build`, luego `npm run a11y`. Si Playwright no encuentra
Chrome, define `CHROME_PATH` con la ruta de tu Chrome o Chromium.

## Checklist

| Requisito | Estado | Cómo se cumple | Cómo se probó |
|---|---|---|---|
| Contraste de texto ≥ 4,5:1 | Cumple | Reglas de color de la paleta; tono derivado para texto secundario en fondo oscuro | `npm run contraste`, axe |
| Contraste sobre vidrio | Cumple | Tinte noche al 80%; peor caso (fondo blanco detrás) da 8,4:1 y 5,8:1 | `npm run contraste` |
| Contraste de elementos no textuales ≥ 3:1 | Cumple | Estado elegido en azul noche (16:1); foco naranja sobre oscuro (6,1:1) y noche sobre claro | `npm run contraste` |
| Respaldo sin transparencia | Cumple | `prefers-reduced-transparency` y `@supports` pasan el vidrio a sólido | Revisión de CSS |
| Navegación completa con teclado | Cumple | 31 elementos tabulables en orden lógico; radios nativos; `<details>` nativo | `npm run a11y` |
| Foco visible | Cumple | Anillo de 3 px con halo, adaptado a fondo claro u oscuro | `npm run a11y` (todos los elementos) |
| Saltar al contenido | Cumple | Primer elemento tabulable | `npm run a11y`, pruebas |
| Menú móvil accesible | Cumple | `<dialog>` modal: atrapa el foco, cierra con Esc, `aria-expanded` | `npm run a11y` |
| HTML semántico y landmarks | Cumple | `header`, `nav` (con nombre), `main`, `aside`, `footer`, secciones con título | axe, pruebas |
| Un solo `h1` y jerarquía de títulos | Cumple | Eslogan como `h1`, `h2` por sección, `h3` dentro | pruebas, axe |
| Textos alternativos | Cumple | Sello y tarjetas con `role="img"` y etiqueta; decoración con `aria-hidden` | axe |
| ARIA solo donde hace falta | Cumple | `aria-current` en el menú, `aria-live` solo en el precio del armador | Revisión de código |
| Texto redimensionable al 200% | Cumple | Unidades `rem`, grillas que se encogen, números largos que pueden partirse | `npm run a11y` (celular y escritorio) |
| Áreas táctiles ≥ 44×44 px | Cumple | Todos los enlaces, botones, opciones y preguntas | `npm run a11y` (medición de cada control) |
| `prefers-reduced-motion` | Cumple | Sin animaciones, sin 3D por puntero, sin efecto de scroll; ruta completa visible | `npm run a11y` (0 animaciones, 5/5 etapas) |
| Regla de los tres clics | Cumple | Precios, cómo funciona y WhatsApp a 1 clic; garantía a 2, desde inicio y final | `npm run a11y` |
| Responsive, mobile first | Cumple | Sin desborde horizontal en 390 y 1440 px; barra fija con precio en celular | `npm run a11y`, capturas |
| Idioma de la página | Cumple | `lang="es-CO"` | axe |
| Enlaces que abren otra app | Cumple | Los botones de WhatsApp avisan "(se abre WhatsApp)" a lectores de pantalla | Revisión de código |

## Lo que falta probar a mano

Las herramientas automáticas no reemplazan estas pruebas:

- Lector de pantalla real: TalkBack en Android y VoiceOver en iPhone.
- Zoom del navegador al 200% y al 400% (reflow a 320 px) en Safari de iPhone.
- Prueba con dos o tres clientes reales que lleguen desde Instagram.
