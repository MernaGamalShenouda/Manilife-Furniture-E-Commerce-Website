import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserOrdersService {

  private apiUrl = 'http://localhost:7005/api/users';

  constructor(private http: HttpClient, private router: Router) { }

  getUserOrders(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}/orders`);
  }
}

