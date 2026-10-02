import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PedidoStore } from '../../core/state/pedido.store';
import { WhatsappLinkService } from '../../core/services/whatsapp-link.service';
import { ContactoView } from './contacto-view';

@Component({
  selector: 'app-contacto-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContactoView],
  template: `
    <app-contacto-view
      [mensaje]="pedido.mensajeWhatsapp()"
      [personalizado]="pedido.personalizado()"
      [numero]="whatsapp.numeroVisible" />
  `,
})
export class ContactoSection {
  protected readonly pedido = inject(PedidoStore);
  protected readonly whatsapp = inject(WhatsappLinkService);
}
