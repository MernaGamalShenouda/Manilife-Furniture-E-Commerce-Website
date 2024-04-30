import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  GetUserByID(id:number){
    return this.http.get(this.apiUrl+"/"+id).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        return throwError(error);
      })
    );
  }

  

  updateUserById(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user).pipe(
      catchError(error => {
        console.error(`Error updating user with ID ${id}:`, error);
        return throwError(error);
      })
    );
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
