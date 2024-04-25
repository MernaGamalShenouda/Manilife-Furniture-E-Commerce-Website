import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly URL_API= "http://localhost:7005/api/products" //API
  constructor(public readonly http: HttpClient) {}

  GetAllProducts(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.URL_API);
  }

  GetProductByID(productId: string): Observable<any> {

    return this.http.get<any>(this.URL_API+"/"+productId);
  }

  // GetProductBySearch(){}
}

interface ApiResponse {
  Products: any[];
  countProducts: number;
}