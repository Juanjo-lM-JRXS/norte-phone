import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentFacade } from '../../core/content/content.facade';
import { ElParcheView } from './el-parche-view';

@Component({
  selector: 'app-el-parche-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElParcheView],
  template: `<app-el-parche-view [parche]="contenido.parche()" [pedido]="contenido.pedidoEjemplo()" />`,
})
export class ElParcheSection {
  protected readonly contenido = inject(ContentFacade);
}
