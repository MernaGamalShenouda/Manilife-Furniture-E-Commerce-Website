
import {
  Component,
  DoCheck,
  OnDestroy,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  EventEmitter,
  Output,
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
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
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
     MatDividerModule, 
     MatIconModule

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
  pageSize: number = 12;
  totalProducts: number = 500;//l7ad ma nkarar fe kam product 3andena

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
        this.productByCategory='';
      })
    );

    
    this.subscriptions.push(
      DataSharingService.productByCategory$.subscribe((category) => {
        this.productByCategory = category;
        this.loadProducts();
        this.searchByWord='';
      })
    );

    this.productsService.GetAllProducts(this.currentPage,this.pageSize).subscribe({
      next: (data) => {
        console.log(data);
          this.products = data.Products;
        
      },
      error: (err) => {
        console.log(err);
      },
    });
    // this.loadProducts();
  }

  ngDoCheck(): void {}

  ngOnDestroy(): void {
    
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }


  private loadProducts(): void {
    this.productsService.GetAllProducts(1,500).subscribe({
      next: (data) => {
        console.log(data);
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
          this.searchByWord='';
          this.productByCategory='';
          this.productsService.GetAllProducts(1,this.pageSize).subscribe({
            next: (data) => {
              console.log(data);
              
                this.products = data.Products;
              
            },
            error: (err) => {
              console.log(err);
            },
          });
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
      (error: any) => {
        console.error(error);
        
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
