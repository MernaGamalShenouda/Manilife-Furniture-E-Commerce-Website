import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const loggedInGuard: CanActivateFn = (route, state) => {
  // const authService = inject(AuthService);
  const router = inject(Router);

  // if (authService.isLoggedIn()) {
  let token = localStorage.getItem('token');

  if (token != null) {
    const role = localStorage.getItem('role');

    if (role == 'user') {
      router.navigate(['/Home']);
    } else {
      router.navigate(['/admin']);
    }

    return false;
  }

  return true;
};
