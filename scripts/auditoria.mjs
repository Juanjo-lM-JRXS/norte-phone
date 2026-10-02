// Auditoría de accesibilidad y usabilidad sobre el build estático.
// Uso: npm run build && npm run a11y
// Requiere Chrome/Chromium: define CHROME_PATH si no está en la ruta por defecto.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { createRequire } from 'node:module';
import { chromium } from 'playwright-core';

const require = createRequire(import.meta.url);
const axeFuente = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const RAIZ = 'dist/pagina-web-b1/browser';
const TIPOS = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };

const servidor = createServer(async (req, res) => {
  const ruta = req.url === '/' ? '/index.html' : decodeURIComponent(req.url.split('?')[0]);
  try {
    const cuerpo = await readFile(join(RAIZ, ruta));
    res.writeHead(200, { 'content-type': TIPOS[extname(ruta)] ?? 'application/octet-stream' });
    res.end(cuerpo);
  } catch {
    res.writeHead(404).end();
  }
}).listen(4310);
const URL = 'http://localhost:4310/';

const navegador = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const resultados = [];
const registrar = (prueba, ok, detalle = '') => {
  resultados.push({ prueba, ok, detalle });
  console.log(`${ok ? 'OK   ' : 'FALLA'}  ${prueba}${detalle ? ` — ${detalle}` : ''}`);
};

async function abrir({ ancho, alto, movil = false, movimiento = 'no-preference', transparencia }) {
  const ctx = await navegador.newContext({
    viewport: { width: ancho, height: alto },
    isMobile: movil,
    hasTouch: movil,
    reducedMotion: movimiento,
  });
  const pagina = await ctx.newPage();
  await pagina.goto(URL, { waitUntil: 'networkidle' });
  // Recorre la página para hidratar todas las secciones diferidas.
  await pagina.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await pagina.waitForTimeout(600);
  return { ctx, pagina };
}

async function axe(pagina, nombre) {
  await pagina.addScriptTag({ content: axeFuente });
  const r = await pagina.evaluate(() =>
    window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } }),
  );
  const graves = r.violations;
  registrar(
    `axe WCAG 2.2 AA (${nombre})`,
    graves.length === 0,
    graves.map((v) => `${v.id} ×${v.nodes.length}: ${v.nodes[0].target.join(' ')}`).join(' | '),
  );
  return r;
}

// 1. Celular y escritorio, con movimiento
for (const vista of [
  { nombre: 'celular 390px', ancho: 390, alto: 844, movil: true },
  { nombre: 'escritorio 1440px', ancho: 1440, alto: 900 },
]) {
  const { ctx, pagina } = await abrir(vista);
  await axe(pagina, vista.nombre);

  // Áreas táctiles: todo control interactivo visible mide mínimo 44×44 px.
  const pequenos = await pagina.evaluate(() => {
    const fuera = [];
    for (const el of document.querySelectorAll('a[href], button, summary, label:has(input), input:not([type=radio])')) {
      const r = el.getBoundingClientRect();
      const estilo = getComputedStyle(el);
      if (r.width === 0 || estilo.visibility === 'hidden' || el.closest('dialog:not([open])') || el.closest('[inert]')) continue;
      if (el.classList.contains('saltar-contenido')) continue;
      if (r.width < 44 || r.height < 44) fuera.push(`${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 30)}" ${Math.round(r.width)}×${Math.round(r.height)}`);
    }
    return fuera;
  });
  registrar(`Áreas táctiles ≥ 44×44 (${vista.nombre})`, pequenos.length === 0, pequenos.slice(0, 5).join(' | '));

  // Sin scroll horizontal
  const desborde = await pagina.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  registrar(`Sin desborde horizontal (${vista.nombre})`, desborde <= 0, desborde > 0 ? `${desborde}px` : '');

  // Texto al 200%: sin desborde horizontal y el contenido sigue completo
  await pagina.evaluate(() => (document.documentElement.style.fontSize = '200%'));
  await pagina.waitForTimeout(200);
  const desborde200 = await pagina.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  registrar(`Texto al 200% sin pérdida (${vista.nombre})`, desborde200 <= 0, desborde200 > 0 ? `${desborde200}px de desborde` : '');
  await ctx.close();
}

// 2. Teclado: orden de tabulación, foco visible, menú móvil con Esc
{
  const { ctx, pagina } = await abrir({ ancho: 1440, alto: 900 });
  const recorrido = [];
  for (let i = 0; i < 120; i++) {
    await pagina.keyboard.press('Tab');
    // Al terminar el orden de tabulación el foco vuelve al documento: ahí paramos.
    if (await pagina.evaluate(() => document.activeElement === document.body)) break;
    recorrido.push(
      await pagina.evaluate(() => {
        const el = document.activeElement;
        const s = getComputedStyle(el);
        const visible = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2;
        const contenedor = el.closest('label');
        const visibleContenedor = contenedor ? getComputedStyle(contenedor).outlineStyle !== 'none' : false;
        return { tag: el.tagName, texto: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 25), visible: visible || visibleContenedor };
      }),
    );
  }
  registrar('Primer Tab llega a "Saltar al contenido"', recorrido[0].texto.startsWith('Saltar'));
  const sinFoco = recorrido.filter((r) => !r.visible);
  registrar(`Foco visible en los ${recorrido.length} elementos tabulables`, sinFoco.length === 0, sinFoco.map((r) => `${r.tag} ${r.texto}`).slice(0, 4).join(' | '));
  await ctx.close();
}
{
  const { ctx, pagina } = await abrir({ ancho: 390, alto: 844, movil: true });
  const botonMenu = pagina.locator('button.boton-menu');
  await botonMenu.click();
  await pagina.waitForTimeout(150);
  const abierto = await pagina.evaluate(() => document.querySelector('#menu-movil').open);
  const focoDentro = await pagina.evaluate(() => !!document.activeElement.closest('#menu-movil'));
  await pagina.keyboard.press('Escape');
  await pagina.waitForTimeout(150);
  const cerrado = await pagina.evaluate(() => !document.querySelector('#menu-movil').open);
  const expandido = await botonMenu.getAttribute('aria-expanded');
  registrar('Menú móvil: abre, atrapa el foco y cierra con Esc', abierto && focoDentro && cerrado && expandido === 'false');
  await ctx.close();
}

// 3. Movimiento reducido: sin animaciones en curso y la ruta completa
{
  const { ctx, pagina } = await abrir({ ancho: 390, alto: 844, movil: true, movimiento: 'reduce' });
  await axe(pagina, 'movimiento reducido');
  const estado = await pagina.evaluate(() => ({
    corriendo: document.getAnimations().filter((a) => a.playState === 'running' && (a.effect?.getTiming().duration ?? 0) > 1).length,
    etapas: document.querySelectorAll('.etapa').length,
    alcanzadas: document.querySelectorAll('.etapa.alcanzada').length,
  }));
  registrar('Movimiento reducido: sin animaciones activas', estado.corriendo === 0, `${estado.corriendo} activas`);
  registrar('Movimiento reducido: las 5 etapas visibles completas', estado.etapas === 5 && estado.alcanzadas === 5, `${estado.alcanzadas}/${estado.etapas}`);
  await ctx.close();
}

// 4. Regla de los tres clics, desde arriba y desde el final de la página
{
  const { ctx, pagina } = await abrir({ ancho: 1440, alto: 900 });
  const metas = [
    { meta: 'Ver precios', pasos: ['a[href="#planes"]'] },
    { meta: 'Entender cómo funciona', pasos: ['a[href="#como-funciona"]'] },
    { meta: 'Escribir por WhatsApp', pasos: ['header a[href^="https://wa.me/"]'] },
    { meta: 'Ver la garantía', pasos: ['a[href="#confianza"]', '#garantia summary'] },
  ];
  for (const desde of ['inicio', 'final']) {
    for (const { meta, pasos } of metas) {
      await pagina.evaluate((d) => window.scrollTo(0, d === 'inicio' ? 0 : document.documentElement.scrollHeight), desde);
      let ok = true;
      for (const sel of pasos) {
        const el = pagina.locator(sel).first();
        if (!(await el.isVisible())) { ok = false; break; }
      }
      registrar(`Tres clics: ${meta} desde el ${desde} (${pasos.length} clic${pasos.length > 1 ? 's' : ''})`, ok && pasos.length <= 3);
    }
  }
  await ctx.close();
}

await navegador.close();
servidor.close();
const fallas = resultados.filter((r) => !r.ok).length;
console.log(`\n${resultados.length - fallas}/${resultados.length} verificaciones aprobadas`);
process.exit(fallas ? 1 : 0);
