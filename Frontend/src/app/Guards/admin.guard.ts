import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (await this.authService.isAdmin()) {
      console.log('Hello Guard', this.authService.isAdmin());
      return true; // User is authenticated and is an admin
    } else {
      // Redirect to login page or unauthorized page
      // or handle the unauthorized access
      this.router.navigate(['/Login']);
      return false;
    }
  }
}
