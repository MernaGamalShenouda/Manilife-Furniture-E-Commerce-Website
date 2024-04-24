import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  providers:[
    AuthService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';
  token: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        this.message = response.message;
        this.token = response.token;
        this.router.navigate(['/Home'], { state: { message: this.message, token: this.token } });
      },
      (error) => {
        console.error('Error logging in:', error);
        this.message = 'Failed to log in. Please try again.';
      }
    );
  }
}