import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule],
  providers:[ProductsService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  ID:string;
  Product:any;
constructor(private myRoute : ActivatedRoute, private productsService:ProductsService){
  this.ID=myRoute.snapshot.params["id"];
}
  ngOnInit(): void {
    this.productsService.GetProductByID(this.ID).subscribe({
      next:(data)=>{
        this.Product = data.Product;
        console.log(this.Product);
      },
      error:(err)=>{console.log(err)}
    })
  }
}
