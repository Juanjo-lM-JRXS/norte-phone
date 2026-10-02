import { DestroyRef, Directive, ElementRef, PLATFORM_ID, afterNextRender, inject, output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Emite una sola vez cuando el elemento entra en pantalla. */
@Directive({ selector: '[appEnVista]' })
export class EnVistaDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly visible = output<void>({ alias: 'appEnVista' });

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') return;
      const observador = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            this.visible.emit();
            observador.disconnect();
          }
        },
        { threshold: 0.4 },
      );
      observador.observe(this.el.nativeElement);
      destroyRef.onDestroy(() => observador.disconnect());
    });
  }
}
