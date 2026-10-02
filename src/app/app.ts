import { ChangeDetectionStrategy, Component, afterNextRender, effect, inject, DOCUMENT } from '@angular/core';
import { SiteHeader } from './core/layout/site-header';
import { SiteFooter } from './core/layout/site-footer';
import { BarraMovil } from './core/layout/barra-movil';
import { IDS_SECCIONES } from './core/layout/navegacion';
import { SeguimientoScrollService } from './core/services/seguimiento-scroll.service';
import { PreferenciasMovimientoService } from './core/services/preferencias-movimiento.service';
import { HeroSection } from './features/hero/hero-section';
import { ComoFuncionaSection } from './features/como-funciona/como-funciona-section';
import { PlanesSection } from './features/planes/planes-section';
import { ConfianzaSection } from './features/confianza/confianza-section';
import { ElParcheSection } from './features/el-parche/el-parche-section';
import { PreguntasSection } from './features/preguntas/preguntas-section';
import { ContactoSection } from './features/contacto/contacto-section';

/**
 * Página única. Las secciones bajo el pliegue se prerenderizan completas
 * (el contenido está en el HTML desde el inicio) pero su JavaScript se
 * hidrata solo cuando llegan a pantalla (hidratación incremental).
 */
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SiteHeader,
    SiteFooter,
    BarraMovil,
    HeroSection,
    ComoFuncionaSection,
    PlanesSection,
    ConfianzaSection,
    ElParcheSection,
    PreguntasSection,
    ContactoSection,
  ],
  template: `
    <a class="saltar-contenido" href="#contenido">Saltar al contenido</a>
    <app-site-header />
    <main id="contenido" tabindex="-1">
      <!-- El hero se ve de inmediato; se hidrata cuando el navegador queda libre. -->
      @defer (hydrate on idle) {
        <app-hero-section />
      }
      @defer (hydrate on viewport) {
        <app-como-funciona-section />
      }
      @defer (hydrate on viewport) {
        <app-planes-section />
      }
      @defer (hydrate on viewport) {
        <app-confianza-section />
      }
      @defer (hydrate on viewport) {
        <app-el-parche-section />
      }
      @defer (hydrate on viewport) {
        <app-preguntas-section />
      }
      @defer (hydrate on viewport) {
        <app-contacto-section />
      }
    </main>
    <!-- El pie no tiene nada interactivo: se queda como HTML estático. -->
    @defer (hydrate never) {
      <app-site-footer />
    }
    <app-barra-movil />
  `,
  styles: `
    main:focus { outline: none; }
  `,
})
export class App {
  constructor() {
    const seguimiento = inject(SeguimientoScrollService);
    const prefs = inject(PreferenciasMovimientoService);
    const documento = inject(DOCUMENT);

    // Respaldo para navegadores sin la media query de transparencia reducida.
    effect(() => {
      documento.documentElement.classList.toggle('sin-transparencia', prefs.transparenciaReducida());
    });

    afterNextRender(() => seguimiento.iniciar(IDS_SECCIONES));
  }
}
