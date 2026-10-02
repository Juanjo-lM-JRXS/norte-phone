/** ['a', 'b', 'c'] → "a, b o c" (respeta mayúsculas de nombres propios como Nequi). */
export function listaNatural(items: string[], conector = 'o'): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} ${conector} ${items.at(-1)}`;
}
