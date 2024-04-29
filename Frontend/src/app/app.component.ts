import { Component, DoCheck } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { IndexComponent } from './components/admin/index/index.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { OneProductComponent } from './components/one-product/one-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShopComponent } from './components/shop/shop.component';
import { DataSharingService } from './Services/data-sharing.service';
// import { AdminGuard } from './Guards/admin.guard';
import { AuthService } from './Services/auth.service';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsService } from './Services/products.service';
import { SearchComponent } from './components/search/search.component';
import { CommonModule } from '@angular/common';

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
    NavigationComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    CartComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements DoCheck {
  constructor(private router: Router, private authService: AuthService) {}
  isAdmin: boolean = false;
  title = 'ManiLife';

  ngDoCheck(): void {
    this.isAdmin = this.authService.isAdmin();
    console.log(this.isAdmin);
  }
}
