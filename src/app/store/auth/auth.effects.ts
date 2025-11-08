import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { catchError, map, switchMap, tap, of } from 'rxjs';
import { Authservice } from '../../services/authservice';
import { ApiService } from '../../api.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthEffects {
  private isInitialLoad = true;
  private lastLogoutTime = 0;
  private readonly LOGOUT_DEBOUNCE_MS = 500; // Prevent rapid logout calls

  constructor(
    private actions$: Actions,
    private router: Router,
    private apiService: ApiService,
    private authService: Authservice,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    console.log('AuthEffects instance created', { actions: !!this.actions$ });
    
    // Set flag to false after a short delay to allow init to complete
    if (this.isBrowser()) {
      setTimeout(() => {
        this.isInitialLoad = false;
      }, 1000);
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('@ngrx/effects/init'),
      map(() => {
        if (!this.isBrowser()) {
          return { type: '[Auth] Skipped Init (SSR)' };
        }

        try {
          // Check both token key formats (in case of inconsistency)
          const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
          const role = localStorage.getItem('role');
          
          if (!token || !role) {
            return { type: '[Auth] No Persisted Login' };
          }
          
          // Check token expiration before restoring
          const expiry = localStorage.getItem('token_expires_at');
          if (expiry) {
            const expired = Date.now() > parseInt(expiry, 10);
            if (expired) {
              console.log('Token expired, clearing auth data');
              localStorage.removeItem('token');
              localStorage.removeItem('auth_token');
              localStorage.removeItem('role');
              localStorage.removeItem('user');
              localStorage.removeItem('token_expires_at');
              localStorage.removeItem('auth_avatar_key');
              return { type: '[Auth] Token Expired' };
            }
          } else {
            // If no expiry set, clear the token (it's invalid)
            console.log('No token expiry found, clearing auth data');
            localStorage.removeItem('token');
            localStorage.removeItem('auth_token');
            localStorage.removeItem('role');
            localStorage.removeItem('user');
            localStorage.removeItem('token_expires_at');
            return { type: '[Auth] No Valid Token' };
          }

          let user = null;
          const userStr = localStorage.getItem('user');
          if (userStr) {
            try {
              user = JSON.parse(userStr);
            } catch (e) {
              console.error('Failed to parse user from localStorage:', e);
              localStorage.removeItem('user');
            }
          }

          if (token && role && (role === 'EMPLOYER' || role === 'FREELANCER')) {
            console.log('Restoring auth state from localStorage');
            return AuthActions.loginSuccess({ 
              token, 
              role: role as 'EMPLOYER' | 'FREELANCER', 
              user 
            });
          }
        } catch (error) {
          console.error('Error loading auth from localStorage:', error);
          // Clear potentially corrupted data
          localStorage.removeItem('token');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('role');
          localStorage.removeItem('user');
          localStorage.removeItem('token_expires_at');
          localStorage.removeItem('auth_avatar_key');
        }

        return { type: '[Auth] No Persisted Login' };
      })
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      tap(a => console.log('login effect received action:', a)),
      switchMap(({ credentials }) =>
        this.apiService.loginUser(credentials).pipe(
          map((response) =>
            AuthActions.loginSuccess({
              token: response.token,
              role: response.role,
              user: response.user
            })
          ),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          if (!this.isBrowser()) return;

          try {
            // Always save to localStorage - use auth_token to match AuthService
            localStorage.setItem('auth_token', action.token);
            localStorage.setItem('token', action.token); // Also save as token for compatibility
            localStorage.setItem('role', action.role);
            localStorage.setItem('user', JSON.stringify(action.user));
            
            // Set token expiration (1 hour from now)
            const expiresAt = Date.now() + 60 * 60 * 1000;
            localStorage.setItem('token_expires_at', expiresAt.toString());

            // Don't navigate during initial load - let guards handle routing
            if (this.isInitialLoad) {
              console.log('Skipping navigation during initial load');
              return;
            }

            // Only navigate after initial load (i.e., on actual login)
            const currentUrl = this.router.url;
            const targetRoute = action.role === 'EMPLOYER' 
              ? '/employer-dashboard' 
              : action.role === 'FREELANCER' 
                ? '/dashboard' 
                : '/';

            // Only navigate if not already on the target route
            if (currentUrl !== targetRoute && !currentUrl.startsWith(targetRoute)) {
              console.log(`Navigating to ${targetRoute} from ${currentUrl}`);
              this.router.navigate([targetRoute], { replaceUrl: true });
            }
          } catch (error) {
            console.error('Error in loginRedirect effect:', error);
          }
        })
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          if (!this.isBrowser()) return;
          
          // Debounce logout to prevent rapid calls
          const now = Date.now();
          if (now - this.lastLogoutTime < this.LOGOUT_DEBOUNCE_MS) {
            console.log('Logout debounced, ignoring duplicate call');
            return;
          }
          this.lastLogoutTime = now;
          
          try {
            console.log('Executing logout');
            
            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user');
            localStorage.removeItem('token_expires_at');
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_avatar_key');
            
            // Only navigate if not already on signin/landing page
            const currentUrl = this.router.url;
            if (!currentUrl.includes('/signin') && 
                !currentUrl.includes('/signup') && 
                currentUrl !== '/') {
              console.log('Logging out, navigating to signin from', currentUrl);
              this.router.navigate(['/signin'], { replaceUrl: true });
            } else {
              console.log('Already on signin/landing page, skipping navigation');
            }
          } catch (error) {
            console.error('Error in logout effect:', error);
          }
        })
      );
    },
    { dispatch: false }
  );
}
