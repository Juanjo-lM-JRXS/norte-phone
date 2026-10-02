import { Injectable } from '@angular/core';
import { Beneficio, Plan } from './content.models';

export interface Cotizacion {
  plan: Plan;
  beneficio: Beneficio;
  precioPorEquipo: number;
  equipos: number;
  total: number;
  /** null cuando el plan no maneja anticipo. */
  anticipo: number | null;
  saldo: number | null;
}

/** Calcula precios a partir de los datos; los componentes nunca hacen cuentas. */
@Injectable({ providedIn: 'root' })
export class PricingService {
  cotizar(plan: Plan, beneficio: Beneficio): Cotizacion {
    const precioPorEquipo = plan.precio - beneficio.descuentoPorEquipo;
    const equipos = beneficio.equipos;
    const total = precioPorEquipo * equipos;
    const anticipo = plan.anticipo === null ? null : Math.round(total * plan.anticipo);
    return {
      plan,
      beneficio,
      precioPorEquipo,
      equipos,
      total,
      anticipo,
      saldo: anticipo === null ? null : total - anticipo,
    };
  }

  /** Ahorro del plan frente a otro plan de referencia. */
  ahorroFrenteA(plan: Plan, referencia: Plan): number {
    return Math.max(0, referencia.precio - plan.precio);
  }
}
