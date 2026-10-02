import { Injectable, inject } from '@angular/core';
import { NORTE_CONFIG } from '../config/norte-config';

@Injectable({ providedIn: 'root' })
export class WhatsappLinkService {
  private readonly config = inject(NORTE_CONFIG);

  readonly numeroVisible = this.config.whatsappVisible;

  enlace(mensaje: string): string {
    return `https://wa.me/${this.config.whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
  }
}
