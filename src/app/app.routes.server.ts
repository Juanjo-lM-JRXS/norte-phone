import { RenderMode, ServerRoute } from '@angular/ssr';

/** Todo se prerenderiza en build: el sitio sale como HTML estático. */
export const serverRoutes: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Prerender }];
