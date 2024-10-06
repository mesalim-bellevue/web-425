import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

interface User {
  empId: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { empId: '1', email: 'user1@example.com', password: 'password123' },
    { empId: '2', email: 'user2@example.com', password: 'password456' },
    { empId: '3', email: 'user3@example.com', password: 'password789' }
  ];

  private authState = new BehaviorSubject<boolean>(false);

  constructor(private cookieService: CookieService, private router: Router) {}

  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }

  signin(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);

    if (user) {
      this.cookieService.set('session_user', email);

      this.authState.next(true);

      return true;
    } else {
      this.authState.next(false);

      return false;
    }
  }

  signout(): void {
    this.cookieService.deleteAll();

    this.authState.next(false);

    this.router.navigate(['/signin']);
  }
}
