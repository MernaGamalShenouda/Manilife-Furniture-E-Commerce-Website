import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IndexComponent } from './components/admin/index/index.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { SearchComponent } from './components/search/search.component';
import { OneProductComponent } from './components/one-product/one-product.component';
import { ProductsService } from './Services/products.service';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShopComponent } from './components/shop/shop.component';
import { DataSharingService } from './Services/data-sharing.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            IndexComponent,
            AllProductsComponent,
            SearchComponent,
            OneProductComponent,
            HttpClientModule,
            ProductDetailsComponent,
            ShopComponent
  ],
  providers:[//services
          ProductsService,
          DataSharingService
        ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
