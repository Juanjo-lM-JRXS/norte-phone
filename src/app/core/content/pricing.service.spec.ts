import { PricingService } from './pricing.service';
import { NORTE_CONTENT } from './norte.content';
import { REGLAS_INTERNAS } from './reglas-internas';

describe('PricingService', () => {
  const servicio = new PricingService();
  const { planes, beneficios } = NORTE_CONTENT;
  const plan = (id: string) => planes.find((p) => p.id === id)!;
  const beneficio = (id: string) => beneficios.find((b) => b.id === id)!;

  it('ninguna combinación publicada rompe la regla de oro, incluso con referido', () => {
    for (const p of planes) {
      for (const b of beneficios) {
        const { precioPorEquipo } = servicio.cotizar(p, b);
        expect(precioPorEquipo - REGLAS_INTERNAS.pagoReferido).toBeGreaterThanOrEqual(
          REGLAS_INTERNAS.reglaDeOro,
        );
        expect(precioPorEquipo).toBeGreaterThanOrEqual(REGLAS_INTERNAS.pisoDeEmergencia);
      }
    }
  });

  it('Te lo traemos cuesta 5.650.000 y pide 60% de anticipo', () => {
    const c = servicio.cotizar(plan('te-lo-traemos'), beneficio('ninguno'));
    expect(c.precioPorEquipo).toBe(5_650_000);
    expect(c.anticipo).toBe(3_390_000);
    expect(c.saldo).toBe(2_260_000);
  });

  it('De a dos descuenta 100.000 por equipo y cotiza dos equipos', () => {
    const c = servicio.cotizar(plan('te-lo-traemos'), beneficio('de-a-dos'));
    expect(c.precioPorEquipo).toBe(5_550_000);
    expect(c.equipos).toBe(2);
    expect(c.total).toBe(11_100_000);
    expect(c.anticipo).toBe(6_660_000);
  });

  it('Norte Ya cuesta 5.800.000 y no maneja anticipo', () => {
    const c = servicio.cotizar(plan('norte-ya'), beneficio('kit-de-llegada'));
    expect(c.precioPorEquipo).toBe(5_800_000);
    expect(c.anticipo).toBeNull();
  });

  it('el encargo ahorra 150.000 frente a Norte Ya', () => {
    expect(servicio.ahorroFrenteA(plan('te-lo-traemos'), plan('norte-ya'))).toBe(150_000);
  });

  it('el regateo no existe como beneficio publicado', () => {
    expect(beneficios.some((b) => /regate/i.test(b.id + b.nombre))).toBe(false);
  });
});
