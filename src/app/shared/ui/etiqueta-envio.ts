import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Superficie con forma de etiqueta de envío: muesca del cordón y borde
 * perforado. El contenido se proyecta; el tono decide si es vidrio oscuro,
 * sólida noche o clara.
 */
@Component({
  selector: 'app-etiqueta-envio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="etiqueta" [class]="'tono-' + tono()">
      <span class="ojal" aria-hidden="true"></span>
      <ng-content />
      <span class="perforado" aria-hidden="true"></span>
    </div>
  `,
  styles: `
    :host { display: block; }
    .etiqueta {
      position: relative;
      padding: var(--s-6) var(--s-5) var(--s-5);
      border-radius: var(--r-vidrio);
    }
    .tono-noche {
      background: var(--c-noche);
      color: var(--c-hueso);
      border: 1px solid var(--c-linea-oscura);
      box-shadow: 0 40px 70px -40px rgb(15 27 45 / 0.8);
    }
    .tono-hueso { background: var(--c-hueso); color: var(--c-noche); border: 1px solid var(--c-linea-clara); }
    .ojal {
      position: absolute;
      top: var(--s-4);
      right: var(--s-5);
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--fondo-ojal, var(--c-noche));
      box-shadow: inset 0 0 0 3px var(--c-naranja);
    }
    .perforado {
      position: absolute;
      left: var(--s-5);
      right: var(--s-5);
      bottom: 0;
      height: 1px;
      background-image: linear-gradient(90deg, currentColor 50%, transparent 0);
      background-size: 8px 1px;
      opacity: 0.35;
    }
  `,
  host: { '[class.vidrio]': "tono() === 'vidrio'", '[style.display]': "'block'" },
})
export class EtiquetaEnvio {
  readonly tono = input<'vidrio' | 'noche' | 'hueso'>('vidrio');
}
