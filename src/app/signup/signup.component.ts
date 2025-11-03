
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { strongPasswordValidator } from '../validators/strong-password.validator'
import { matchPasswordValidator } from '../validators/match-password.validator';
import { MatIconModule} from '@angular/material/icon'
import {ApiService} from '../api.service'
import { __values } from 'tslib';
import { Authservice } from '../services/authservice';
import { FormErrorHandlerService } from '../services/form-error-handler.service';







@Component({
  selector: 'app-signup',
  imports: [MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, RouterLink, MatIconModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  private formBuilder = inject(FormBuilder);
  hidePassword:boolean = true
  hideConfirmPassword:boolean = true
  loading: boolean = false
 
   
  

  constructor(private router: Router,private apiService: ApiService, private authService: Authservice,private formErrorHandler: FormErrorHandlerService ){}
  
  
  
  formSignUp = this.formBuilder.group({  username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, strongPasswordValidator]], confirmPassword:['', Validators.required]}, {
      validators: matchPasswordValidator('password', 'confirmPassword')
    })


  
  
  onSubmit(){
    if (this.formSignUp.valid) {
      this.isLoadingFn();
      const username = this.formSignUp.get('username')?.value;
      const email = this.formSignUp.get('email')?.value;
      const password = this.formSignUp.get('password')?.value;
      const myData = { username, email, password };      
      this.apiService.registerUser( myData).subscribe({next: (response)=> {
        const token = response.token;
        this.authService.setToken(token)
        
        
        
        this.router.navigate(['/user-optup'],{ replaceUrl: true })
      },error: (error)=> {
        this.isLoadingFn();
        this.formErrorHandler.applyBackendErrors(this.formSignUp, error);
        
        
      }})}}
 
  isLoadingFn(){
    this.loading = !this.loading
  }
  
  }
  





