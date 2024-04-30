import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private URL_API = 'http://localhost:7005/api/orders';
  username: String = '';
  constructor(public http: HttpClient, private authService: AuthService) {}
  async getUsername(): Promise<string> {
    const userId = this.authService.getLoggedInUser();
    const user: any = await this.authService.GetUserByID(userId).toPromise(); // Convert Observable to Promise
    return user?.data.username;
  }

  createOrder(totalPrice: number, productTitles: string[]): Observable<any> {
    const userId = this.authService.getLoggedInUser();

    return this.authService.GetUserByID(userId).pipe(
      map((data: any) => data.data.username), // Get the username
      switchMap((username: string) => {
        return this.http.post<any>(this.URL_API, {
          totalPrice,
          productTitles,
          username,
        });
      })
    );
  }
}
