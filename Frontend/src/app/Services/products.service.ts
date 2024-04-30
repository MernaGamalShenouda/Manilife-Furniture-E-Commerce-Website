import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly URL_API = 'http://localhost:7005/api/products'; //API
  constructor(public readonly http: HttpClient) {}

  GetAllProducts(page: number, pageSize: number): Observable<ApiResponse> {
    const params = { page: page.toString(), pageSize: pageSize.toString() };
    return this.http.get<any>(this.URL_API, { params });
  }

  GetProductByID(productId: string): Observable<any> {
    return this.http.get<any>(this.URL_API + '/' + productId);
  }

  GetRandomProducts(): Observable<ApiResponse> {
    const params = { limit: '4' };
    return this.http.get<any>(this.URL_API, { params });
  }
}
// GetProductBySearch(){}

interface ApiResponse {
  Products: any[];
  countProducts: number;
}
