import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
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

export const appConfig: ApplicationConfig = {
  providers: [
    // Optional optimization for change detection
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Routing and HTTP setup
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([AuthInterceptor])),

    // ✅ NgRx Store setup
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    provideRouterStore(),
    provideEntityData(entityConfig),

    // ✅ NgRx DevTools (enabled only in dev mode)
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
  ],
};
