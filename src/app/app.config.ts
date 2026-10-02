import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withIncrementalHydration } from '@angular/platform-browser';
import { NORTE_CONFIG, NORTE_CONFIG_DEFAULT } from './core/config/norte-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withIncrementalHydration()),
    { provide: NORTE_CONFIG, useValue: NORTE_CONFIG_DEFAULT },
  ],
};
