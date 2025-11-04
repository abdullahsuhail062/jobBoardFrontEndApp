import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-notification',
  imports: [FormsModule],
  templateUrl: './admin-notification.component.html',
  styleUrl: './admin-notification.component.css'
})
export class AdminNotificationComponent {
  message: string = ''
  title: string = ''

  constructor(private router: Router,private apiService: ApiService){}

  submitNotification(){
      const payload = {title: this.title, message: this.message}
      this.apiService.sendNotification(payload).subscribe({next: (response) => {
        this.title = '';
        this.message = '';
        this.router.navigate(['/dashboard'])
        

      }})
  }


}
