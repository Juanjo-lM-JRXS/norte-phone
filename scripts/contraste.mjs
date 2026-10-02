// Contraste WCAG de cada combinación de color que usa la página.
// Uso: npm run contraste
const hex = (h) => h.replace('#', '').match(/../g).map((x) => parseInt(x, 16));
const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (h) => { const [r, g, b] = hex(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
/** Mezcla un tinte con opacidad sobre un fondo (para el peor caso detrás del vidrio). */
const mezcla = (tinte, alfa, fondo) => '#' + hex(tinte).map((c, i) => Math.round(c * alfa + hex(fondo)[i] * (1 - alfa)).toString(16).padStart(2, '0')).join('');

const C = {
  noche: '#0F1B2D', noche2: '#15243A', hueso: '#F7F6F2', hueso2: '#EDEBE4', naranja: '#FF6B1A',
  verde: '#2BB673', grafito: '#5A6270', grafitoClaro: '#A9B1BE', textoVidrio2: '#C9CFD8',
};
// Peor caso del vidrio oscuro: tinte noche al 80% sobre blanco puro.
const vidrioPeor = mezcla(C.noche, 0.8, '#FFFFFF');

const casos = [
  ['Texto principal: blanco hueso sobre azul noche', C.hueso, C.noche, 4.5],
  ['Texto secundario: grafito claro sobre azul noche', C.grafitoClaro, C.noche, 4.5],
  ['Texto secundario: grafito claro sobre noche-2', C.grafitoClaro, C.noche2, 4.5],
  ['Texto principal: azul noche sobre blanco hueso', C.noche, C.hueso, 4.5],
  ['Texto secundario: grafito sobre blanco hueso', C.grafito, C.hueso, 4.5],
  ['Texto secundario: grafito sobre hueso-2 (garantía, recibos)', C.grafito, C.hueso2, 4.5],
  ['Botón: azul noche sobre naranja', C.noche, C.naranja, 4.5],
  ['Precio: naranja sobre azul noche', C.naranja, C.noche, 4.5],
  ['Sello y "Entregado": azul noche sobre verde', C.noche, C.verde, 4.5],
  ['Estado "Verificado": verde sobre azul noche', C.verde, C.noche, 4.5],
  [`Vidrio, peor caso (${vidrioPeor}): blanco hueso`, C.hueso, vidrioPeor, 4.5],
  [`Vidrio, peor caso (${vidrioPeor}): texto secundario de vidrio`, C.textoVidrio2, vidrioPeor, 4.5],
  ['Foco: anillo naranja sobre azul noche (no texto)', C.naranja, C.noche, 3],
  ['Foco: anillo azul noche sobre blanco hueso (no texto)', C.noche, C.hueso, 3],
  ['Opción elegida: borde azul noche sobre blanco hueso (no texto)', C.noche, C.hueso, 3],
];
const prohibidos = [
  ['Naranja sobre blanco hueso', C.naranja, C.hueso],
  ['Blanco hueso sobre naranja', C.hueso, C.naranja],
  ['Verde sobre blanco hueso', C.verde, C.hueso],
  ['Grafito sobre azul noche', C.grafito, C.noche],
];

let fallas = 0;
console.log('Combinaciones usadas');
for (const [nombre, a, b, min] of casos) {
  const r = ratio(a, b);
  if (r < min) fallas++;
  console.log(`${r >= min ? 'OK   ' : 'FALLA'}  ${r.toFixed(2).padStart(5)}:1  (mín ${min})  ${nombre}`);
}
console.log('\nCombinaciones que la página NO usa para texto (fallan AA)');
for (const [nombre, a, b] of prohibidos) console.log(`       ${ratio(a, b).toFixed(2).padStart(5)}:1  ${nombre}`);
process.exit(fallas ? 1 : 0);
