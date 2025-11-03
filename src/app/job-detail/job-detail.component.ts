import { Component, inject } from '@angular/core';
import { ApiService, Job } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { JobApplyingComponent } from '../job-applying/job-applying.component';
import { MatDialog } from '@angular/material/dialog';
import { TimeAgoPipe } from '../pipes/time-ago';
import { Authservice } from '../services/authservice';



@Component({
  selector: 'app-job-detail',
  standalone:true,
  imports: [CommonModule,DialogModule,TimeAgoPipe],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css'
})
export class JobDetailComponent {
   job?: Job;
  loading = true;
  
   constructor(private dialog: MatDialog,
    private route: ActivatedRoute,
    private apiService: ApiService, private authService: Authservice
  , private router: Router) {}

  // job-detail.component.ts
openApplyDialog(jobId: number) {
  if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/signin'])}

    if (this.authService.isLoggedIn() ===true) {
       const dialogRef = this.dialog.open(JobApplyingComponent, {
      width: '90vw',
    height: '90vh',
    maxWidth: '90vw',
    maxHeight: '90vh',
   data: { jobId }
  });
   
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // handle successful submission
    }
  });
}
      
    }

 
 


  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));    
    this.apiService.getJobById(id).subscribe({
      next: (data: any) => {
        this.job = data.response;
        
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }


}
