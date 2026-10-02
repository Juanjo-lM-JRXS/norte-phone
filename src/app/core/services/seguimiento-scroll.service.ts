import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Progreso de lectura de la página y sección activa (scroll-spy).
 * Alimenta la línea de seguimiento del header y el punto del menú.
 */
@Injectable({ providedIn: 'root' })
export class SeguimientoScrollService {
  private readonly navegador = isPlatformBrowser(inject(PLATFORM_ID));
  private iniciado = false;

  readonly progresoPagina = signal(0);
  readonly seccionActiva = signal<string>('inicio');

  iniciar(ids: string[]): void {
    if (!this.navegador || this.iniciado) return;
    this.iniciado = true;

    let pendiente = false;
    const medir = () => {
      pendiente = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      this.progresoPagina.set(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    window.addEventListener(
      'scroll',
      () => {
        if (!pendiente) {
          pendiente = true;
          requestAnimationFrame(medir);
        }
      },
      { passive: true },
    );
    medir();

    if (typeof IntersectionObserver === 'undefined') return;

    // Una sección es "activa" cuando cruza la franja superior de la pantalla.
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) this.seccionActiva.set(e.target.id);
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observador.observe(el);
    }
  }
}
