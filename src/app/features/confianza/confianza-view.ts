import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { Garantia, Prueba, Testimonio } from '../../core/content/content.models';
import { SelloNorte } from '../../shared/ui/sello-norte';
import { PlaceholderMedia } from '../../shared/ui/placeholder-media';
import { ProgresoSeccionDirective } from '../../shared/directives/progreso-seccion.directive';
import { SerialVerificacion } from './serial-verificacion';

@Component({
  selector: 'app-confianza-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SelloNorte, PlaceholderMedia, ProgresoSeccionDirective, SerialVerificacion],
  templateUrl: './confianza-view.html',
  styleUrl: './confianza-view.scss',
})
export class ConfianzaView {
  readonly pruebas = input.required<Prueba[]>();
  readonly garantia = input.required<Garantia>();
  readonly testimonios = input.required<Testimonio[]>();
  readonly pedido = input.required<string>();
  readonly animar = input(false);

  private readonly progreso = signal(0);

  /**
   * La moneda entra mostrando el pedido y, al bajar, gira hasta dejar el sello
   * al frente: primero el pedido, después la verificación.
   */
  protected readonly giro = computed(() => {
    if (!this.animar()) return '0deg';
    const p = Math.min(1, this.progreso() / 0.6);
    return `${((1 - p) * -180).toFixed(1)}deg`;
  });

  protected alProgreso(p: number): void {
    this.progreso.set(p);
  }
}
