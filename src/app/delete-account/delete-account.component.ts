import { Component } from '@angular/core';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon'
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Authservice } from '../services/authservice';
import { FormsModule } from '@angular/forms';





@Component({
  selector: 'app-delete-account',
  imports: [FormsModule],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.css'
})
export class DeleteAccountComponent {
  password: string = '';
  errorMessage: string   | null ='';
  showPassword: boolean = false
  isDeleting: boolean = false

  constructor(private authService: Authservice, private router: Router,private apiService: ApiService,private matDialogRef: MatDialogRef<DeleteAccountComponent>){}


  confirmDeletion(): void {
     if (!this.password || this.password.length < 4) {
      this.errorMessage = 'Please enter a valid password.';
      return 
    }
    this.isDeletingAccountFn()
    
    this.apiService.deleteAccount(this.password).subscribe({next: (data) => {
      if (data) {
        this.matDialogRef.close(true)
        this.isDeletingAccountFn()
        
      }
      
     
    
      
    },error: (error) => {
      this.errorMessage = error.error.error
      this.isDeletingAccountFn()
    }})
   

  }

  cancel(): void {
    this.matDialogRef.close(false); 
  }
  toggleShowPassword(){
    this.showPassword = !this.showPassword

  }
  
    isDeletingAccountFn(){
      this.isDeleting = !this.isDeleting
      if (this.isDeleting ===true) {
        this.errorMessage = null
        
      }
    }

}
