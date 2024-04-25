import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:7005/api/users'; // Change this to your API URL
  userData = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('token') != null) {
      this.saveUserData();
      // console.log('123');
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/Login`, { email, password })
      .pipe(
        map((response: { token: string }) => {
          localStorage.setItem('token', response.token);
          // console.log('Token in LocalStorage:', localStorage.getItem('token'));

          this.saveUserData();
          return response;
        }),
        catchError((error: any) => {
          throw error;
        })
      );
  }

  getLoggedInUser() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtHelper.decodeToken(token);
      // console.log(decodedToken.id);
      return decodedToken.id;
    }
  }

  saveUserData() {
    const encodedUserData = localStorage.getItem('token');
    // console.log('Encoded User Data:', encodedUserData); // Verify it's not null

    if (encodedUserData) {
      const decodedUserData = jwtHelper.decodeToken(encodedUserData);
      // console.log('Decoded User Data:', decodedUserData); // Verify decoded output
      this.userData.next(decodedUserData); 
      // console.log(this.userData.getValue()+" AAAAAAAAAAAAAAAAAAAAAAAA");
      
      // Update BehaviorSubject
      // console.log(decodedUserData);
      
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.userData.next(null);
    this.router.navigate(['/Login']);
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    return token != null;
  }

  isAdmin(): boolean {
    let role = localStorage.getItem('role');
    return role == 'admin';
  }

  isUser(): boolean {
    let role = localStorage.getItem('role');
    return role == 'user';
  }
}
