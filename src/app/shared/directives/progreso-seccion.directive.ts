import {
  DestroyRef,
  Directive,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  output,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Mide cuánto del recorrido de un elemento lleva la persona (0 a 1) mientras
 * está en pantalla y lo publica como --progreso y como evento.
 * 0 = el elemento entra por abajo; 1 = su final pasó la mitad de la pantalla.
 * Solo escucha el scroll mientras el elemento es visible.
 */
@Directive({ selector: '[appProgresoSeccion]' })
export class ProgresoSeccionDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly progreso = output<number>({ alias: 'appProgresoSeccion' });

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') return;
      const host = this.el.nativeElement;
      let pendiente = false;
      const medir = () => {
        pendiente = false;
        const r = host.getBoundingClientRect();
        const vh = window.innerHeight;
        const inicio = vh * 0.85;
        const fin = vh * 0.5;
        const recorrido = r.height + inicio - fin;
        const p = Math.min(1, Math.max(0, (inicio - r.top) / recorrido));
        host.style.setProperty('--progreso', p.toFixed(4));
        this.progreso.emit(p);
      };
      const alScroll = () => {
        if (!pendiente) {
          pendiente = true;
          requestAnimationFrame(medir);
        }
      };

      const observador = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          window.addEventListener('scroll', alScroll, { passive: true });
          medir();
        } else {
          window.removeEventListener('scroll', alScroll);
          medir();
        }
      });
      observador.observe(host);
      destroyRef.onDestroy(() => {
        observador.disconnect();
        window.removeEventListener('scroll', alScroll);
      });
    });
  }
}
