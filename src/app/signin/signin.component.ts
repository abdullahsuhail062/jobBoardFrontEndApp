import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'; 
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { FormErrorHandlerService } from '../services/form-error-handler.service';
import { MatIcon } from '@angular/material/icon';
import { Authservice } from '../services/authservice';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth/auth.actions';









@Component({
  selector: 'app-signin',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, RouterLink, MatIcon],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})

export class SigninComponent {
  role: string | null = null;
  private formBuilder = inject(FormBuilder);
  loading = false
  hidePassword: boolean = true
constructor(private store: Store,private authService: Authservice,private apiService: ApiService, private router: Router,private formErrorHandlerService: FormErrorHandlerService){}

signinForm = this.formBuilder.group({ email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required]]})


  onSubmit(){
    if (this.signinForm.valid) {

      const credentials = this.signinForm.value as {email: string, password: string, role: string}
       this.store.dispatch(AuthActions.login({credentials}));
       if (credentials) {
               console.log(credentials,'credentials');
       }
        
  //     this.apiService.loginUser(credentials).subscribe({next: (response) => {this.router.navigate(['/user-optup'],{ replaceUrl: true });
  //     const token = response.token;
  //   this.authService.setToken(token)
  //    this.authService.role$.subscribe(roleValue => {
  //    this.role = roleValue;
  //   if ( this.role=== 'EMPLOYER') {
  //     this.router.navigate(['/employer-dashboard']) 
      
  //       }
  //   if (this.role === 'FREELANCER') {
  //     this.router.navigate(['/dashboard']) 
    
    
  //   }})},

    
      
  //     error: (error) =>{
  //       this.isLoadingFn()
  //       this.formErrorHandlerService.applyBackendloginUserErrors(this.signinForm, error)}})
      
  //   }
  // }

  // isLoadingFn(){
  //   this.loading = !this.loading
  //  }

  }}}
