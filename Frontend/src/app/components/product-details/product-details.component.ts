import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../Services/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    HttpClientModule,

    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [ProductsService, AuthService, HttpClient],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  ID: string;
  Product: any;
  user: any;
  userID: number = 0;
  userCart: any[] = [];
  cartHidden = true;
  quantity = 1;
  productItem: any = {};
  productDetails: { [key: string]: any } = {};
  productForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private myRoute: ActivatedRoute,
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ID = myRoute.snapshot.params['id'];
    this.productForm = this.formBuilder.group({
      quantity: [1, Validators.required],
    });
  }
  ngOnInit(): void {
    this.productsService.GetProductByID(this.data.productId).subscribe({
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
        this.userCart = this.user.data.cart;
      },
      error: (err) => {
        console.log('Failed to update user:', err);
      },
    });
  }

  Add_Item(Product: any) {
    this.quantity = this.productForm.get('quantity')!.value;
    this.productItem = {
      productId: Product._id,
      quantity: this.quantity,
      _id: Product._id,
    };

    const existingProductIndex = this.userCart.findIndex(
      (item) => item.productId === Product._id
    );

    if (existingProductIndex === -1) {
      this.userCart.push(this.productItem);
    } else {
      const pastquantity = this.userCart[existingProductIndex].quantity;
      // console.log('Product already exists in cart so quantity was added');
      this.userCart[existingProductIndex].quantity =
        this.quantity + pastquantity;
    }

    this.user.data.cart = this.userCart;

    this.updateuserFunction(this.userID, this.user);
  }

  updateuserFunction(userID: any, user: any) {
    this.authService.updateUser(userID, user).subscribe({
      next: (data) => {},
      error: (err) => {
        console.error('Error fetching cart:', err);
      },
    });
  }
}
