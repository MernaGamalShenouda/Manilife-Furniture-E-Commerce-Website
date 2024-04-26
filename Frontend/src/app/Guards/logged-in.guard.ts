import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const role = localStorage.getItem('role');

    if (role === 'user') {
      router.navigate(['/Home']);
    } else {
      router.navigate(['/admin']);
    }

    return false;
  }

  return true;
};
