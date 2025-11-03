import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private isDarkMode$ = new BehaviorSubject<boolean>(false);
  private storageKey = 'dark-mode';

  constructor(
    private overlayContainer: OverlayContainer,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize from localStorage
      const dark = localStorage.getItem(this.storageKey) === 'true';
      this.isDarkMode$.next(dark);
      if (dark) {
        document.body.classList.add('dark-mode'); 
  const overlay = this.overlayContainer.getContainerElement();
    overlay.classList.add('dark-mode');
      }
    }
  }

  enableDarkMode(){
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode$.next(true);
      document.body.classList.add('dark-mode'); 
        const overlay = this.overlayContainer.getContainerElement();
    overlay.classList.add('dark-mode');
    
      localStorage.setItem(this.storageKey, 'true'); 
    }
  }

  disableDarkMode(){
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode$.next(false);
      document.body.classList.remove('dark-mode'); 
        const overlay = this.overlayContainer.getContainerElement();
    overlay.classList.remove('dark-mode');
      localStorage.setItem(this.storageKey, 'false'); 
    }
  }

  toggle(){
    if(this.isDarkMode$.value){
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  getDarkMode(){
    return this.isDarkMode$.asObservable();
  }

  isDark(){
    return this.isDarkMode$.value;
  }
}
