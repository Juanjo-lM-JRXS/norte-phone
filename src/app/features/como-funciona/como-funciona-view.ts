import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { EtapaRuta } from '../../core/content/content.models';
import { ProgresoSeccionDirective } from '../../shared/directives/progreso-seccion.directive';

/**
 * La ruta del pedido. Al bajar, la línea se llena y cada etapa se "estampa"
 * cuando la línea la alcanza. Sin animación (o en el HTML prerenderizado)
 * todas las etapas se ven completas desde el inicio.
 */
@Component({
  selector: 'app-como-funciona-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgresoSeccionDirective],
  templateUrl: './como-funciona-view.html',
  styleUrl: './como-funciona-view.scss',
})
export class ComoFuncionaView {
  readonly etapas = input.required<EtapaRuta[]>();
  readonly pedido = input.required<string>();
  readonly anticipo = input.required<string>();
  readonly animar = input(false);

  private readonly progreso = signal(1);

  /** Progreso efectivo: con movimiento reducido la ruta está completa. */
  protected readonly avance = computed(() => (this.animar() ? this.progreso() : 1));

  /** Índice de la última etapa alcanzada por la línea. */
  protected readonly alcanzada = computed(() => {
    const total = this.etapas().length;
    return Math.min(total - 1, Math.floor(this.avance() * total + 0.35) - 1);
  });

  protected readonly etapaActual = computed(() => this.etapas()[Math.max(0, this.alcanzada())]);

  protected alProgreso(p: number): void {
    this.progreso.set(p);
  }
}
