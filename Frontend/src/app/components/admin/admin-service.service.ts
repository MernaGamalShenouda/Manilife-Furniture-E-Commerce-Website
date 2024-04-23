import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private readonly  http:HttpClient) { }

  private URB_DB="http://localhost:7005/api/";

  GetProducts(page: number, pageSize: number) {
    return this.http.get(this.URB_DB+`products?page=${page}&pageSize=${pageSize}`);
  }



}
