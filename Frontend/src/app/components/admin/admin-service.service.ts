import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private readonly  http:HttpClient) { }

  private URL_DB="http://localhost:7005/api/";


  GetProducts(page: number=0, pageSize: number=5) {
    return this.http.get(this.URL_DB+`products?page=${page}&pageSize=${pageSize}`);
  }

  GetProductByName(title:string){
    return this.http.get(this.URL_DB+"products/name/"+title);
  }


  GetProductById(id:string){
    return this.http.get(this.URL_DB+"products/"+id);
  }

  GetOrders(){
    return this.http.get(this.URL_DB+"orders");
  }

  creatProduct(product:any)
  {
    return this.http.post(this.URL_DB +"products",product)
  }

  updateProduct(product:any,productId:string){
    return this.http.put(this.URL_DB+`products/${productId}`,product)
  }

  deleteProduct(id:string)
  {
    return this.http.delete(this.URL_DB+`products/${id}`)
  }

  updateOrderState(id:any,state:any)
  {
    return this.http.put(this.URL_DB+`orders/${id}`,{orderId:id,newState:state});
  }


  uploadImage(formData: FormData) {
    return this.http.post(this.URL_DB+`uploadPhoto/upload`, formData);
  }
}
