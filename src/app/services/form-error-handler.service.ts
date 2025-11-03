import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class FormErrorHandlerService {
  private fieldMap: { [key: string]: string } = {
    username: 'username',
    email: 'email'
    // Add more mappings as needed
  };
  /**
   * Applies backend errors to a given FormGroup
   * @param form The Angular form group
   * @param errorResponse The error response from the backend (expects errors: { field: message })
   */

  constructor() { }

  applyBackendErrors(form: FormGroup, errorResponse: any): void {
    const errors = errorResponse?.error?.databaseErrors;

    if (!errors) {
      console.warn('No form-related backend errors found:', errorResponse);
      return;
    }

    for (const field in errors) {
      const control = form.get(field);
      if (control) {
        control.setErrors({ backend: errors[field] });
        control.markAsTouched();
      } else {
        console.warn(`No form control found for backend field: '${field}'`);
      }
    }}

    applyBackendloginUserErrors(form: FormGroup, errorResponse:any): void {
      const errors = errorResponse?.error;
      

      if (!errors) {
        console.warn('No form-related backend errors found:', errorResponse);
        return;
      }
      for (const field in errors) {
        const control = form.get(field);
        if (control) {
          control.setErrors({ backend: errors[field] });
          
          control.markAsTouched();
        } else {
          console.warn(`No form control found for backend field: '${field}'`);
        }}

    }
}
