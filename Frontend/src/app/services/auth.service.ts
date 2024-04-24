import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:7005/api/users'; // Change this to your API URL

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map((response: { token: string; }) => {
          localStorage.setItem('token', response.token);
          return response;
        }),
        catchError((error: any) => {
          throw error;
        })
      );
  }

  getLoggedInUser(){
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtHelper.decodeToken(token);
      console.log(decodedToken.id);
      return decodedToken.id;
    }
  }
}





