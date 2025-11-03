import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Authservice } from '../services/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-optup',
  imports: [],
  templateUrl: './user-optup.component.html',
  styleUrl: './user-optup.component.css'
})
export class UserOptupComponent {
userRole: string | null = null;
constructor(private router: Router,private apiService: ApiService, private authService: Authservice) {}
  chooseRole(role: 'FREELANCER' | 'EMPLOYER'){
    this.apiService.setRole(role).subscribe({next: (response) => {
      this.authService.setToken(response.token)
      this.authService.role$.subscribe(roleValue => {this.userRole = roleValue})
      if (this.userRole=== 'FREELANCER') {
        this.router.navigate(['/dashboard'])
        }
        if (this.userRole=== 'EMPLOYER') {
          this.router.navigate(['/employer-dashboard'])
          
        }




    },error: (error) => {console.log(error.message);
    }})
   
  }

}
