import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { GalleryComponent } from './pages/gallery/gallery.component';

export const routes: Routes = [
  // Public routes
  { 
    path: '', 
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent) 
  },
  { 
    path: 'about', 
    loadComponent: () => import('./pages/about/about.component').then(c => c.AboutComponent) 
  },
  { 
    path: 'report', 
    loadComponent: () => import('./pages/report/report.component').then(c => c.ReportComponent),
    canActivate: [authGuard] 
  },
  { 
    path: 'events', 
    loadComponent: () => import('./pages/events/events.component').then(c => c.EventsComponent),
    // canActivate: [authGuard]
  },
  {
    path: 'report-dumping',
    loadComponent: () => import('./pages/report-dumping/report-dumping.component').then(c => c.ReportDumpingComponent),
    // canActivate: [authGuard]
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(c => c.ContactComponent),
    // canActivate: [authGuard]
  },
  {
    path: 'membership',
    loadComponent: () => import('./pages/membership/membership.component').then(c => c.MembershipComponent),
    // canActivate: [authGuard]
  },

  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.component').then(c => c.GalleryComponent),
    // canActivate: [authGuard]
  },

  { 
    path: 'login', 
    loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent) 
  },
  {
    path:'chatbot',
    loadComponent: () => import('./pages/chatbot/chatbot.component').then(c =>c.ChatbotComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./pages/register/register.component').then(c => c.RegisterComponent) 
  },
  
  // Admin routes
  { 
    path: 'admin', 
    loadComponent: () => import('./pages/admin/admin.component').then(c => c.AdminComponent),
    canActivate: [adminGuard] 
  },
  { 
    path: 'admin/reports', 
    loadComponent: () => import('./pages/admin/reports/reports.component').then(c => c.ReportsComponent),
    canActivate: [adminGuard] 
  },
  { 
    path: 'admin/events', 
    loadComponent: () => import('./pages/admin/events/events.component').then(c => c.EventsComponent),
    canActivate: [adminGuard] 
  },
  { 
    path: 'admin/analytics', 
    loadComponent: () => import('./pages/admin/analytics/analytics.component').then(c => c.AnalyticsComponent),
    canActivate: [adminGuard] 
  },
  
  // Fallback route
  { path: '**', redirectTo: '' }
];