import { Pipe, PipeTransform } from '@angular/core';

const formato = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });

/** 5650000 → "5.650.000" (formato colombiano). */
export function formatearCop(valor: number): string {
  return formato.format(valor);
}

/** Uso: {{ precio | cop }} → "5.650.000 COP"; {{ precio | cop: false }} → "5.650.000". */
@Pipe({ name: 'cop' })
export class CopPipe implements PipeTransform {
  transform(valor: number | null | undefined, conMoneda = true): string {
    if (valor === null || valor === undefined) return '';
    return conMoneda ? `${formatearCop(valor)} COP` : formatearCop(valor);
  }
}
