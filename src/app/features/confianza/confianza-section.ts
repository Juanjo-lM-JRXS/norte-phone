import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentFacade } from '../../core/content/content.facade';
import { PreferenciasMovimientoService } from '../../core/services/preferencias-movimiento.service';
import { ConfianzaView } from './confianza-view';

@Component({
  selector: 'app-confianza-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ConfianzaView],
  template: `
    <app-confianza-view
      [pruebas]="contenido.pruebas()"
      [garantia]="contenido.garantia()"
      [testimonios]="contenido.testimonios()"
      [pedido]="contenido.pedidoEjemplo()"
      [animar]="!prefs.movimientoReducido()" />
  `,
})
export class ConfianzaSection {
  protected readonly contenido = inject(ContentFacade);
  protected readonly prefs = inject(PreferenciasMovimientoService);
}
