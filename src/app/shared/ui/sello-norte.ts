import { ChangeDetectionStrategy, Component, input } from '@angular/core';

let siguienteId = 0;

/**
 * Sello Norte: disco verde con texto en azul noche (6,6:1).
 * El verde se reserva para verificación, así que este es su uso principal.
 */
@Component({
  selector: 'app-sello-norte',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="0 0 120 120" role="img" [attr.aria-label]="decorativo() ? null : 'Sello Norte: original verificado'"
      [attr.aria-hidden]="decorativo() ? 'true' : null" focusable="false">
      <defs>
        <path [attr.id]="idCamino" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
      </defs>
      <circle cx="60" cy="60" r="58" fill="var(--c-verde)" />
      <circle cx="60" cy="60" r="53" fill="none" stroke="var(--c-noche)" stroke-width="1.5" />
      <circle cx="60" cy="60" r="33" fill="none" stroke="var(--c-noche)" stroke-width="1.5" stroke-dasharray="2 3" />
      <text class="anillo">
        <textPath [attr.href]="'#' + idCamino" startOffset="0">ORIGINAL VERIFICADO · SELLO NORTE ·</textPath>
      </text>
      <path d="M45 61 l10 10 l21 -23" fill="none" stroke="var(--c-noche)" stroke-width="7"
        stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
  styles: `
    :host { display: block; width: var(--sello-tamano, 120px); aspect-ratio: 1; }
    svg { width: 100%; height: 100%; }
    .anillo {
      font-family: var(--f-mono);
      font-size: 10.4px;
      font-weight: 700;
      letter-spacing: 0.06em;
      fill: var(--c-noche);
    }
  `,
})
export class SelloNorte {
  /** true cuando el sello acompaña un texto que ya dice "verificado". */
  readonly decorativo = input(false);
  protected readonly idCamino = `sello-camino-${siguienteId++}`;
}
