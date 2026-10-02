import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { WhatsappLinkService } from '../../core/services/whatsapp-link.service';

/**
 * Llamado a la acción principal. Naranja con texto azul noche (6,1:1):
 * el verde de WhatsApp no se usa porque en Norte el verde significa "verificado".
 */
@Component({
  selector: 'app-boton-whatsapp',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="boton" [class.compacto]="variante() === 'compacto'" [class.grande]="variante() === 'grande'"
      [href]="enlace()" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 19.5 5.3 15.6A8 8 0 1 1 8.4 18.6Z" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linejoin="round" />
        <path d="M9.2 8.6c.3 2.6 2.4 4.9 5.2 5.4l.9-1.2 1.8.8-.4 1.6c-3.9.2-7.6-3.3-7.6-7.3l1.6-.4.8 1.8Z"
          fill="currentColor" />
      </svg>
      <span>{{ texto() }}</span>
      <span class="sr-only">(se abre WhatsApp)</span>
    </a>
  `,
  styles: `
    :host { display: inline-block; max-width: 100%; }
    .boton {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--s-2);
      min-height: 48px;
      min-width: var(--toque-min);
      padding: var(--s-3) var(--s-5);
      background: var(--c-naranja);
      color: var(--c-noche);
      font-family: var(--f-titulo);
      font-weight: 600;
      font-size: var(--t-base);
      text-decoration: none;
      border-radius: var(--r-pastilla);
      max-width: 100%;
      text-align: center;
      box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.35), 0 10px 24px -12px rgb(255 107 26 / 0.8);
      transition: transform var(--dur-corta) var(--ease-salida), box-shadow var(--dur-corta);
    }
    .boton:hover { transform: translateY(-1px); box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.35), 0 14px 28px -12px rgb(255 107 26 / 0.9); }
    .boton:active { transform: translateY(1px); }
    .compacto { min-height: var(--toque-min); padding: var(--s-2) var(--s-4); font-size: var(--t-sm); }
    .grande { min-height: 60px; padding: var(--s-4) var(--s-6); font-size: var(--t-lg); }
    svg { width: 1.25em; height: 1.25em; flex: none; }
  `,
})
export class BotonWhatsapp {
  private readonly whatsapp = inject(WhatsappLinkService);

  readonly mensaje = input.required<string>();
  readonly texto = input('Escribir por WhatsApp');
  readonly variante = input<'normal' | 'compacto' | 'grande'>('normal');

  protected readonly enlace = computed(() => this.whatsapp.enlace(this.mensaje()));
}
