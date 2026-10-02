import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, input, signal } from '@angular/core';
import { EnVistaDirective } from '../../shared/directives/en-vista.directive';

/**
 * Muestra cómo se verifica un serial: se escribe carácter por carácter y pasa
 * a "Verificado". Se anima una sola vez al entrar en pantalla. Para lectores de
 * pantalla solo existe el texto final, sin el efecto de escritura.
 */
@Component({
  selector: 'app-serial-verificacion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EnVistaDirective],
  template: `
    <div class="tira" (appEnVista)="iniciar()">
      <p class="sr-only">Ejemplo: serial {{ serial }} revisado en la página de Apple y verificado.</p>
      <div class="visual" aria-hidden="true">
        <span class="etiqueta">Serial de ejemplo</span>
        <span class="valor mono">{{ visible() }}<span class="cursor" [class.oculto]="listo()"></span></span>
        <span class="estado mono" [class.ok]="listo()">{{ listo() ? 'Verificado' : 'Revisando' }}</span>
      </div>
    </div>
  `,
  styles: `
    @use 'tokens' as *;
    :host { display: block; }
    .visual {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: var(--s-1) var(--s-3);
      padding: var(--s-3) var(--s-4);
      background: var(--c-noche);
      color: var(--c-hueso);
      border-radius: var(--r-etiqueta);
    }
    .etiqueta { grid-column: 1 / -1; font-size: var(--t-xs); color: var(--c-grafito-claro); }
    .valor { font-size: var(--t-lg); letter-spacing: 0.08em; min-height: 1.6em; }
    .cursor {
      display: inline-block;
      width: 0.55em;
      height: 1.1em;
      margin-left: 2px;
      vertical-align: -0.15em;
      background: var(--c-naranja);
    }
    .oculto { visibility: hidden; }
    .estado {
      font-size: var(--t-xs);
      font-weight: 700;
      padding: var(--s-1) var(--s-3);
      border-radius: var(--r-pastilla);
      border: 1px solid var(--c-grafito-claro);
      color: var(--c-grafito-claro);
    }
    .estado.ok { background: var(--c-verde); border-color: var(--c-verde); color: var(--c-noche); }
  `,
})
export class SerialVerificacion {
  readonly animar = input(false);

  protected readonly serial = 'F2LXK9M1Q7NT';
  private readonly cuenta = signal<number | null>(null);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly visible = computed(() => {
    const n = this.cuenta();
    return n === null ? this.serial : this.serial.slice(0, n);
  });
  protected readonly listo = computed(() => this.cuenta() === null);

  protected iniciar(): void {
    if (!this.animar()) return;
    this.cuenta.set(0);
    const id = setInterval(() => {
      const n = (this.cuenta() ?? 0) + 1;
      if (n > this.serial.length) {
        clearInterval(id);
        setTimeout(() => this.cuenta.set(null), 350);
        return;
      }
      this.cuenta.set(n);
    }, 70);
    this.destroyRef.onDestroy(() => clearInterval(id));
  }
}
