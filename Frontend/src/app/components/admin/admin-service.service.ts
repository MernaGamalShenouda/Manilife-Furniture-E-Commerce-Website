import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  constructor(private readonly http: HttpClient) {}

  private URB_DB = 'http://localhost:7005/api/';

  GetProducts(page: number = 0, pageSize: number = 5) {
    return this.http.get(
      this.URB_DB + `products?page=${page}&pageSize=${pageSize}`
    );
  }

  GetProductByName(title: string) {
    return this.http.get(this.URB_DB + 'products/name/' + title);
  }

  GetProductById(id: string) {
    return this.http.get(this.URB_DB + 'products/' + id);
  }

  GetOrders() {
    return this.http.get(this.URB_DB + 'orders');
  }

  creatProduct(product: any) {
    return this.http.post(this.URB_DB + 'products', product);
  }

  updateProduct(product: any, productId: string) {
    return this.http.put(this.URB_DB + `products/${productId}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(this.URB_DB + `products/${id}`);
  }

  updateOrderState(id: any, state: any) {
    return this.http.put(this.URB_DB + `orders/${id}`, {
      orderId: id,
      newState: state,
    });
  }

  uploadImage(formData: FormData) {
    return this.http.post(this.URB_DB + `uploadPhoto/upload`, formData);
  }
}
