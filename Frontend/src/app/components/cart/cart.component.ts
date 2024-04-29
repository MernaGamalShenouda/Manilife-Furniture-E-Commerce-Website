import { Component, DoCheck, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { IndexComponent } from '../../components/admin/index/index.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AllProductsComponent } from '../../components/all-products/all-products.component';
import { OneProductComponent } from '../../components/one-product/one-product.component';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';
import { ShopComponent } from '../../components/shop/shop.component';
import { NavigationComponent } from '../../navigation/navigation.component';
import { HomeComponent } from '../../home/home.component';
import { FooterComponent } from '../../footer/footer.component';
import { AboutComponent } from '../../about/about.component';
import { SearchComponent } from '../../components/search/search.component';
import { OrdersService } from '../../Services/orders.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    RouterOutlet,
    IndexComponent,
    AllProductsComponent,
    SearchComponent,
    OneProductComponent,
    HttpClientModule,
    ProductDetailsComponent,
    ShopComponent,
    NavigationComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    CartComponent,
    CommonModule,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ProductsService, AuthService, HttpClient, OrdersService],
})
export class CartComponent implements OnInit, DoCheck {
  Product: any;
  user: any;
  isCartEmpty: boolean = true;
  userID: number = 0;
  userCart: any[] = [];
  cartHidden = true;
  quantity = 1;
  productItem: any = {};
  productDetails: { [key: string]: any } = {};

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CartComponent>,
    private productsService: ProductsService,
    private authService: AuthService,
    private orderService: OrdersService
  ) {}
  ngDoCheck(): void {
    this.isCartEmpty = this.userCart.length === 0;
  }

  ngOnInit(): void {
    this.userID = this.authService.getLoggedInUser();
    this.authService.GetUserByID(this.userID).subscribe({
      next: (data) => {
        this.user = data;
        this.userCart = this.user.data.cart;
        this.isCartEmpty = this.userCart.length === 0;
        this.getCart();
        console.log(this.userCart);
      },
      error: (err) => {
        console.log('Failed to update user:', err);
      },
    });
    this.authService.GetUserByID(this.authService.getLoggedInUser()).subscribe({
      next: (user: any) => {
        this.userCart = user.data.cart;
        this.userCart.forEach((product) => {
          this.productsService
            .GetProductByID(product.productId)
            .subscribe((data) => {
              if (data) {
                this.productDetails[product.productId] = data;
                console.log(data);
              }
            });
        });
      },
      error: (err) => {
        console.error('Error fetching cart:', err);
      },
    });
  }

  loadProductDetails() {
    this.userCart.forEach((product) => {
      this.productsService
        .GetProductByID(product.productId)
        .subscribe((data) => {
          if (data) {
            this.productDetails[product.productId] = data;
          }
        });
    });
  }

  hide() {
    this.dialogRef.close();
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity -= 1;
      this.updateProductInCart(product).subscribe({
        next: () => {
          console.log('User updated successfully');
          this.getCart();
        },
        error: (err) => {
          console.error('Error updating user:', err);
        },
      });
    }
  }

  increaseQuantity(product: any) {
    product.quantity += 1;
    this.updateProductInCart(product).subscribe({
      next: () => {
        console.log('User updated successfully');
        this.getCart();
      },
      error: (err) => {
        console.error('Error updating user:', err);
      },
    });
  }

  deleteProductFromCart(productId: string) {
    this.userCart = this.userCart.filter(
      (product) => product.productId !== productId
    );
    console.log(this.userCart);

    this.updateuserFunction(this.userID, {
      ...this.user,
      data: {
        ...this.user.data,
        cart: this.userCart,
      },
    }).subscribe({
      next: () => {
        console.log('User updated successfully');
        this.getCart();
      },
      error: (err) => {
        console.error('Error updating user:', err);
      },
    });
  }

  updateProductInCart(product: any): Observable<any> {
    const updatedCart = this.userCart.map((item) =>
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
  getCart() {
    this.authService.GetUserByID(this.authService.getLoggedInUser()).subscribe({
      next: (user: any) => {
        this.userCart = user.data.cart;
        this.userCart.forEach((product) => {
          this.productsService
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

  updateuserFunction(userID: any, user: any): Observable<any> {
    return this.authService.updateUser(userID, user);
  }

  addOrder() {
    const totalPrice = this.userCart.reduce((sum, product) => {
      const pricePerUnit = this.productDetails[product.productId]?.price ?? 0;
      return sum + pricePerUnit * product.quantity;
    }, 0);

    const productTitles = this.userCart.map(
      (product) => this.productDetails[product.productId]?.title
    );

    console.log('Total price:', totalPrice);
    console.log('Product titles:', productTitles);

    this.orderService.createOrder(totalPrice, productTitles).subscribe({
      next: (response) => {
        console.log('Order placed successfully', response);
        this.userCart = [];
        this.user.data.cart = [];
        const updatedUser = {
          ...this.user,
          data: {
            ...this.user.data,
            cart: this.userCart,
          },
        };
        this.updateuserFunction(this.userID, updatedUser).subscribe({
          next: () => {
            console.log('User updated successfully');
            this.getCart();
          },
          error: (err) => {
            console.error('Error updating user:', err);
          },
        });
      },
      error: (error) => {
        console.error('Error placing order:', error);
      },
    });
  }

  get totalQuantity(): number {
    return this.userCart.reduce((total, item) => total + item.quantity, 0);
  }

  get totalPrice(): number {
    return this.userCart.reduce((total, item) => {
      const pricePerUnit = this.productDetails[item.productId]?.price || 0;
      return total + item.quantity * pricePerUnit;
    }, 0);
  }
}
