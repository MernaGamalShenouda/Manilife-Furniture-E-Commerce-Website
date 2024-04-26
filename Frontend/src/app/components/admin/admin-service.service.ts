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

  GetProductByName(title:string){
    return this.http.get(this.URB_DB+"products/name/"+title);
  }


  GetOrders(){
    return this.http.get(this.URB_DB+"orders");
  }

  creatProduct(product:any)
  {
    return this.http.post(this.URB_DB +"products",product)
  }

  deleteProduct(id:string)
  {
    return this.http.delete(this.URB_DB+`products/${id}`)
  }

}
