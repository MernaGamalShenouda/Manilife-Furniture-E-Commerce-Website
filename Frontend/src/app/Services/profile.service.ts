import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:7005/api/users'; // Change this to your API URL
  userData = new BehaviorSubject(null);
  private URB_DB=' http://localhost:7005/api/orders';

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

   /*GetOrders(){
    return this.http.get(this.URB_DB+"orders");
  }
*/

async getLoggedInUsername(): Promise<any> {
  try {
    const userData = await this.getLoggedInUser();
    const user = await this.GetUserByID(userData);
    return user.data.username;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}   

getOrdersByUsername(username: any): Observable<any[]> {
  const url = `${this.URB_DB}/${username}`;
  return this.http.get<any[]>(url);
}

deleteOrderById(id:any): Observable<any> {
  const url = `${this.URB_DB}/${id}`;
  return this.http.delete<any>(url);
}

/*async getOrdersByUsername(): Promise<any[]> {
  try {
    const username = await this.getLoggedInUsername();
    const url = `${this.URB_DB}orders?username=${encodeURIComponent(username)}`;
    const response = await this.http.get<any>(url).toPromise();
    return response; // Assuming response is an array of orders
  } catch (error) {
    console.error('Error fetching orders by username:', error);
    throw error;
  }
}
*/
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
  updateUser(id: number, updatedData: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, updatedData).pipe(
          switchMap((userData: any) => { // Specify the type of userData as any
            // Assuming you have a method updateOrders that takes the user id and the new username
            return this.updateOrders(id, userData.username);
          }),
          catchError((error: any) => {
            console.error('Error:', error);
            throw error;
          })
        );
      }
      updateOrders(userId: number, newUsername: string): Observable<any> {
        // Replace this with the actual API endpoint and data format
        return this.http.put(`${this.URB_DB}/${userId}`, { username: newUsername }).pipe(
          catchError((error: any) => {
            console.error('Error:', error);
            throw error;
          })
        );
      }
     }
