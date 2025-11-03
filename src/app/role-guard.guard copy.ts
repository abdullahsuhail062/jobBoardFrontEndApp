import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Authservice } from './services/authservice';

@Injectable({ providedIn: 'root' })
 export class RoleGuard implements CanActivate  {
  constructor(private auth: Authservice, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const expectedRole = route.data['expectedRole'];

    return this.auth.role$.pipe(
      map(role => role === expectedRole),
      tap(isAllowed => {
        if (!isAllowed) {
          this.router.navigate(['/unauthorized']);
        }
      })
    );
  }
}
