import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
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
    }
  }
 

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/Login`, { email, password })
      .pipe(
        map((response: { token: string }) => {
          localStorage.setItem('token', response.token);

          this.saveUserData();
          return response;
        }),
        catchError((error: any) => {
          throw error;
        })
      );
  }

  // async GetUserByID(id: number): Promise<any> {
  //   try {
  //     const userData = await this.http
  //       .get<any>(`${this.apiUrl}/${id}`)
  //       .toPromise();
  //     return userData;
  //   } catch (error) {
  //     console.error('Error:', error);
  //     throw error;
  //   }
  // }

  // async getMyUser() {
  //   try {
  //     const userID = await this.getLoggedInUser();
  //     const user = await this.GetUserByID(userID);
  //     return user;
  //   } catch (error) {
  //     console.error('Error:', error);
  //     throw error;
  //   }
  // }

  GetUserByID(id:number){
    return this.http.get(this.apiUrl+"/"+id);
  }

  updateUser(id:number,user:any){
    return this.http.put(this.apiUrl+"/"+id, user);
  }

  getLoggedInUser() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken.id;
    }
  }



  saveUserData() {
    const encodedUserData = localStorage.getItem('token');

    if (encodedUserData) {
      const decodedUserData = jwtHelper.decodeToken(encodedUserData);
      this.userData.next(decodedUserData);
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
