import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ContentFacade } from '../../core/content/content.facade';
import { PricingService } from '../../core/content/pricing.service';
import { PedidoStore } from '../../core/state/pedido.store';
import { PlanesView } from './planes-view';

@Component({
  selector: 'app-planes-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PlanesView],
  template: `
    <app-planes-view
      [producto]="contenido.producto().nombre"
      [planes]="contenido.planes()"
      [beneficios]="contenido.beneficios()"
      [mediosDePago]="contenido.mediosDePago()"
      [planId]="pedido.planId()"
      [beneficioId]="pedido.beneficioId()"
      [cotizacion]="pedido.cotizacion()"
      [ahorroEncargo]="ahorro()"
      [mensaje]="pedido.mensajeWhatsapp()"
      (elegirPlan)="pedido.elegirPlan($event)"
      (elegirBeneficio)="pedido.elegirBeneficio($event)" />
  `,
})
export class PlanesSection {
  protected readonly contenido = inject(ContentFacade);
  protected readonly pedido = inject(PedidoStore);
  private readonly precios = inject(PricingService);

  protected readonly ahorro = computed(() =>
    this.precios.ahorroFrenteA(this.contenido.planPrincipal(), this.contenido.planInmediato()),
  );
}
