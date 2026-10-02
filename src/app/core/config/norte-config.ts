import { InjectionToken } from '@angular/core';

export interface NorteConfig {
  /** Número en formato internacional sin "+" ni espacios, para wa.me. */
  whatsappNumero: string;
  /** Número como se le muestra a la persona. */
  whatsappVisible: string;
}

export const NORTE_CONFIG = new InjectionToken<NorteConfig>('NORTE_CONFIG');

// PENDIENTE: reemplazar por el número real de WhatsApp de Norte.
export const NORTE_CONFIG_DEFAULT: NorteConfig = {
  whatsappNumero: '573000000000',
  whatsappVisible: '+57 300 000 0000',
};
