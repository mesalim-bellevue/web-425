import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'rpg-character-builder';
  isAuthenticated = false;
  sessionUser: string | null = null;

  constructor(private authService: AuthService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((authState) => {
      this.isAuthenticated = authState;

      if (authState) {
        this.sessionUser = this.cookieService.get('session_user');
      } else {
        this.sessionUser = null;
      }
    });
  }

  onSignout(): void {
    this.authService.signout();
  }
}