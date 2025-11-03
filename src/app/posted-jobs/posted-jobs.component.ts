import { Component, OnInit } from '@angular/core';
import { ApiService, Job } from '../api.service';
import { Router } from '@angular/router';
import { Authservice } from '../services/authservice';
import { TimeAgoPipe } from '../pipes/time-ago';



@Component({
  selector: 'app-posted-jobs',
  imports: [TimeAgoPipe ],
  templateUrl: './posted-jobs.component.html',
  styleUrl: './posted-jobs.component.css'
})
export class PostedJobsComponent implements OnInit {
   jobs: Job[] = [];
  loading = true;

  constructor(private apiService: ApiService, private router: Router, private authService: Authservice){}

   ngOnInit() {
    this.apiService.getJobs().subscribe({
      next: (data:any) => {       
        this.jobs = data.response
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  viewJob(jobId: number) {
    if (this.authService.isLoggedIn()===true) {
      this.router.navigate(['/job-detail', jobId])
      
      
    }else
    this.router.navigate(['/signin']);    
  }

}
