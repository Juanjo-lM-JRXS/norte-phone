import { Directive, ElementRef, PLATFORM_ID, afterNextRender, inject, input } from '@angular/core';

/** Acepta "" (atributo sin valor) o un número de grados. */
const aGrados = (v: unknown) => (v === '' || v === undefined || v === null ? 8 : Number(v));
import { isPlatformBrowser } from '@angular/common';
import { PreferenciasMovimientoService } from '../../core/services/preferencias-movimiento.service';

/**
 * Inclinación 3D que sigue al puntero. Solo con mouse/trackpad (puntero fino)
 * y sin movimiento reducido; en celular el elemento queda con su ángulo base.
 * Escribe --incl-x / --incl-y; el componente decide cómo usarlas.
 */
@Directive({ selector: '[appInclinacion]' })
export class InclinacionDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly prefs = inject(PreferenciasMovimientoService);
  readonly maxGrados = input(8, { alias: 'appInclinacion', transform: aGrados });

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    afterNextRender(() => {
      if (typeof window.matchMedia !== 'function' || !window.matchMedia('(pointer: fine)').matches) return;
      const host = this.el.nativeElement;
      let cuadro = 0;
      host.addEventListener('pointermove', (e) => {
        if (this.prefs.movimientoReducido()) return;
        cancelAnimationFrame(cuadro);
        cuadro = requestAnimationFrame(() => {
          const r = host.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          host.style.setProperty('--incl-x', `${(-y * this.maxGrados()).toFixed(2)}deg`);
          host.style.setProperty('--incl-y', `${(x * this.maxGrados()).toFixed(2)}deg`);
        });
      });
      host.addEventListener('pointerleave', () => {
        host.style.setProperty('--incl-x', '0deg');
        host.style.setProperty('--incl-y', '0deg');
      });
    });
  }
}
