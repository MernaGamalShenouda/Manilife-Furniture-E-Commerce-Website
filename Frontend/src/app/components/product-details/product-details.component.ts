import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, NgFor } from '@angular/common';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  providers: [ProductsService, AuthService, ProductsService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  ID: string;
  Product: any;
  user: any;
  userID: number = 0;
  userCart: any[] = [];
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
        console.log(err);
      },
    });

    this.userID = this.authService.getLoggedInUser();
    this.authService.GetUserByID(this.userID).subscribe({
      next: (data) => {
        this.user = data;
        this.userCart = this.user.data.cart;
        // console.log('User Data:', this.user);
        console.log('User Cart:', this.userCart);
      },
      error: (err) => {
        console.log('Failed to update user:', err);
      },
    });
  }

  Add_Item(Product: any) {
    this.show();
    this.getCart();
    this.productItem = {
      productId: Product._id,
      quantity: this.quantity,
      _id: Product._id,
    };

    const existingProductIndex = this.userCart.findIndex(
      (item) => item._id === Product._id
    );

    if (existingProductIndex === -1) {
      this.userCart.push(this.productItem);
      console.log('Product added to cart:', Product);
    } else {
      const pastquantity = this.userCart[existingProductIndex].quantity;
      console.log('Product already exists in cart so quantity was added');
      this.userCart[existingProductIndex].quantity =this.quantity+ pastquantity;
      console.log('User Cart:', this.userCart);
    }

    console.log('User Cart:', this.userCart);
    this.user.data.cart = this.userCart;

    this.updateuserFunction(this.userID, this.user);
  }

  updateuserFunction(userID: any, user: any) {
    console.log('User Data updateuserFunction ====>', user);

    this.authService.updateUser(userID, user).subscribe({
      next: (data) => {
        console.log('User updated successfully:', data);
      },
      error: (err) => {
        console.log('Failed to update user:', err);
      },
    });
  }

  hide() {
    this.cartHidden = true;
  }

  show() {
    this.cartHidden = false;
  }

  getCart() {
    this.authService
      .GetUserByID(this.authService.getLoggedInUser())
      .subscribe((user: any) => {
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
      });
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

  updateProductInCart(product: any) {
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

    this.updateuserFunction(this.userID, updatedUser);
  }
  deleteProductFromCart(productId: string) {
    // Remove the product from cartProducts
    this.cartProducts = this.cartProducts.filter(
      (product) => product.productId !== productId
    );
    console.log(this.cartProducts);
    
    // Update the user with the new cart
    this.updateuserFunction(this.userID, {
      ...this.user,
      data: {
        ...this.user.data,
        cart: this.cartProducts,
      },
    });
  }
}
