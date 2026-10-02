import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ContentFacade } from '../../core/content/content.facade';
import { PreferenciasMovimientoService } from '../../core/services/preferencias-movimiento.service';
import { ComoFuncionaView } from './como-funciona-view';

@Component({
  selector: 'app-como-funciona-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComoFuncionaView],
  template: `
    <app-como-funciona-view
      [etapas]="contenido.etapas()"
      [pedido]="contenido.pedidoEjemplo()"
      [anticipo]="anticipoTexto()"
      [animar]="!prefs.movimientoReducido()" />
  `,
})
export class ComoFuncionaSection {
  protected readonly contenido = inject(ContentFacade);
  protected readonly prefs = inject(PreferenciasMovimientoService);
  protected readonly anticipoTexto = computed(() => {
    const a = this.contenido.planPrincipal().anticipo ?? 0;
    return `${Math.round(a * 100)}%`;
  });
}
