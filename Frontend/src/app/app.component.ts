import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { IndexComponent } from './components/admin/index/index.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductsService } from './Services/products.service';
import { SearchComponent } from './components/search/search.component';
import { DataSharingService } from './Services/data-sharing.service';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminGuard } from './Guards/admin.guard';
import { AuthService } from './Services/auth.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { OneProductComponent } from './components/one-product/one-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    IndexComponent,
    AllProductsComponent,
    SearchComponent,
    OneProductComponent,
    HttpClientModule,
    ProductDetailsComponent,
    ShopComponent,
    NavbarComponent,
    HomeComponent,
    NavigationComponent,
    CommonModule,
    CartComponent
  ],
  providers: [
    //services
    ProductsService,
    DataSharingService,
    AuthService,
    AdminGuard,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'Frontend';
  cartShown=false;
}
