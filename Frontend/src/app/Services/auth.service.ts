import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
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
  private URB_DB = 'http://localhost:7005/api/orders';

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

  async getLoggedInUsername(): Promise<any> {
    try {
      const userData = await this.getLoggedInUser();
      const user: any = await this.GetUserByID(userData).subscribe((user) => {
        const userNEW: any = user;
        console.log(userNEW);

        return userNEW;
      });
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getMyUser(): Promise<any> {
    try {
      const userID = await this.getLoggedInUser();
      const userObservable = this.GetUserByID(userID);

      const user = await firstValueFrom(userObservable);

      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  GetUserByID(id: number) {
    return this.http.get(this.apiUrl + '/' + id);
  }

  updateUser(id: number, user: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, { newData: user.data });
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
    localStorage.removeItem('role');
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

  getOrdersByUsername(username: any): Observable<any[]> {
    const url = `${this.URB_DB}/${username}`;
    return this.http.get<any[]>(url);
  }

  deleteOrderById(id: any): Observable<any> {
    const url = `${this.URB_DB}/${id}`;
    return this.http.delete<any>(url);
  }
}
