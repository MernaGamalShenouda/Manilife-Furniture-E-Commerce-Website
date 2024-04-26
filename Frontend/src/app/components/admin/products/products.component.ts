import { Component, Inject, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,

} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers:[
    AdminServiceService
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products:any={};
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  countProducts:any;
  searchValue:string='';


  selectAllChecked: boolean = false;

  name:any




  constructor(private adminService: AdminServiceService ,public dialog: MatDialog) {



  }


//------------------ngOnInit----------------------------------
  ngOnInit(): void {
    this.getProducts()

    }


//------------------get Search Product------------------------------

Getname(e:any) {

  if(e.target.value.trim()===""){
    this.getProducts()
  }
    this.adminService.GetProductByName(e.target.value.trim()).subscribe({
        next: (responseData: any) => {
            this.products = responseData.Product;
            console.log(this.products);

        },
        error: (error: any) => {
            console.error(error);
        }
    });
}

//------------------get  Products ------------------------------

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


//----------toggle All Chechboxs-------------------------------------
  toggleAllCheckboxes() {

    for (let index = 0; index < this.products.length; index++) {
      this.products[index].checked = this.selectAllChecked

    }
  }





//--------------Pagnation----------------------------------------------

goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.getProducts();
  }
}


//--------------Range of Products showed-----------------------
getRange(): string {
  const startRange = (this.currentPage - 1) * this.pageSize + 1;
  const endRange = Math.min(this.currentPage * this.pageSize, this.countProducts);
  return `${startRange}-${endRange}`;
}



//-------------- Delete Modal-----------------------------------------
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,productId:string): void {


    const dialogRef = this.dialog.open(DeleteModal, {
      width: '400px',
      data: {
        enterAnimationDuration,
        exitAnimationDuration,
        productId: productId,
        products:this.products
      }
    });



    dialogRef.afterClosed().subscribe((updatedProducts: any[]) => {
      if (updatedProducts) {
        this.products = updatedProducts;
        console.log(this.products);

      }
    });
  }


//--------------------Update Modal-----------------------------------------

  openDialogUpdate() {
    const dialogRef = this.dialog.open(UpdateProductComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


//---------------component of Delete Modal-------------------------------------
@Component({
  selector: 'DeleteModal.app',
  templateUrl: './DeleteModal.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
     MatDialogActions,
     MatDialogClose,
     MatDialogTitle,
     MatDialogContent,
     HttpClientModule
    ],
    providers:[
      AdminServiceService
    ]
})
export class DeleteModal  {
  constructor(public dialogRef: MatDialogRef<DeleteModal>,private adminService:AdminServiceService,    @Inject(MAT_DIALOG_DATA) public data: any) {}

  productId = this.data.productId;




  confirm(){

    const index = this.data.products.findIndex((product: any) => product._id === this.productId);
    if (index !== -1) {
      this.data.products.splice(index, 1);
    }


    this.adminService.deleteProduct(this.productId).subscribe({
      next:data=>{

        this.dialogRef.close(this.data.products);
      },
      error:error=>{
        console.error(error);

      }
    })

  }


  Cenecl(){
    return ;
  }

}
