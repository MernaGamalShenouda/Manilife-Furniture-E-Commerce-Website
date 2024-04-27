// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { ProductsService } from '../../Services/products.service';
// import { DataSharingService } from '../../Services/data-sharing.service';
// import { AllProductsComponent } from '../all-products/all-products.component';
// import { RouterOutlet } from '@angular/router';
// import { IndexComponent } from '../admin/index/index.component';
// import { HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-search',
//   standalone: true,
//   imports: [RouterOutlet,
//     IndexComponent,
//     AllProductsComponent,
//     SearchComponent,
//     HttpClientModule,
//     CommonModule,
//     FormsModule

// ],
// providers:[//services
//   ProductsService,
//   DataSharingService
// ],
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.css']
// })
// export class SearchComponent implements OnInit {
//   searchTerm = '';
//   categories: Set<string> = new Set();

//   constructor(
//     private productsService: ProductsService,
//     private dataSharingService: DataSharingService
//   ) {}

//   ngOnInit(): void {
//     this.fetchCategories();
//   }

//   fetchCategories(): void {
//     this.productsService.GetAllProducts().subscribe({
//       next: (data) => {
//         data.Products.forEach((product: any) => {
//           if (product.category) {
//             this.categories.add(product.category);
//           }
//         });
//       },
//       error: (err) => {
//         console.log(err);
//       }
//     });
//   }

//   search(): void {
//     this.dataSharingService.searchByWord = this.searchTerm;
//     console.log(this.dataSharingService.searchByWord);
//   }

//   pickedCategory(category: string): void {
//     this.dataSharingService.productByCategory = category;
//     console.log(this.dataSharingService.productByCategory);
//   }
// }

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { DataSharingService } from '../../Services/data-sharing.service';
import { AllProductsComponent } from '../all-products/all-products.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { IndexComponent } from '../admin/index/index.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    RouterOutlet,
    IndexComponent,
    AllProductsComponent,
    SearchComponent,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    CommonModule,
  ],
  providers: [
    //services
    ProductsService,
    DataSharingService,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchTerm = '';
  categories: Set<string> = new Set();

  constructor(
    private productsService: ProductsService,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();

    DataSharingService.searchByWord$.subscribe((word) => {
      this.searchTerm = word;
    });
  }

  fetchCategories(): void {
    this.categories.add('All');
    this.productsService.GetAllProducts().subscribe({
      next: (data) => {
        data.Products.forEach((product: any) => {
          if (product.category) {
            this.categories.add(product.category);
          }
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  search(): void {
    DataSharingService.updateSearchByWord(this.searchTerm);
  }

  pickedCategory(category: string): void {
    DataSharingService.updateProductByCategory(category);
  }
}
