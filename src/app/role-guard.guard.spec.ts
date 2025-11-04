// import { TestBed } from '@angular/core/testing';
// import { CanActivateFn } from '@angular/router';
// import { RoleGuard } from './role-guard.guard';



// describe('roleGuardGuard', () => {
//   const executeGuard: CanActivateFn = (...guardParameters) => 
//       TestBed.runInInjectionContext(() => roleGuardGuard(...guardParameters));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(executeGuard).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
 import { RoleGuard } from './role-guard.guard';

import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { Authservice } from './services/authservice';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authServiceMock: jasmine.SpyObj<Authservice>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create mocks
    authServiceMock = jasmine.createSpyObj('Authservice', [], { role$: of('admin') });
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: Authservice, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(RoleGuard);
  });

  it('should allow access when role matches expectedRole', (done) => {
    const route = new ActivatedRouteSnapshot();
    route.data = { expectedRole: 'admin' };

    guard.canActivate(route).subscribe(result => {
      expect(result).toBeTrue();
      expect(routerMock.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should deny access and redirect when role does not match expectedRole', (done) => {
    // Change mock role stream
    (Object.getOwnPropertyDescriptor(authServiceMock, 'role$')!.get as any).and.returnValue(of('user'));

    const route = new ActivatedRouteSnapshot();
    route.data = { expectedRole: 'admin' };

    guard.canActivate(route).subscribe(result => {
      expect(result).toBeFalse();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/unauthorized']);
      done();
    });
  });
});
