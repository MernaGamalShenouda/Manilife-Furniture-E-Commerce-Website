import { Component, NgModule } from '@angular/core';
import { AllProductsComponent } from '../all-products/all-products.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { OneProductComponent } from '../one-product/one-product.component';
import { SearchComponent } from '../search/search.component';
import { IndexComponent } from '../admin/index/index.component';
import { DataSharingService } from '../../Services/data-sharing.service';


@Component({
  selector: 'app-shop',
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
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'] 
})
export class ShopComponent {
  
}

