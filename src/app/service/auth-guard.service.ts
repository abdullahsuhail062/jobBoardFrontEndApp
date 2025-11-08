import { Injectable } from '@angular/core';
import { Authservice } from '../services/authservice';
import { CanActivate, mapToCanActivate, Router } from '@angular/router';
mapToCanActivate


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {

  constructor(private authService: Authservice, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // Get role from store or localStorage to redirect to correct dashboard
      const role = localStorage.getItem('role');
      const targetRoute = role === 'EMPLOYER' ? '/employer-dashboard' : '/dashboard';
      this.router.navigate([targetRoute], {replaceUrl: true});
      return false;
    }
    return true;
  }
  }

