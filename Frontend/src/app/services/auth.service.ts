import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:7005/api/users';

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

   isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; 
  }

  async GetUserByID(id: number): Promise<any> {
    try {
      const userData = await this.http.get<any>(`${this.apiUrl}/${id}`).toPromise();
      return userData;
    } catch (error) {
      console.error('Error:', error);
      throw error; 
    }
  }

  async getMyUser() {
    try {
      const userID = await this.getLoggedInUser(); 
      const user = await this.GetUserByID(userID);
      return user;
    } catch (error) {
      console.error('Error:', error);
      throw error; 
    }
  }

  getLoggedInUser(){
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken.id;
    }
  }

  async isAdmin() {
    try {
      const user = await this.getMyUser(); 
      return user.data.role === 'admin';
    } catch (error) {
      console.error('Error:', error);
      throw error; 
    }
  }
  
}





