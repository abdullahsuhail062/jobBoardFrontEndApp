import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth/auth.actions';
import { selectIsLoggedIn, selectUserRole, selectUserId, selectUsernmae } from '../store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';


export interface DecodedToken {
  id: number;
  email: string;
  exp: number;
  iat: number;
  username: string;
  avatar: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class Authservice {
  private avatarKey = 'auth_avatar_key';
  private tokenKey = 'auth_token';
  private tokenExpiryKey = 'token_expires_at';

  private apiUrl= environment.apiBaseUrl

  isLoggedIn$!: Observable<boolean>;
  role$!: Observable<string | null>;
  userId$!: Observable<string | null>;
  username$!: Observable<string | null>;;


  constructor(private http: HttpClient,
    private router: Router,
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.role$ = this.store.select(selectUserRole);
    this.userId$ = this.store.select(selectUserId);
    this.username$ = this.store.select(selectUsernmae);

  }

  // login(credentials: { email: string; password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/users/loginUser`, credentials);
  // }

  // register(userData: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/users/registerUser`, userData);
  // }


  /** ✅ Called when backend returns token */
  setToken(token: string): void {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour

      this.saveToStorage(this.tokenKey, token);
      this.saveToStorage(this.tokenExpiryKey, expiresAt.toString());

      this.store.dispatch(
        AuthActions.loginSuccess({
          token,
          role: decoded.role as 'EMPLOYER' | 'FREELANCER',
          user: {
            id: decoded.id,
            email: decoded.email,
            username: decoded.username,
            avatar: decoded.avatar,
            role: decoded.role,
          },
        })
      );
    } catch (error) {
      console.error('Token decoding failed:', error);
      this.logout();
    }
  }

  /** ✅ Used when refreshing the page */
  loadFromStorage(): void {
    const token = this.getFromStorage(this.tokenKey);
    if (!token) return;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      this.store.dispatch(
        AuthActions.loginSuccess({
          token,
          role: decoded.role as 'EMPLOYER' | 'FREELANCER',
          user: {
            id: decoded.id,
            email: decoded.email,
            username: decoded.username,
            avatar: decoded.avatar,
            role: decoded.role,
          },
        })
      );
    } catch (error) {
      console.error('Token invalid or expired:', error);
      this.logout();
    }
  }

  /** ✅ Clears store + storage */
  logout(): void {
    this.removeFromStorage(this.tokenKey);
    this.removeFromStorage(this.tokenExpiryKey);
    this.removeFromStorage(this.avatarKey);
    this.store.dispatch(AuthActions.logout());

    // if (isPlatformBrowser(this.platformId)) {
    //   this.router.navigate(['/']);
    // }
  }

  /** ✅ Route guard-style role check */
  canActivate(route: any): boolean {
    const expectedRole = route.data['expectedRole'];
    const decoded = this.getDecodedToken();

    if (decoded?.role === expectedRole) return true;

    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/unauthorized']);
    }
    return false;
  }

  /** ✅ Safe decode */
  getDecodedToken(): DecodedToken | null {
    const token = this.getFromStorage(this.tokenKey);
    if (!token || token.split('.').length !== 3) return null;

    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Invalid token:', error);
      this.logout();
      return null;
    }
  }

  /** ✅ Helpers */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    if (this.isTokenExpired()) {
      this.logout();
      return null;
    }
    return this.getFromStorage(this.tokenKey);
  }

  private isTokenExpired(): boolean {
    const expiry = this.getFromStorage(this.tokenExpiryKey);
    if (!expiry) return true;

    const expired = Date.now() > parseInt(expiry, 10);
    if (expired) this.logout();
    return expired;
  }

  redirectIfLoggedIn(): void {
    if (this.isLoggedIn() && isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/dashboard']);
    }
  }

  /** ✅ Safe localStorage methods */
  private saveToStorage(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) localStorage.setItem(key, value);
  }

  private getFromStorage(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) return localStorage.getItem(key);
    return null;
  }

  private removeFromStorage(key: string): void {
    if (isPlatformBrowser(this.platformId)) localStorage.removeItem(key);
  }
}
