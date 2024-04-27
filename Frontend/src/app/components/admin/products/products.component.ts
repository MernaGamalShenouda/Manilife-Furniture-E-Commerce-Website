import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule

  ],
  providers:[
    AdminServiceService
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  countProducts:any;

  constructor(private adminService: AdminServiceService) {}

  ngOnInit(): void {
this.getProducts()

  }
  getProducts(): void {
    this.adminService.GetProducts(this.currentPage, this.pageSize).subscribe({
      next: (data: any) => {


        this.products = data.Products;
        this.countProducts=data.countProducts;
        this.totalPages = Math.ceil(data.countProducts/ this.pageSize);


      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getProducts();
    }

    // console.log(this.currentPage);



  }

  getRange(): string {
    const startRange = (this.currentPage - 1) * this.pageSize + 1;
    const endRange = Math.min(this.currentPage * this.pageSize, this.countProducts);
    return `${startRange}-${endRange}`;
  }

}
