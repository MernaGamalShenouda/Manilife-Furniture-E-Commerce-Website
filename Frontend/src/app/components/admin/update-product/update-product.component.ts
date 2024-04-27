import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AdminServiceService } from '../admin-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [MatDialogModule,
     MatButtonModule,
     MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers:[AdminServiceService],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent  implements OnInit {


  product:any={};
  categories:any={};

  constructor(private adminService:AdminServiceService,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private router:Router
              ) {}

  productId=this.data.productId;

  ngOnInit(): void {
  this.getPoduct()
this.getCategories()


  }

//-------------------get Prodcut Details------------------------------------
  getPoduct(){
    this.adminService.GetProductById(this.productId).subscribe({
      next:data=>{
      this.product=data;
      this.form.patchValue({
        title: this.product.title,
        category: this.product.category,
        quantity:this.product.quantity,
        price:this.product.price,
        description:this.product.details.description,
        image:this.product.category,
       });


      },
      error:error=>{
        console.error(error);

      }
    })
  }

// --------------------------getCategories--------------------------
  getCategories(): void {
    this.adminService.GetProducts().subscribe({
      next: (data: any) => {
        this.categories=data.categories;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

//------------------- validtion ----------------------
 form = new FormGroup({
  title: new FormControl('', [Validators.required, Validators.minLength(3)]),
  category: new FormControl('', [Validators.required]),
  quantity:new FormControl('',[Validators.required]),
  price:new FormControl('',[Validators.required,Validators.min(0)]),
  description:new FormControl('',[Validators.required,Validators.minLength(10)]),
  image:new FormControl('',[Validators.required])
 });



//  get titleValid() {
//   return this.form.controls['title'].valid;
// }

// get categoryValid() {
//   return this.form.controls['category'].valid;
// }

// get quantityValid() {
//   return this.form.controls['quantity'].valid;
// }

// get priceValid() {
//   return this.form.controls['price'].valid;
// }

// get DescriptionValid() {
//   return this.form.controls['description'].valid;
// }

// get imageValid() {
//   return this.form.controls['image'].valid;
// }



 //-----------------update Product-----------------------------------------------
 updateProcut(){
  let product={title:this.form.controls['title'].value,
              category:this.form.controls['category'].value,
              price:this.form.controls['price'].value,
              quantity:this.form.controls['quantity'].value,
              image:this.form.controls['image'].value,
              "details":{
                description:this.form.controls['description'].value,
                "reviews":[

                ]
              }
            }



this.adminService.updateProduct(product,this.productId).subscribe();

this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  this.router.navigate(['adminProducts']);
});
}


}
 