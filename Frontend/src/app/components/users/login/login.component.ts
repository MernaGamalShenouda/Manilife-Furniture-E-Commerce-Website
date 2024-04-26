import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { GetUserService } from '../../../Services/get-user.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';
const jwtHelper = new JwtHelperService();

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [AuthService, GetUserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';
  token: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private getUserService: GetUserService
  ) {}

  async login() {
    try {
      const loginResponse = await firstValueFrom(
        this.authService.login(this.email, this.password)
      );

      this.message = loginResponse.message;
      this.token = loginResponse.token;

      const decodedToken = jwtHelper.decodeToken(this.token);

      const userResponse:any = await firstValueFrom(
        this.getUserService.getUser(decodedToken.id)
      );

      localStorage.setItem('role', userResponse.data.role);

      this.authService.saveUserData(); 

      if (this.authService.isAdmin()) {
        this.router.navigate(['/admin'], {
          state: { message: this.message, token: this.token },
        });
      } else {
        this.router.navigate(['/Home'], {
          state: { message: this.message, token: this.token },
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      this.message = 'Failed to log in. Please try again.';
    }
  }}