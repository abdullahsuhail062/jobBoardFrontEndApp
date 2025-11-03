import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Authservice } from './services/authservice';
import { DarkModeService } from './dark-mode.service';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { SigninComponent } from './signin/signin.component';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { SplashService } from './shared/services/splash.service';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { take } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent   {
  title = 'job-board-webapp';
  role: string  | null = null
  
 constructor(private splashService: SplashService,private darkModeService: DarkModeService ,private authService: Authservice, private router: Router){}

  ngAfterViewInit() {
    this.splashService.hideSplash();
    this.userRole()
  }


  userRole(): void {
    this.authService.role$.pipe(take(1)).subscribe(role => {this.role = role})
    if (this.role=== 'EMPLOYER') {
      this.router.navigate(['/emploter-dashboard'])
      
    }

    if (this.role=== 'FREELANCER') {
      this.router.navigate(['/dashboard'])
      
    }
    
  }}


 
  
 




  

