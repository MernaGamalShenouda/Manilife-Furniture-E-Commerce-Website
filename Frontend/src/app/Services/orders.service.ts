import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly URL_API= "http://localhost:7005/api/orders" 
  constructor(public readonly http: HttpClient,authService:AuthService) {}

  CreateOrder( totalPrice:Number,productTitles:String[]): Observable<any>{

    
    return this.http.post<any>(this.URL_API, {  });
  }

  


}
