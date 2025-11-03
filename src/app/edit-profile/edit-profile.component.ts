import { Component, Inject, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ApiService } from '../api.service';
import { Authservice } from '../services/authservice';
import { MatIcon } from '@angular/material/icon';
import { ImageServiceService } from '../image-service.service';








@Component({
  selector: 'app-edit-profile',
  imports: [MatDialogContent,MatFormField,MatLabel,MatDialogActions, FormsModule,MatIcon],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})

export class EditProfileComponent implements OnInit{
username: string | null = null


  avatarPreview: any
 constructor(private authService: Authservice,
    public dialogRef: MatDialogRef<EditProfileComponent>,
 private apiService: ApiService, private imageService: ImageServiceService 
  ) {
  }
  

 ngOnInit(): void {
  this.getUsername()
}

  getUsername(){
    let fallbackName = 'User'
this.authService.username$.subscribe(name => {fallbackName = name as string})
return this.username =  fallbackName;
 


  }
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  save() {
    this.apiService.updateUserProfileDp(this.avatarPreview, this.username ).subscribe({next: (data) => {this.authService.setToken(data.token);
    this.imageService.updateImage(data.avatar)
     
       
      
    }})
    this.dialogRef.close({ name: this.username, avatar: this.avatarPreview });
  }

  

  cancel() {
    this.dialogRef.close();
  }

}
