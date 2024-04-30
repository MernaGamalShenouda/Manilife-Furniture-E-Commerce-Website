import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ProductsService } from '../Services/products.service';
import { DataSharingService } from '../Services/data-sharing.service';
import { Router } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, CarouselModule],
  providers: [DataSharingService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  products: any[] = [];
  private subscriptions: Subscription[] = [];
  currentPage: number = 1;
  pageSize: number = 4;
  totalProducts: number = 0;
  isSmallOrMediumScreen: boolean = false;

  constructor(
    private http: HttpClient,
    private productsService: ProductsService,
    private dataSharingService: DataSharingService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadRandomProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private loadRandomProducts(): void {
    this.subscriptions.push(
      this.productsService.GetRandomProducts().subscribe({
        next: (data) => {
          console.log('Random products:', data);
          if (data.Products.length > 4) {
            this.products = data.Products.slice(0, 4);
          } else {
            this.products = data.Products;
          }
        },
        error: (err) => {
          console.log('Error fetching random products:', err);
        },
      })
    );
  }

  viewProduct(productId: string): void {
    this.dialog.open(ProductDetailsComponent, {
      data: { productId: productId },
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallOrMediumScreen = window.innerWidth <= 992;
  }
}
