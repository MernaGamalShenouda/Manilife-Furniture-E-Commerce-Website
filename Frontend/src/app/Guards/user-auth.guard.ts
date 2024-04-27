import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let token = localStorage.getItem('token');
  let role = localStorage.getItem('role');

  if (token == null || role == 'user') {
    return true;
  } else {
    router.navigate(['/admin']);
    return false;
  }
};
