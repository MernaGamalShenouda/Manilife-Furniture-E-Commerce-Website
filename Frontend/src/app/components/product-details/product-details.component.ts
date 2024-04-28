import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers:[
            ProductsService,
            AuthService
            ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  ID: string;
  Product: any;
  user: any;
  userID: number=0;
  userCart:any[] = []
  quantity: any;
  productItem: any={} ;
  productForm: FormGroup;
  
constructor(private myRoute : ActivatedRoute, private productsService:ProductsService,private formBuilder: FormBuilder, private authService: AuthService,@Inject(MAT_DIALOG_DATA) public data: any){
  this.ID=myRoute.snapshot.params["id"];
  this.productForm = this.formBuilder.group({ // Initialize form group
    quantity: ['', Validators.required] // Add a form control 'quantity' with validators
  });
}
  ngOnInit(): void {
    this.productsService.GetProductByID(this.data.productId).subscribe({
      next:(data)=>{
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
        this.userCart = this.user.data.cart;
        // console.log('User Data:', this.user);
        console.log('User Cart:', this.userCart);
      },
      error:(err)=>{console.log("Failed to update user:",err)}
    });
  }

  Add_Item(Product: any ){
console.log("Quantity equals===> ", this.productForm.get('quantity')!.value)
this.quantity=this.productForm.get('quantity')!.value;
    this.productItem = {
      "productId": Product._id,
      "quantity": this.quantity,
      "_id": Product._id
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
