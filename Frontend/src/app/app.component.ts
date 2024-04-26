import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { IndexComponent } from './components/admin/index/index.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { SearchComponent } from './components/search/search.component';
import { OneProductComponent } from './components/one-product/one-product.component';
import { ProductsService } from './Services/products.service';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShopComponent } from './components/shop/shop.component';
import { DataSharingService } from './Services/data-sharing.service';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminGuard } from './Guards/admin.guard';
import { AuthService } from './Services/auth.service';

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
    NavigationComponent
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
}
