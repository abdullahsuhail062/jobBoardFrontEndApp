import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SplashService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  hideSplash() {
    if (isPlatformBrowser(this.platformId)) {
      const splash = document.getElementById('app-splash');
      if (splash) {
        splash.classList.add('splash-hide');
        setTimeout(() => splash.remove(), 400); // matches your CSS transition
      }
    }
  }
}
