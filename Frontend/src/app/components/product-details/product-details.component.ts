import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule],
  providers:[
            ProductsService,
            AuthService
            ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  ID:string;
  Product:any;
  user: any;
  userID: number=0;
  userCart:any[] = []
constructor(private myRoute : ActivatedRoute, private productsService:ProductsService, private authService: AuthService){
  this.ID=myRoute.snapshot.params["id"];
}
  ngOnInit(): void {
    this.productsService.GetProductByID(this.ID).subscribe({
      next:(data)=>{
        this.Product = data.Product;
      },
      error:(err)=>{console.log(err)}
    })

    this.userID = this.authService.getLoggedInUser();
    this.authService.GetUserByID(this.userID).subscribe({
      next:(data)=>{
        this.user = data;
        this.userCart = this.user.data.cart;
        console.log('User Data:', this.user);
        console.log('User Cart:', this.userCart);
      },
      error:(err)=>{console.log("Failed to update user:",err)}
    });
  }

  Add_Item(Product: any){
    // console.log('Adding item:', Product);

    this.userCart.push(Product);
    // console.log('User Cart:', this.userCart);
    this.user.data.cart=this.userCart;
    // console.log('User Data====>:', this.user);

    this.updateuserFunction( this.userID,this.user);

    }
  
    updateuserFunction(userID:any,user:any){

      console.log('User Data updateuserFunction ====>', user);
      
      this.authService.updateUser(userID,user).subscribe({
      next:(data)=>{
        console.log('User updated successfully:', data);
      },
      error:(err)=>{console.log("Failed to update user:",err)}
    });
    }
}
