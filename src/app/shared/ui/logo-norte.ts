import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Logo: aguja de norte (mitad naranja etiqueta) + palabra "Norte". */
@Component({
  selector: 'app-logo-norte',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg class="aguja" viewBox="0 0 16 24" aria-hidden="true" focusable="false">
      <path d="M8 0 L15 22 L8 17 Z" fill="var(--c-naranja)" />
      <path d="M8 0 L1 22 L8 17 Z" fill="currentColor" />
    </svg>
    <span class="palabra">Norte</span>
  `,
  styles: `
    :host { display: inline-flex; align-items: center; gap: 0.45em; color: inherit; }
    .aguja { width: 0.7em; height: auto; }
    .palabra {
      font-family: var(--f-titulo);
      font-weight: 700;
      letter-spacing: -0.03em;
      font-size: var(--logo-tamano, 1.375rem);
      line-height: 1;
    }
  `,
  host: { '[style.--logo-tamano]': 'tamano()' },
})
export class LogoNorte {
  readonly tamano = input('1.375rem');
}
