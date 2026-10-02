import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Beneficio, BeneficioId, Plan, PlanId } from '../../core/content/content.models';
import { Cotizacion } from '../../core/content/pricing.service';
import { BotonWhatsapp } from '../../shared/ui/boton-whatsapp';
import { EtiquetaEnvio } from '../../shared/ui/etiqueta-envio';
import { CopPipe, formatearCop } from '../../shared/pipes/cop.pipe';
import { listaNatural } from '../../shared/utils/texto';

/**
 * Armador de pedido. Los beneficios son radios: la regla "un solo beneficio"
 * del modelo de negocio se cumple por diseño, no con validaciones.
 */
@Component({
  selector: 'app-planes-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BotonWhatsapp, EtiquetaEnvio, CopPipe],
  templateUrl: './planes-view.html',
  styleUrl: './planes-view.scss',
})
export class PlanesView {
  readonly producto = input.required<string>();
  readonly planes = input.required<Plan[]>();
  readonly beneficios = input.required<Beneficio[]>();
  readonly mediosDePago = input.required<string[]>();
  readonly planId = input.required<PlanId>();
  readonly beneficioId = input.required<BeneficioId>();
  readonly cotizacion = input.required<Cotizacion>();
  readonly ahorroEncargo = input.required<number>();
  readonly mensaje = input.required<string>();

  readonly elegirPlan = output<PlanId>();
  readonly elegirBeneficio = output<BeneficioId>();

  protected readonly pagos = computed(() => listaNatural(this.mediosDePago()));

  /** Frase corta para lectores de pantalla cuando cambia el precio. */
  protected readonly anuncio = computed(() => {
    const c = this.cotizacion();
    const total = c.equipos > 1 ? `, total por ${c.equipos} equipos ${formatearCop(c.total)} pesos` : '';
    return `Precio por equipo: ${formatearCop(c.precioPorEquipo)} pesos${total}.`;
  });

  protected porcentaje(valor: number | null): string {
    return valor === null ? '' : `${Math.round(valor * 100)}%`;
  }
}
