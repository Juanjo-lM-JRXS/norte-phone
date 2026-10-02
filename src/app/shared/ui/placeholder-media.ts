import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Reemplazo visible de fotos y videos que todavía no existen.
 * Regla de marca: nunca imágenes oficiales de Apple ni de stock.
 */
@Component({
  selector: 'app-placeholder-media',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="caja" role="img" [attr.aria-label]="'Espacio reservado: ' + descripcion()">
      <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">
        <rect x="11" y="4" width="18" height="32" rx="4" fill="none" stroke="currentColor" stroke-width="1.5" />
        <circle cx="20" cy="31" r="1.5" fill="currentColor" />
      </svg>
      <span class="pendiente">{{ etiqueta() }}</span>
      <span class="descripcion">{{ descripcion() }}</span>
    </div>
  `,
  styles: `
    :host { display: block; }
    .caja {
      display: grid;
      place-items: center;
      align-content: center;
      gap: var(--s-2);
      aspect-ratio: var(--proporcion, 4 / 5);
      padding: var(--s-4);
      border: 1.5px dashed currentColor;
      border-radius: var(--r-panel);
      text-align: center;
      font-size: var(--t-xs);
      background: repeating-linear-gradient(135deg, transparent 0 10px, rgb(127 127 127 / 0.08) 10px 11px);
    }
    svg { width: 40px; opacity: 0.8; }
    .descripcion { max-width: 22ch; line-height: 1.35; }
  `,
  host: { '[style.--proporcion]': 'proporcion()' },
})
export class PlaceholderMedia {
  readonly descripcion = input.required<string>();
  readonly etiqueta = input('Pendiente');
  readonly proporcion = input('4 / 5');
}
