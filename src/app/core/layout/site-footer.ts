import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LogoNorte } from '../../shared/ui/logo-norte';
import { ContentFacade } from '../content/content.facade';
import { ITEMS_NAVEGACION } from './navegacion';

@Component({
  selector: 'app-site-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LogoNorte],
  template: `
    <footer class="footer">
      <div class="contenedor rejilla">
        <div class="marca">
          <app-logo-norte tamano="1.75rem" />
          <p class="eslogan">{{ marca().eslogan[0] }} {{ marca().eslogan[1] }}</p>
        </div>
        <nav aria-label="Pie de página">
          <ul role="list" class="enlaces">
            @for (item of items; track item.id) {
              <li><a [href]="'#' + item.id">{{ item.texto }}</a></li>
            }
            <li><a href="#garantia">Garantía</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
        <p class="legal">
          Norte es una tienda independiente. No está afiliada ni respaldada por Apple Inc.
          iPhone es una marca registrada de Apple Inc.
        </p>
      </div>
    </footer>
  `,
  styles: `
    @use 'tokens' as *;
    .footer {
      background: var(--c-noche);
      color: var(--c-hueso);
      border-top: 1px solid var(--c-linea-oscura);
      // Espacio extra en celular para que la barra fija no tape el pie.
      padding: var(--s-7) 0 calc(var(--s-9) + env(safe-area-inset-bottom));
      @include desde($bp-lg) { padding-bottom: var(--s-7); }
    }
    .rejilla {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--s-6);
      @include desde($bp-md) { grid-template-columns: 1fr 1fr; }
    }
    .eslogan { margin-top: var(--s-3); color: var(--c-grafito-claro); }
    .enlaces {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 var(--s-4);
      a {
        display: inline-flex;
        align-items: center;
        min-height: var(--toque-min);
        color: var(--c-hueso);
        text-underline-offset: 4px;
      }
    }
    .legal {
      grid-column: 1 / -1;
      font-size: var(--t-xs);
      color: var(--c-grafito-claro);
      padding-top: var(--s-5);
      border-top: 1px dashed var(--c-linea-oscura);
    }
  `,
})
export class SiteFooter {
  protected readonly marca = inject(ContentFacade).marca;
  protected readonly items = ITEMS_NAVEGACION;
}
