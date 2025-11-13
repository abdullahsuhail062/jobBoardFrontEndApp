import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'; 
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ApiService } from '../api.service';
import { FormErrorHandlerService } from '../services/form-error-handler.service';
import { MatIcon } from '@angular/material/icon';
import { Authservice } from '../services/authservice';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth/auth.actions';
import { selectAuthError, selectAuthLoading } from '../store/auth/auth.selectors';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, RouterLink, MatIcon, AsyncPipe],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit, OnDestroy {
  private formBuilder = inject(FormBuilder);
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  hidePassword: boolean = true;
  private subscriptions = new Subscription();

  constructor(
    private store: Store,
    private authService: Authservice,
    private apiService: ApiService,
    private router: Router,
    private formErrorHandlerService: FormErrorHandlerService
  ) {
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  signinForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  ngOnInit() {
    // Subscribe to errors and handle them
    this.subscriptions.add(
      this.error$.pipe(
        filter(error => error !== null)
      ).subscribe(error => {
        if (error) {
          console.error('Login error:', error);
          // You can apply form errors here if needed
          // this.formErrorHandlerService.applyBackendloginUserErrors(this.signinForm, error);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    if (this.signinForm.valid) {
      // Only send email and password - role comes from server response
      const credentials = {
        email: this.signinForm.value.email!,
        password: this.signinForm.value.password!
      };

      console.log('Dispatching login action with credentials:', credentials);
      
      // Dispatch login action - effects will handle the API call and navigation
      this.store.dispatch(AuthActions.login(credentials as any));
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.signinForm.controls).forEach(key => {
        this.signinForm.get(key)?.markAsTouched();
      });
    }
  }
}
