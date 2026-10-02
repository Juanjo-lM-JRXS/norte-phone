import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Expone prefers-reduced-motion y prefers-reduced-transparency como signals.
 * En el prerender se asume movimiento reducido: el HTML estático es el estado
 * final y completo (todas las etapas visibles, sin efectos).
 */
@Injectable({ providedIn: 'root' })
export class PreferenciasMovimientoService {
  private readonly navegador = isPlatformBrowser(inject(PLATFORM_ID));

  readonly movimientoReducido = signal(true);
  readonly transparenciaReducida = signal(false);

  constructor() {
    if (!this.navegador || typeof window.matchMedia !== 'function') return;
    this.escuchar('(prefers-reduced-motion: reduce)', (v) => this.movimientoReducido.set(v));
    this.escuchar('(prefers-reduced-transparency: reduce)', (v) => this.transparenciaReducida.set(v));
  }

  private escuchar(query: string, alCambiar: (coincide: boolean) => void): void {
    const mq = window.matchMedia(query);
    alCambiar(mq.matches);
    mq.addEventListener('change', (e) => alCambiar(e.matches));
  }
}
