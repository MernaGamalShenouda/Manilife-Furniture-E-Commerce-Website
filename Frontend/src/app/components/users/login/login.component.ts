import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { GetUserService } from '../../../services/get-user.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwtHelper = new JwtHelperService();

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  providers:[
    AuthService,GetUserService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';
  token: string = '';

  constructor(private authService: AuthService, private router: Router,private getUserService: GetUserService) { }
  // login() {
  //   this.authService.login(this.email, this.password).subscribe(
  //     (response: any) => {
  //       this.message = response.message;
  //       this.token = response.token;

  //       this.authService.isAdmin().subscribe(
  //         (isAdmin: boolean) => {
  //           if (isAdmin) {
  //             this.router.navigate(['/admin/dashboard'], { state: { message: this.message, token: this.token } });
  //           } else {
  //             this.router.navigate(['/Home'], { state: { message: this.message, token: this.token } });
  //           }
  //         },
  //         (error) => {
  //           console.error('Error checking admin status:', error);
  //           this.message = 'Failed to log in. Please try again.';
  //         }
  //       );
  //     },
  //     (error) => {
  //       console.error('Error logging in:', error);
  //       this.message = 'Failed to log in. Please try again.';
  //     }
  //   );
  // }

  async login() {
    try {
      console.log('Im In Login Comp', await this.authService.isAdmin());
      const response = await this.authService.login(this.email, this.password).toPromise();
      this.message = response.message;
      this.token = response.token;
      if(await this.authService.isAdmin()) {
        this.router.navigate(['/admin'], { state: { message: this.message, token: this.token } });
      } else {
        this.router.navigate(['/Home'], { state: { message: this.message, token: this.token } });
        const decodedToken = jwtHelper.decodeToken(this.token);
        console.log(decodedToken.id);
        this.getUserService.getUser(decodedToken.id).subscribe((response:any) => {
          console.log(response.data.role);
          localStorage.setItem("role", response.data.role);
        });
        this.authService.saveUserData(); 
      }
    } catch (error) {
      console.error('Error logging in:', error);
      this.message = 'Failed to log in. Please try again.';
    }
  }  
}
