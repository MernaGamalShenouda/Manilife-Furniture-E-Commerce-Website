import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  providers: [ProductsService, AuthService, ProductsService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  ID: string;
  Product: any;
  user: any;
  userID: number = 0;
  quantity: any = 1;
  productItem: any = {};
  cartHidden = true;
  cartProducts: any[] = [];
  productDetails: { [key: string]: any } = {};

  constructor(
    private myRoute: ActivatedRoute,
    private productsService: ProductsService,
    private authService: AuthService,
    private productService: ProductsService
  ) {
    this.ID = myRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productsService.GetProductByID(this.ID).subscribe({
      next: (data) => {
        this.Product = data;
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.userID = this.authService.getLoggedInUser();
    this.authService.GetUserByID(this.userID).subscribe({
      next: (data) => {
        this.user = data;
        this.cartProducts = this.user.data.cart;
      },
      error: (err) => {
        console.error('Failed to fetch user:', err);
      },
    });
  }

  Add_Item(Product: any) {
    this.show();

    this.productItem = {
      productId: Product._id,
      quantity: this.quantity || 1,
      _id: Product._id,
    };

    const existingProductIndex = this.cartProducts.findIndex(
      (item) => item.productId === Product._id
    );

    if (existingProductIndex === -1) {
      this.cartProducts.push(this.productItem); 
    } else {
      this.cartProducts[existingProductIndex].quantity += this.quantity;
    }

    this.user.data.cart = this.cartProducts;

    this.updateuserFunction(this.userID, this.user).subscribe({
      next: () => {
        console.log('User updated successfully');
        this.getCart();
      },
      error: (err) => {
        console.error('Error updating user:', err);
      },
    });
  }

  updateuserFunction(userID: any, user: any): Observable<any> {
    return this.authService.updateUser(userID, user);
  }

  getCart() {
    this.authService.GetUserByID(this.authService.getLoggedInUser()).subscribe({
      next: (user:any) => {
        this.cartProducts = user.data.cart; 
        this.cartProducts.forEach((product) => {
          this.productService
            .GetProductByID(product.productId)
            .subscribe((data) => {
              if (data) {
                this.productDetails[product.productId] = data; 
              }
            });
        });
      },
      error: (err) => {
        console.error('Error fetching cart:', err);
      },
    });
  }

  hide() {
    this.cartHidden = true; 
  }

  show() {
    this.cartHidden = false;
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity -= 1; 
      this.updateProductInCart(product); 
    }
  }

  increaseQuantity(product: any) {
    product.quantity += 1; 
    this.updateProductInCart(product); 
  }

  updateProductInCart(product: any): Observable<any> {
    const updatedCart = this.cartProducts.map((item) =>
      item.productId === product.productId ? product : item
    );

    const updatedUser = {
      ...this.user,
      data: {
        ...this.user.data,
        cart: updatedCart,
      },
    };

    return this.updateuserFunction(this.userID, updatedUser); 
  }

  deleteProductFromCart(productId: string) {
    this.cartProducts = this.cartProducts.filter(
      (product) => product.productId !== productId
    );

    this.updateuserFunction(this.userID, {
      ...this.user,
      data: {
        ...this.user.data,
        cart: this.cartProducts,
      },
    });
  }
}
