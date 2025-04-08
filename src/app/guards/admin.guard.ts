import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAdmin()) {
    return true;
  }

  // Store the attempted URL before redirecting
  authService.storeRedirectUrl(state.url);
  
  // Redirect to login page
  return router.createUrlTree(['/login']);
};