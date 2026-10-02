import { Injectable, computed, signal } from '@angular/core';
import { NORTE_CONTENT } from './norte.content';
import { ContenidoNorte } from './content.models';

/**
 * Fachada del contenido. Las features leen de aquí y nunca importan el archivo
 * de datos directamente; si mañana el contenido viene de un JSON o un CMS,
 * solo cambia esta clase.
 */
@Injectable({ providedIn: 'root' })
export class ContentFacade {
  private readonly contenido = signal<ContenidoNorte>(NORTE_CONTENT);

  readonly marca = computed(() => this.contenido().marca);
  readonly producto = computed(() => this.contenido().producto);
  readonly pedidoEjemplo = computed(() => this.contenido().pedidoEjemplo);
  readonly mediosDePago = computed(() => this.contenido().mediosDePago);
  readonly planes = computed(() => this.contenido().planes);
  readonly beneficios = computed(() => this.contenido().beneficios);
  readonly etapas = computed(() => this.contenido().etapas);
  readonly pruebas = computed(() => this.contenido().pruebas);
  readonly garantia = computed(() => this.contenido().garantia);
  readonly testimonios = computed(() => this.contenido().testimonios);
  readonly parche = computed(() => this.contenido().parche);
  readonly preguntas = computed(() => this.contenido().preguntas);

  /** Plan principal (el encargo) para mostrar el "desde" en toda la página. */
  readonly planPrincipal = computed(() => this.planes()[0]);
  readonly planInmediato = computed(() => this.planes().find((p) => p.id === 'norte-ya')!);
}
