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
      this.router.navigate(['/dashboard'], {replaceUrl: true});
      return false
      
    }
    return true
  }
  }

