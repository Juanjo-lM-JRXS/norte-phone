import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BotonWhatsapp } from '../../shared/ui/boton-whatsapp';
import { CopPipe } from '../../shared/pipes/cop.pipe';
import { PedidoStore } from '../state/pedido.store';
import { SeguimientoScrollService } from '../services/seguimiento-scroll.service';

/**
 * Barra fija en celular: precio siempre visible y WhatsApp a un toque desde
 * cualquier punto. Se esconde en Contacto (ahí el botón grande hace ese trabajo)
 * y en ese momento sale del orden de tabulación con inert.
 */
@Component({
  selector: 'app-barra-movil',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BotonWhatsapp, CopPipe],
  template: `
    <aside class="barra" aria-label="Pedido rápido" [class.oculta]="oculta()" [attr.inert]="oculta() ? '' : null">
      <a class="resumen" href="#planes">
        <span class="plan">{{ cotizacion().plan.nombre }}</span>
        <span class="mono precio">{{ cotizacion().precioPorEquipo | cop }}</span>
        <span class="sr-only">, ver planes</span>
      </a>
      <app-boton-whatsapp variante="compacto" texto="WhatsApp" [mensaje]="mensaje()" />
    </aside>
  `,
  styles: `
    @use 'tokens' as *;
    :host {
      position: fixed;
      inset: auto var(--s-3) calc(var(--s-3) + env(safe-area-inset-bottom)) var(--s-3);
      z-index: 40;
      display: block;
      @include desde($bp-lg) { display: none; }
    }
    .barra {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--s-3);
      padding: var(--s-2) var(--s-2) var(--s-2) var(--s-4);
      background: rgb(15 27 45 / 0.86);
      -webkit-backdrop-filter: blur(18px) saturate(150%);
      backdrop-filter: blur(18px) saturate(150%);
      border: 1px solid var(--c-linea-oscura);
      border-radius: var(--r-pastilla);
      box-shadow: 0 20px 40px -20px rgb(0 0 0 / 0.8);
      color: var(--c-hueso);
      transition: transform var(--dur-media) var(--ease-salida), opacity var(--dur-media), visibility var(--dur-media);
      @media (prefers-reduced-transparency: reduce) { background: var(--c-noche); backdrop-filter: none; }
    }
    .oculta { transform: translateY(140%); opacity: 0; visibility: hidden; }
    .resumen {
      display: grid;
      min-height: var(--toque-min);
      align-content: center;
      text-decoration: none;
      line-height: 1.25;
    }
    .plan { font-size: var(--t-xs); color: var(--c-texto-vidrio-2); }
    .precio { font-size: var(--t-base); font-weight: 700; }
  `,
})
export class BarraMovil {
  private readonly pedido = inject(PedidoStore);
  private readonly seguimiento = inject(SeguimientoScrollService);

  protected readonly cotizacion = this.pedido.cotizacion;
  protected readonly mensaje = this.pedido.mensajeWhatsapp;
  protected readonly oculta = computed(() => this.seguimiento.seccionActiva() === 'contacto');
}
