import { DeferBlockBehavior, DeferBlockState, TestBed } from '@angular/core/testing';
import { App } from './app';
import { NORTE_CONFIG, NORTE_CONFIG_DEFAULT } from './core/config/norte-config';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: NORTE_CONFIG, useValue: NORTE_CONFIG_DEFAULT }],
      deferBlockBehavior: DeferBlockBehavior.Manual,
    }).compileComponents();
  });

  /** Crea la app con todas las secciones diferidas ya pintadas, como en el HTML prerenderizado. */
  async function crear() {
    const fixture = TestBed.createComponent(App);
    for (const bloque of await fixture.getDeferBlocks()) {
      await bloque.render(DeferBlockState.Complete);
    }
    await fixture.whenStable();
    return fixture;
  }

  it('muestra el eslogan como título principal', async () => {
    const fixture = await crear();
    const h1 = (fixture.nativeElement as HTMLElement).querySelector('h1');
    expect(h1?.textContent).toContain('Te lo traemos.');
    expect(h1?.textContent).toContain('Lo ves llegar.');
  });

  it('tiene un solo h1, el landmark main y el enlace para saltar al contenido', async () => {
    const fixture = await crear();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelector('main#contenido')).toBeTruthy();
    expect(el.querySelector('a.saltar-contenido')?.getAttribute('href')).toBe('#contenido');
  });

  it('muestra los precios públicos y nunca menciona el regateo', async () => {
    const fixture = await crear();
    const texto = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(texto).toContain('5.650.000 COP');
    expect(texto).toContain('5.800.000 COP');
    expect(texto.toLowerCase()).not.toContain('regate');
  });

  it('los enlaces de WhatsApp abren wa.me con mensaje', async () => {
    const fixture = await crear();
    const enlaces = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('a[href^="https://wa.me/"]');
    expect(enlaces.length).toBeGreaterThan(0);
    enlaces.forEach((a) => expect(a.href).toContain('?text='));
  });
});
