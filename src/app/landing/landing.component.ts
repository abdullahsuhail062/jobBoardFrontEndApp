import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService, Job } from '../api.service';

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  jobs: Job[] =[]


  constructor(private apiService: ApiService) {}

  ngOnInit() {

    this.apiService.getJobs().subscribe({next: (response: any) => {
      this.jobs = response.response
      
    }})
  }

}