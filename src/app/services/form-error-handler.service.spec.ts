import { TestBed } from '@angular/core/testing';

import { FormErrorHandlerService } from './form-error-handler.service';

describe('FormErrorHandlerService', () => {
  let service: FormErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
