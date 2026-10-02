import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Plan, Producto } from '../../core/content/content.models';
import { BotonWhatsapp } from '../../shared/ui/boton-whatsapp';
import { EtiquetaEnvio } from '../../shared/ui/etiqueta-envio';
import { LogoNorte } from '../../shared/ui/logo-norte';
import { PlaceholderMedia } from '../../shared/ui/placeholder-media';
import { SelloNorte } from '../../shared/ui/sello-norte';
import { InclinacionDirective } from '../../shared/directives/inclinacion.directive';
import { CopPipe } from '../../shared/pipes/cop.pipe';
import { listaNatural } from '../../shared/utils/texto';

@Component({
  selector: 'app-hero-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BotonWhatsapp, EtiquetaEnvio, LogoNorte, PlaceholderMedia, SelloNorte, InclinacionDirective, CopPipe],
  templateUrl: './hero-view.html',
  styleUrl: './hero-view.scss',
})
export class HeroView {
  readonly eslogan = input.required<[string, string]>();
  readonly beneficio = input.required<string>();
  readonly producto = input.required<Producto>();
  readonly plan = input.required<Plan>();
  readonly pedido = input.required<string>();
  readonly mediosDePago = input.required<string[]>();
  readonly mensaje = input.required<string>();

  protected readonly pagos = computed(() => listaNatural(this.mediosDePago()));
}
