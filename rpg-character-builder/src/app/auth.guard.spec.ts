import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CookieService } from 'ngx-cookie-service';

class MockCookieService {
  get(name: string): string {
    if (name === 'session_user') {
      return 'test@example.com';
    }
    return '';
  }
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let cookieService: CookieService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: CookieService, useClass: MockCookieService },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
  });

  it('should allow access if session_user cookie is present', () => {
    spyOn(cookieService, 'get').and.returnValue('test@example.com');

    const canActivate = guard.canActivate();
    
    expect(canActivate).toBeTrue();
  });

  it('should prevent access and redirect to sign-in if session_user cookie is not present', () => {
    spyOn(cookieService, 'get').and.returnValue('');

    const canActivate = guard.canActivate();
    
    expect(canActivate).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/signin']);
  });
});