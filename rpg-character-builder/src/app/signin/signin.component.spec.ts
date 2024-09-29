import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { SigninComponent } from './signin.component';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

class MockAuthService {
  signin(email: string, password: string): boolean {
    return email === 'test@example.com' && password === 'password123';
  }
  
  getAuthState() {
    return of(false);
  }
}

class MockCookieService {
  set(name: string, value: string) {}
  get(name: string): string {
    return '';
  }
  deleteAll() {}
}

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let authService: AuthService;
  let cookieService: CookieService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: CookieService, useClass: MockCookieService },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should set cookie and authState to true on successful signin', () => {
    spyOn(authService, 'signin').and.returnValue(true);
    spyOn(cookieService, 'set');

    component.signinForm.setValue({ email: 'test@example.com', password: 'password123' });

    component.onSubmit();

    expect(authService.signin).toHaveBeenCalledWith('test@example.com', 'password123');

    expect(cookieService.set).toHaveBeenCalledWith('session_user', 'test@example.com');

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
  
  it('should not set cookie and authState to true on unsuccessful signin', () => {
    spyOn(authService, 'signin').and.returnValue(false);
    spyOn(cookieService, 'set');

    component.signinForm.setValue({ email: 'wrong@example.com', password: 'wrongpassword' });

    component.onSubmit();

    expect(authService.signin).toHaveBeenCalledWith('wrong@example.com', 'wrongpassword');
    
    expect(cookieService.set).not.toHaveBeenCalled();
    
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should call signin method on form submission', () => {
    spyOn(authService, 'signin').and.callThrough();

    component.signinForm.setValue({ email: 'test@example.com', password: 'password123' });

    component.onSubmit();

    expect(authService.signin).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});