import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminServiceService } from '../../../Services/admin-service.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({

  selector: 'app-create-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
    ],
    providers:[
      AdminServiceService
    ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'

})




export class CreateProductComponent implements OnInit {

  categories:any={};
  url_Photo:any={}


  constructor(private adminService:AdminServiceService,private router:Router){}

  ngOnInit(): void {
   this.getcategories();
  }

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    category: new FormControl('', [Validators.required]),
    quantity:new FormControl('',[Validators.required]),
    price:new FormControl('',[Validators.required,Validators.min(0)]),
    description:new FormControl('',[Validators.required,Validators.minLength(10)]),
    images:new FormControl('',[Validators.required])
   });


   get titleValid() {
    return this.form.controls['title'].valid;
  }


  get DescriptionValid() {
    return this.form.controls['description'].valid;
  }


  //-----------------Add Product---------------------------------


  addProcut(){
    let product={title:this.form.controls['title'].value,
                category:this.form.controls['category'].value,
                price:this.form.controls['price'].value,
                quantity:this.form.controls['quantity'].value,
                images:this.url_Photo.data.url,
                "details":{
                  description:this.form.controls['description'].value,
                  "reviews":[

                  ]
                }
              }




  this.adminService.creatProduct(product).subscribe();
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['admin/adminProducts']);
  });
  }


//----------------get categories-------------------------------------------
  getcategories(): void {
    this.adminService.GetProducts().subscribe({
      next: (data: any) => {
        this.categories=data.categories;

      },
      error: (err) => {
        console.error(err);
      }
    });
  }




//--------------------upload Photo-------------------------------------------------
uploadPhoto(event: any) {

  const file: File = event.target.files[0];
  const formData = new FormData();
    formData.append('image', file);
  this.adminService.uploadImage(formData).subscribe({
    next: data => {
      this.url_Photo=data

    },
    error: err => {
      console.error(err);
    }
  });
}


}
