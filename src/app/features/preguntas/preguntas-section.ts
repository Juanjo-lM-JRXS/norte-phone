import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentFacade } from '../../core/content/content.facade';
import { PreguntasView } from './preguntas-view';

@Component({
  selector: 'app-preguntas-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PreguntasView],
  template: `<app-preguntas-view [preguntas]="contenido.preguntas()" />`,
})
export class PreguntasSection {
  protected readonly contenido = inject(ContentFacade);
}
