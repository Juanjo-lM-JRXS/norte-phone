/**
 * Reglas internas del modelo de negocio. NO se importan desde componentes:
 * solo las usan las pruebas para garantizar que ningún precio publicado
 * rompa la ganancia mínima. Así los pisos no quedan en el bundle público.
 */
export const REGLAS_INTERNAS = {
  /** Precio final menos referido nunca por debajo de esto (ganancia mínima de 300.000). */
  reglaDeOro: 5_450_000,
  pisoDeEmergencia: 5_500_000,
  pagoReferido: 100_000,
} as const;
