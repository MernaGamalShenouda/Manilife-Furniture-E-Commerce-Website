// import {
//   Component,
//   DoCheck,
//   OnDestroy,
//   Input,
//   OnChanges,
//   OnInit,
//   SimpleChanges, 
// } from '@angular/core';
// import { ProductsService } from '../../Services/products.service';
// import { DataSharingService } from '../../Services/data-sharing.service';
// import { ShopComponent } from '../shop/shop.component';
// import { ProductDetailsComponent } from '../product-details/product-details.component';
// import { HttpClientModule } from '@angular/common/http';
// import { OneProductComponent } from '../one-product/one-product.component';
// import { RouterOutlet } from '@angular/router';
// import { IndexComponent } from '../admin/index/index.component';
// import { SearchComponent } from '../search/search.component';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-all-products',
//   standalone: true,
//   imports: [
//     RouterOutlet,
//     IndexComponent,
//     AllProductsComponent,
//     SearchComponent,
//     OneProductComponent,
//     HttpClientModule,
//     ProductDetailsComponent,
//     ShopComponent,
//     FormsModule,
//     CommonModule,
//   ],
//   providers: [
//     //services
//     ProductsService,
//     DataSharingService,
//   ],
//   templateUrl: './all-products.component.html',
//   styleUrls: ['./all-products.component.css'],
// })
// export class AllProductsComponent implements OnInit, DoCheck {
//   searchByWord = '';
//   productByCategory = '';
//   products: any;
//   private subscriptions: Subscription[] = [];

//   constructor(
//     private productsService: ProductsService,
//     private dataSharingService: DataSharingService
//   ) {}

 
//   ngOnInit(): void {
//     this.dataSharingService.searchByWord="";
   
//     this.loadProducts();
//   }

//   ngDoCheck(): void {
//     this.dataSharingService.searchByWord="Register";
//     console.log(this.dataSharingService.searchByWord);
//     if (this.dataSharingService.searchByWord!="") {
//       console.log("a7eh");
//       this.searchByWord = this.dataSharingService.searchByWord;
//       this.loadProducts();
//     }

//     if (this.productByCategory !== this.dataSharingService.productByCategory) {
//       this.productByCategory = this.dataSharingService.productByCategory;
//       this.loadProducts();
//     }
//   }
  

//   ngOnDestroy(): void {
    
//     this.subscriptions.forEach(subscription => subscription.unsubscribe());
//   }


//   private loadProducts(): void {
//     this.productsService.GetAllProducts().subscribe({
//       next: (data) => {
//         console.log(this.searchByWord);
//         if (this.searchByWord != '') {
//           console.log('Register');
//           this.products = data.Products.filter((product: any) => {
//             return product.title
//               .toLowerCase()
//               .includes(this.searchByWord.toLowerCase());
//           });
//         } else if (this.productByCategory!="") {
//           this.products = data.Products.filter((product: any) => {
//             return product.category.includes(this.productByCategory);
//           });
//         } else {
//           this.products = data.Products;
//         }
//       },
//       error: (err) => {
//         console.log(err);
//       },
//     });
//   }
// }

import {
  Component,
  DoCheck,
  OnDestroy,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ShopComponent } from '../shop/shop.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OneProductComponent } from '../one-product/one-product.component';
import { RouterOutlet } from '@angular/router';
import { IndexComponent } from '../admin/index/index.component';
import { SearchComponent } from '../search/search.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../Services/products.service';
import { DataSharingService } from '../../Services/data-sharing.service';

@Component({
  selector: 'app-all-products',
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
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    //services
    ProductsService,
    DataSharingService,
  ],
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit, DoCheck {
  searchByWord = '';
  productByCategory = '';
  products: any;
  private subscriptions: Subscription[] = [];
  currentPage: number = 1;
  pageSize: number = 8;
  totalProducts: number = 100;//l7ad ma nkarar fe kam product 3andena

  constructor(
    private http: HttpClient,
    private productsService: ProductsService,
    private dataSharingService: DataSharingService
  ) {}


  ngOnInit(): void {
    
    this.subscriptions.push(
      DataSharingService.searchByWord$.subscribe((word) => {
        this.searchByWord = word;
        this.loadProducts();
      })
    );

    
    this.subscriptions.push(
      DataSharingService.productByCategory$.subscribe((category) => {
        this.productByCategory = category;
        this.loadProducts();
      })
    );

    
    this.loadProducts();
  }

  ngDoCheck(): void {}

  ngOnDestroy(): void {
    
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }


  private loadProducts(): void {
    this.productsService.GetAllProducts().subscribe({
      next: (data) => {
        console.log(this.searchByWord);
        if (this.searchByWord != '') {
          
          this.products = data.Products.filter((product: any) => {
            return product.title
              .toLowerCase()
              .includes(this.searchByWord.toLowerCase());
          });
        } else if (this.productByCategory!="" && this.productByCategory!="All") {
          this.products = data.Products.filter((product: any) => {
            return product.category.includes(this.productByCategory);
          });
        } else {
          this.products = data.Products;
          // console.log(this.products)
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getProducts(): void {
    const url = `http://localhost:7005/api/products?page=${this.currentPage}&pageSize=${this.pageSize}`;
    this.http.get<{ Products: any[], countProducts: number }>(url).subscribe(
      (response) => {
        this.products = response.Products;
        this.totalProducts = response.countProducts;
        console.log(this.products)
      },
      (error: any) => { // Explicitly define error type
        console.error(error);
        // Handle error
      }
    );
  }

  Prev(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProducts();
    }
  }

  Next(): void {
    console.log("next")
    const totalPages = Math.ceil(this.totalProducts / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.getProducts();
    }
  }
}
