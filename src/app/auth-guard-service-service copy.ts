import { Injectable } from '@angular/core';
import { Authservice } from './services/authservice';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService {

  constructor(private authService: Authservice, private router: Router) { }

   canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/signin'], {replaceUrl: true});
      return false
      
    }
    return true
  }
}
