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
  constructor(
    private actions$: Actions,
    private router: Router,
    private apiService: ApiService,
    private authService: Authservice,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    console.log('AuthEffects instance created', { actions: !!this.actions$ });
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('@ngrx/effects/init'),
      map(() => {
        if (!this.isBrowser()) return { type: '[Auth] Skipped Init (SSR)' };

        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const user = localStorage.getItem('user')
          ? JSON.parse(localStorage.getItem('user')!)
          : null;

        if (token && role) {
          return AuthActions.loginSuccess({ token, role: role as any, user });
        } else {
          return { type: '[Auth] No Persisted Login' };
        }
      })
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      tap(a => console.log('login effect received action:', a)),
      ofType(AuthActions.login),
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

          localStorage.setItem('token', action.token);
          localStorage.setItem('role', action.role);
          localStorage.setItem('user', JSON.stringify(action.user));

          if (action.role === 'EMPLOYER') {
            this.router.navigate(['/employer-dashboard']);
          } else if (action.role === 'FREELANCER') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/']);
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
          localStorage.clear();
          this.router.navigate(['/signin']);
        })
      );
    },
    { dispatch: false }
  );
}
