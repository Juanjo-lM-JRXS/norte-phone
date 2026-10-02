import { Injectable, computed, inject, signal } from '@angular/core';
import { ContentFacade } from '../content/content.facade';
import { PricingService } from '../content/pricing.service';
import { BeneficioId, PlanId } from '../content/content.models';
import { formatearCop } from '../../shared/pipes/cop.pipe';

/**
 * Estado del pedido que la persona arma en "Planes". Lo comparten Planes,
 * Contacto y la barra fija, para que el mensaje de WhatsApp lleve lo elegido.
 */
@Injectable({ providedIn: 'root' })
export class PedidoStore {
  private readonly contenido = inject(ContentFacade);
  private readonly precios = inject(PricingService);

  readonly planId = signal<PlanId>('te-lo-traemos');
  readonly beneficioId = signal<BeneficioId>('ninguno');
  /** true cuando la persona tocó el armador; si no, el mensaje es genérico. */
  readonly personalizado = signal(false);

  readonly cotizacion = computed(() => {
    const plan = this.contenido.planes().find((p) => p.id === this.planId())!;
    const beneficio = this.contenido.beneficios().find((b) => b.id === this.beneficioId())!;
    return this.precios.cotizar(plan, beneficio);
  });

  readonly mensajeWhatsapp = computed(() => {
    const producto = this.contenido.producto().nombre;
    if (!this.personalizado()) {
      return `Hola Norte, quiero información sobre el ${producto}.`;
    }
    const c = this.cotizacion();
    const beneficio = c.beneficio.id === 'ninguno' ? '' : ` + ${c.beneficio.nombre}`;
    const equipos = c.equipos > 1 ? `, ${c.equipos} equipos` : '';
    return `Hola Norte, me interesa el ${producto} con ${c.plan.nombre}${beneficio}${equipos} (${formatearCop(c.precioPorEquipo)} COP por equipo).`;
  });

  elegirPlan(id: PlanId): void {
    this.planId.set(id);
    this.personalizado.set(true);
  }

  elegirBeneficio(id: BeneficioId): void {
    this.beneficioId.set(id);
    this.personalizado.set(true);
  }
}
