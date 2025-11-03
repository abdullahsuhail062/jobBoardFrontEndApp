import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-jobposting',
  imports: [FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './jobposting.html',
  styleUrl: './jobposting.css'
})
export class Jobposting {
  jobForm: FormGroup

  constructor(private apiService: ApiService,private router: Router){
    this.jobForm = new FormBuilder().group({
       jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      location: ['', Validators.required],
      jobType: ['', Validators.required],
      jobDescription: ['', Validators.required],
    })
  }



  onSubmit(){
    if (this.jobForm.valid) {
      this.apiService.postJob(this.jobForm.value).subscribe({next: (response) => {
        this.router.navigate(['/dashboard'])
        
      },error: (error) => {console.log(error.error.error);
      }})

      
      
    }

  }

  createdAt(){
    const data = new Date()
    return data.toDateString()















  }
}
