import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BotonWhatsapp } from '../../shared/ui/boton-whatsapp';
import { EtiquetaEnvio } from '../../shared/ui/etiqueta-envio';

/** Cierre de la página: muestra el mensaje exacto que se va a enviar. */
@Component({
  selector: 'app-contacto-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BotonWhatsapp, EtiquetaEnvio],
  template: `
    <section id="contacto" class="seccion seccion-oscura" aria-labelledby="contacto-titulo">
      <div class="contenedor rejilla">
        <div>
          <h2 id="contacto-titulo" class="titulo">¿Te lo encargamos de una?</h2>
          <p class="entrada-seccion">
            Escríbenos por WhatsApp y te separamos el cupo con el anticipo. Te respondemos por chat, sin dejarte en visto.
          </p>
        </div>

        <app-etiqueta-envio tono="vidrio" class="despacho">
          <p class="rotulo">Este es el mensaje que nos vas a enviar</p>
          <p class="mensaje mono">{{ mensaje() }}</p>
          @if (!personalizado()) {
            <p class="sugerencia">¿Ya sabes qué plan quieres? Si lo armas, el mensaje se llena solo.</p>
            <a class="armar" href="#planes">Arma tu pedido</a>
          }
          <app-boton-whatsapp class="cta" variante="grande" texto="Enviar por WhatsApp" [mensaje]="mensaje()" />
          <p class="numero">WhatsApp <span class="mono">{{ numero() }}</span></p>
        </app-etiqueta-envio>
      </div>
    </section>
  `,
  styles: `
    @use 'tokens' as *;
    :host { display: block; }
    .seccion {
      overflow: hidden;
      background:
        radial-gradient(50rem 30rem at 80% 100%, rgb(255 107 26 / 0.22), transparent 70%),
        var(--c-noche);
    }
    .rejilla {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--s-7);
      @include desde($bp-lg) {
        grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
        align-items: center;
        gap: var(--s-8);
      }
    }
    .titulo { font-size: var(--t-hero); font-weight: 700; letter-spacing: -0.045em; line-height: 0.98; max-width: 12ch; overflow-wrap: break-word; hyphens: auto; }
    .despacho { --fondo-ojal: var(--c-noche); }
    .rotulo { font-size: var(--t-sm); color: var(--c-texto-vidrio-2); }
    .mensaje {
      margin-top: var(--s-3);
      padding: var(--s-4);
      background: rgb(15 27 45 / 0.6);
      border: 1px dashed var(--c-linea-oscura);
      border-radius: var(--r-etiqueta);
      font-size: var(--t-sm);
      line-height: 1.6;
    }
    .sugerencia {
      margin-top: var(--s-3);
      font-size: var(--t-sm);
      color: var(--c-texto-vidrio-2);
    }
    .armar {
      display: inline-flex;
      align-items: center;
      min-height: var(--toque-min);
      color: var(--c-hueso);
      font-weight: 600;
      text-decoration: underline;
      text-decoration-color: var(--c-naranja);
      text-decoration-thickness: 2px;
      text-underline-offset: 5px;
    }
    .cta { display: block; margin-top: var(--s-5); ::ng-deep a { width: 100%; } }
    .numero { margin-top: var(--s-4); font-size: var(--t-sm); color: var(--c-texto-vidrio-2); text-align: center; }
  `,
})
export class ContactoView {
  readonly mensaje = input.required<string>();
  readonly personalizado = input.required<boolean>();
  readonly numero = input.required<string>();
}
