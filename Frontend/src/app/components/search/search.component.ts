import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { DataSharingService } from '../../Services/data-sharing.service';
import { AllProductsComponent } from '../all-products/all-products.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { IndexComponent } from '../admin/index/index.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatMenu, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


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
    MatButtonModule, 
    MatMenuModule, 
    MatIconModule
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
  TotalNumberOfProducts: number=500;
  viewDetails:string=';'
  @ViewChild('MatMenu') menu!: MatMenu;
  isSidebarOpen: boolean = false;

  constructor(
    private productsService: ProductsService,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.fetchCategories();

    DataSharingService.viewdetails$.subscribe((details: any) => {
      this.viewDetails=details;
      console.log('Details from viewdetails:', details);
      
    });
  }

  fetchCategories(): void {
    this.categories.add('All');
    this.productsService.GetAllProducts(1,this.TotalNumberOfProducts).subscribe({
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
  

    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
    }

    closeSidebar() {
      this.isSidebarOpen = false;
    }
}
