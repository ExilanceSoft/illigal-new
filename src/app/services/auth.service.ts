import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ADMIN_ROLE = 'admin';
  private readonly USER_TOKEN_KEY = 'auth_token';
  private readonly USER_ROLE_KEY = 'user_role';
  private readonly REDIRECT_URL_KEY = 'redirect_url';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      this.setAdminRole();
      
      // Get the redirect URL if it exists
      const redirectUrl = this.getAndClearRedirectUrl();
      
      // Navigate to either the stored URL or admin dashboard
      this.router.navigateByUrl(redirectUrl || '/admin');
      return true;
    }
    return false;
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.USER_TOKEN_KEY);
      localStorage.removeItem(this.USER_ROLE_KEY);
    }
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isBrowser() && !!localStorage.getItem(this.USER_TOKEN_KEY);
  }

  isAdmin(): boolean {
    return this.isBrowser() && localStorage.getItem(this.USER_ROLE_KEY) === this.ADMIN_ROLE;
  }

  setAdminRole(): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.USER_ROLE_KEY, this.ADMIN_ROLE);
      localStorage.setItem(this.USER_TOKEN_KEY, this.generateSimpleToken());
    }
  }

  storeRedirectUrl(url: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.REDIRECT_URL_KEY, url);
    }
  }


  getAndClearRedirectUrl(): string | null {
    if (this.isBrowser()) {
      const url = localStorage.getItem(this.REDIRECT_URL_KEY);
      localStorage.removeItem(this.REDIRECT_URL_KEY);
      return url;
    }
    return null;
  }

  private generateSimpleToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}