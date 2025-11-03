import { ApplicationConfig, inject, isDevMode, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { provideEntityData } from '@ngrx/data';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthInterceptor } from './authInterceptor';
import { entityConfig } from './entity-metadata';
import { isPlatformBrowser } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([AuthInterceptor])),
    provideStore({ auth: authReducer }),
    provideRouterStore(),
    provideEntityData(entityConfig),
    provideEffects(), // base registration, required

    {
      provide: 'AUTH_EFFECTS_BROWSER_ONLY',
      useFactory: () => {
        const platformId = inject(PLATFORM_ID);
        return isPlatformBrowser(platformId) ? provideEffects(AuthEffects) : [];
      },
    },

    // ✅ Add NgRx Store DevTools (only in dev mode)
    provideStoreDevtools({
      maxAge: 25,               // keeps last 25 actions
      logOnly: !isDevMode(),    // restrict extension to log-only in production
      autoPause: true,          // pauses recording when DevTools window is not open
      trace: false,             // set true to enable stack traces
      traceLimit: 75,
      connectInZone: true,
    }),
  ],
};
