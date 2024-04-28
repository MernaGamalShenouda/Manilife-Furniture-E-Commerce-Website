/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:7005/api/users';

  constructor(private http: HttpClient) { }

  /*GetUserByID(id:number){
    return this.http.get(this.apiUrl+"/"+id).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        return throwError(error);
      })
    );
  }
  */
 /*
  getLoggedInUserData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  /*updateUserById(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user).pipe(
      catchError(error => {
        console.error(`Error updating user with ID ${id}:`, error);
        return throwError(error);
      })
    );
  }*/
  /*
  updateLoggedInUserData(userData: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, userData);
  }


  getOrdersByUserName(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${username}/orders`).pipe(
      catchError(error => {
        console.error(`Error fetching orders for user with ID ${username}:`, error);
        return throwError(error);
      })
    );
  }
}
*/

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
export class UserService {
  private apiUrl = 'http://localhost:7005/api/users'; // Change this to your API URL
  userData = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('token') != null) {
      this.saveUserData();
    }
  }
 

  /*login(email: string, password: string): Observable<any> {
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
*/
  async GetUserByID(id: number): Promise<any> {
    try {
      const userData = await this.http
        .get<any>(`${this.apiUrl}/${id}`)
        .toPromise();
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

 

}

