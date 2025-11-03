// src/app/guards/admin.guard.ts

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Authservice } from '../services/authservice';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  constructor(private authService: Authservice, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = this.authService.getToken();
    if (!token) return this.router.createUrlTree(['/']);

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.isAdmin || this.router.createUrlTree(['/']);
    } catch (e) {
      return this.router.createUrlTree(['/']);
    }
  }
}
