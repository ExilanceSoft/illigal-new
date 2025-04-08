import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    @if (isAdminRoute()) {
      <app-admin-header />
    } @else {
      <app-header />
    }
    
    <main class="container py-4">
      <router-outlet />
    </main>
    
    @if (!isAdminRoute()) {
      <app-footer />
    }
  `,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, AdminHeaderComponent]
})
export class AppComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isAdminRoute(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return window.location.pathname.startsWith('/admin');
    }
    return false;
  }
}