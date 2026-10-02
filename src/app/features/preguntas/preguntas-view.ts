import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PreguntaFrecuente } from '../../core/content/content.models';
import { BotonWhatsapp } from '../../shared/ui/boton-whatsapp';

/** <details> nativo: funciona con teclado y sin JavaScript. */
@Component({
  selector: 'app-preguntas-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BotonWhatsapp],
  template: `
    <section id="preguntas" class="seccion seccion-clara" aria-labelledby="preguntas-titulo">
      <div class="contenedor rejilla">
        <div class="lateral">
          <h2 id="preguntas-titulo" class="titulo-seccion">Preguntas frecuentes</h2>
          <p class="entrada-seccion">¿No está tu duda? Escríbenos y te respondemos por chat.</p>
          <app-boton-whatsapp class="cta" texto="Preguntar por WhatsApp"
            mensaje="Hola Norte, tengo una pregunta:" />
        </div>
        <div class="lista">
          @for (p of preguntas(); track p.id) {
            <details class="pregunta" [attr.name]="'preguntas'">
              <summary>
                <span>{{ p.pregunta }}</span>
                <span class="icono" aria-hidden="true"></span>
              </summary>
              <p class="respuesta">{{ p.respuesta }}</p>
            </details>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    @use 'tokens' as *;
    :host { display: block; }
    .rejilla {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--s-6);
      @include desde($bp-lg) {
        grid-template-columns: minmax(0, 4fr) minmax(0, 7fr);
        gap: var(--s-8);
        align-items: start;
      }
    }
    .lateral {
      @include desde($bp-lg) { position: sticky; top: calc(var(--alto-header) + var(--s-6)); }
    }
    .cta { margin-top: var(--s-5); }
    .pregunta { border-top: 1px solid var(--c-linea-clara); }
    .pregunta:last-child { border-bottom: 1px solid var(--c-linea-clara); }
    summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--s-4);
      min-height: 64px;
      padding: var(--s-3) 0;
      font-family: var(--f-titulo);
      font-size: var(--t-lg);
      font-weight: 600;
      cursor: pointer;
      list-style: none;
      &::-webkit-details-marker { display: none; }
    }
    .icono {
      position: relative;
      width: 32px;
      height: 32px;
      flex: none;
      border-radius: 50%;
      border: 1.5px solid var(--c-noche);
      &::before, &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 12px;
        height: 1.5px;
        margin: -0.75px 0 0 -6px;
        background: var(--c-noche);
        transition: transform var(--dur-media) var(--ease-salida);
      }
      &::after { transform: rotate(90deg); }
    }
    .pregunta[open] .icono {
      background: var(--c-noche);
      &::before, &::after { background: var(--c-hueso); }
      &::after { transform: rotate(0deg); }
    }
    .respuesta { padding: 0 0 var(--s-5); max-width: 60ch; color: var(--c-grafito); }
    @include movimiento {
      .pregunta[open] .respuesta { animation: abrir var(--dur-media) var(--ease-salida); }
    }
    @keyframes abrir { from { opacity: 0; transform: translateY(-4px); } }
  `,
})
export class PreguntasView {
  readonly preguntas = input.required<PreguntaFrecuente[]>();
}
