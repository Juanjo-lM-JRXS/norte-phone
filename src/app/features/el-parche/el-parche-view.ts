import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ProgramaParche } from '../../core/content/content.models';
import { LogoNorte } from '../../shared/ui/logo-norte';
import { InclinacionDirective } from '../../shared/directives/inclinacion.directive';
import { CopPipe } from '../../shared/pipes/cop.pipe';

/** El Parche como club de clientes: una tarjeta de miembro, no un esquema de comisiones. */
@Component({
  selector: 'app-el-parche-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LogoNorte, InclinacionDirective, CopPipe],
  templateUrl: './el-parche-view.html',
  styleUrl: './el-parche-view.scss',
})
export class ElParcheView {
  readonly parche = input.required<ProgramaParche>();
  readonly pedido = input.required<string>();

  protected readonly numeroMiembro = computed(() => this.pedido().replace('N-', '#'));
}
