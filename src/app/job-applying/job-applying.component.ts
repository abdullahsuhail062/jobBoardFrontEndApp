import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-job-applying',
  standalone:true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './job-applying.component.html',
  styleUrl: './job-applying.component.css'
})
export class JobApplyingComponent {

   proposalForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<JobApplyingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobId: number }, private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.proposalForm = this.fb.group({
      coverLetter: ['', [Validators.required, Validators.minLength(20)]],
      bidAmount: ['', [Validators.required, Validators.min(1)]],
      estimatedTime: ['', Validators.required] 
    });
  }

  submitProposal(): void {
    console.log(this.data.jobId);
    
    if (this.proposalForm.invalid) return;

    // You can send to API here
    const proposalData = {
      jobId: this.data.jobId,
      ...this.proposalForm.value};
       this.apiService.storeProposal(proposalData).subscribe({next: (response) => {
        console.log(response);
        
       }})

    // Close dialog and pass data back to parent
    this.dialogRef.close(proposalData);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }




}
