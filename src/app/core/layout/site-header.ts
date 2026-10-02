import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { LogoNorte } from '../../shared/ui/logo-norte';
import { BotonWhatsapp } from '../../shared/ui/boton-whatsapp';
import { CopPipe } from '../../shared/pipes/cop.pipe';
import { SeguimientoScrollService } from '../services/seguimiento-scroll.service';
import { PedidoStore } from '../state/pedido.store';
import { ContentFacade } from '../content/content.facade';
import { ITEMS_NAVEGACION } from './navegacion';

/**
 * Header de vidrio con la línea de seguimiento (progreso de la página) y el
 * menú. En celular el menú es un <dialog> modal: atrapa el foco, cierra con
 * Esc y deja el resto de la página inerte sin código extra.
 */
@Component({
  selector: 'app-site-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LogoNorte, BotonWhatsapp, CopPipe],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  private readonly seguimiento = inject(SeguimientoScrollService);
  private readonly pedido = inject(PedidoStore);
  private readonly contenido = inject(ContentFacade);
  private readonly dialogo = viewChild.required<ElementRef<HTMLDialogElement>>('dialogo');

  protected readonly items = ITEMS_NAVEGACION;
  protected readonly activa = this.seguimiento.seccionActiva;
  protected readonly progreso = this.seguimiento.progresoPagina;
  protected readonly abierto = signal(false);
  protected readonly mensaje = this.pedido.mensajeWhatsapp;
  protected readonly planPrincipal = this.contenido.planPrincipal;
  protected readonly pedidoEjemplo = this.contenido.pedidoEjemplo;
  protected readonly escalaSeguimiento = computed(() => `scaleX(${this.progreso().toFixed(4)})`);

  protected abrir(): void {
    this.dialogo().nativeElement.showModal();
    this.abierto.set(true);
  }

  protected cerrar(): void {
    this.dialogo().nativeElement.close();
  }

  protected alCerrar(): void {
    this.abierto.set(false);
  }

  /** Clic en el fondo (fuera del panel) cierra el menú. */
  protected clicEnDialogo(evento: MouseEvent): void {
    if (evento.target === this.dialogo().nativeElement) this.cerrar();
  }
}
