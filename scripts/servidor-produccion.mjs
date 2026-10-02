// Sirve el build como lo haría un hosting de producción: Brotli/gzip y caché
// larga para archivos con hash. Sirve para medir Lighthouse de forma realista.
// Uso: npm run build && npm run preview   →  http://localhost:4300
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { brotliCompressSync, gzipSync, constants } from 'node:zlib';

const RAIZ = 'dist/pagina-web-b1/browser';
const PUERTO = Number(process.env.PORT ?? 4300);
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json',
};
const COMPRIMIBLE = new Set(['.html', '.js', '.css', '.svg', '.json']);
const cache = new Map();

createServer(async (req, res) => {
  let ruta = decodeURIComponent((req.url ?? '/').split('?')[0]);
  if (ruta.endsWith('/')) ruta += 'index.html';
  const archivo = join(RAIZ, normalize(ruta).replace(/^(\.\.[/\\])+/, ''));
  try {
    const ext = extname(archivo);
    const acepta = String(req.headers['accept-encoding'] ?? '');
    const codificacion = COMPRIMIBLE.has(ext) ? (acepta.includes('br') ? 'br' : acepta.includes('gzip') ? 'gzip' : null) : null;
    const clave = `${archivo}:${codificacion}`;
    let cuerpo = cache.get(clave);
    if (!cuerpo) {
      const crudo = await readFile(archivo);
      cuerpo = codificacion === 'br'
        ? brotliCompressSync(crudo, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } })
        : codificacion === 'gzip' ? gzipSync(crudo, { level: 9 }) : crudo;
      cache.set(clave, cuerpo);
    }
    const conHash = /-[A-Z0-9]{8}\.(js|css)$/.test(archivo) || archivo.includes('/media/');
    res.writeHead(200, {
      'content-type': TIPOS[ext] ?? 'application/octet-stream',
      'cache-control': conHash ? 'public, max-age=31536000, immutable' : 'no-cache',
      ...(codificacion ? { 'content-encoding': codificacion, vary: 'accept-encoding' } : {}),
    });
    res.end(cuerpo);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' }).end('No encontrado');
  }
}).listen(PUERTO, () => console.log(`Norte en http://localhost:${PUERTO}`));
