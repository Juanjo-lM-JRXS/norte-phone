import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentFacade } from '../../core/content/content.facade';
import { PedidoStore } from '../../core/state/pedido.store';
import { HeroView } from './hero-view';

/** Contenedor: lee de la fachada y del pedido; la vista solo pinta. */
@Component({
  selector: 'app-hero-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeroView],
  template: `
    <app-hero-view
      [eslogan]="contenido.marca().eslogan"
      [beneficio]="contenido.marca().beneficio"
      [producto]="contenido.producto()"
      [plan]="contenido.planPrincipal()"
      [pedido]="contenido.pedidoEjemplo()"
      [mediosDePago]="contenido.mediosDePago()"
      [mensaje]="pedido.mensajeWhatsapp()" />
  `,
})
export class HeroSection {
  protected readonly contenido = inject(ContentFacade);
  protected readonly pedido = inject(PedidoStore);
}
