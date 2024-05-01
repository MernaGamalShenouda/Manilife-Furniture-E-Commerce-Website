import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private readonly  http:HttpClient) { }

  private URL_DB="https://e-commerce-project-q5po.onrender.com/api/";


  //----------Product CRUD Methods-------------------
  GetProducts(page: number=0, pageSize: number=5) {
    return this.http.get(this.URL_DB+`products?page=${page}&pageSize=${pageSize}`);
  }


  GetProductByName(title:string){
    return this.http.get(this.URL_DB+"products/name/"+title);
  }



  GetProductById(id:string){
    return this.http.get(this.URL_DB+"products/"+id);
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



//---------------Order Method------------------------------------

GetOrders(){
  return this.http.get(this.URL_DB+"orders");
}


updateOrderState(id:any,state:any)
{
  return this.http.put(this.URL_DB+`orders/${id}`,{orderId:id,newState:state});
}


//----------------User Method----------------------------------------

GetUsers(page: number=0, pageSize: number=5) {
  return this.http.get(this.URL_DB+`users?page=${page}&pageSize=${pageSize}`);
}


GetUserByName(fullname:string){
  return this.http.get(this.URL_DB+"users/name/"+fullname);
}


deleteUser(id:string)
{
  return this.http.delete(this.URL_DB+`users/${id}`)
}





//--------------Upload Images---------------------------

uploadImage(formData: FormData) {
  return this.http.post(this.URL_DB+`uploadPhoto/upload`, formData);
}
}
