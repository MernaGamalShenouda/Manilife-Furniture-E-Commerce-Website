import { Component, Inject, OnInit } from '@angular/core';
import { AdminServiceService } from '../../../Services/admin-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';

// import {
//   MatDialog,
//   MatDialogRef,
//   MatDialogActions,
//   MatDialogClose,
//   MatDialogTitle,
//   MatDialogContent,
// } from '@angular/material/dialog';
// import { Router, RouterModule } from '@angular/router';
// import { UpdateProductComponent } from '../update-product/update-product.component';

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
  checkedProducts: string[] = [];


  selectAllChecked: boolean = false;






  constructor(private adminService: AdminServiceService ,public dialog: MatDialog,private router:Router) {



  }


//------------------ngOnInit----------------------------------
  ngOnInit(): void {
    this.getProducts()

    }


    checkDelet()
    {
      return this.checkedProducts.length>0;
    }
//------------------get Search Product------------------------------

//   Getname(e: any) {
//     if (e.target.value.trim() === '') {
//       this.getProducts();
//     }
//     this.adminService.GetProductByName(e.target.value.trim()).subscribe({
//       next: (responseData: any) => {
//         this.products = responseData.Product;
//       },
//       error: (error: any) => {
//         console.error(error);
//       },
//     });
//   }

//   //------------------get  Products ------------------------------

//   getProducts(): void {
//     this.adminService.GetProducts(this.currentPage, this.pageSize).subscribe({
//       next: (data: any) => {
//         this.products = data.Products;
//         this.countProducts = data.countProducts;
//         this.totalPages = Math.ceil(data.countProducts / this.pageSize);
//       },
//       error: (err) => {
//         console.error(err);
//       },
//     });
//   }

//----------toggle All Chechboxs-------------------------------------
  toggleAllCheckboxes() {

    for (let index = 0; index < this.products.length; index++) {
      this.products[index].checked = this.selectAllChecked

      if(this.selectAllChecked)
        {
          this.checkedProducts[index]=this.products[index]._id;
      }else{
        this.checkedProducts.splice(index);
      }
    }

   console.log(this.checkedProducts);



  }


  toggleChecked(productId: string) {
    const index = this.checkedProducts.indexOf(productId);
    if (index === -1) {
      this.checkedProducts.push(productId);

    } else {
      this.checkedProducts.splice(index, 1);
    }

    console.log(this.checkedProducts);
  }


  RemoveAll()
  {

    for (let i = 0; i < this.products.length; i++) {

    let productId=this.checkedProducts[i];

    this.adminService.deleteProduct(this.checkedProducts[i]).subscribe({
      next:data=>{
        console.log(data);

      },
      error:error=>{
        console.error(error);

      }
    })

    const index = this.products.findIndex((product: any) => product._id === productId);
    if (index !== -1) {
      this.products.splice(index);

    }
    }

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['admin/adminProducts']);
    });
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
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,productId:any=null): void {


    const dialogRef = this.dialog.open(DeleteModal, {
      width: '400px',
      data: {
        enterAnimationDuration,
        exitAnimationDuration,
        productId: productId,
        products:this.products,
        checkedProducts:this.checkedProducts

      }
    });

//     dialogRef.afterClosed().subscribe((updatedProducts: any[]) => {
//       if (updatedProducts) {
//         this.products = updatedProducts;
//       }
//     });
//   }

//   //--------------------Update Modal-----------------------------------------

//   openDialogUpdate(productId: string) {
//     const dialogRef = this.dialog.open(UpdateProductComponent, {
//       data: {
//         productId: productId,
//       },
//     });

//     dialogRef.afterClosed().subscribe((result) => {});
//   }

//   //------------

createProduct(){
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['admin/adminCreateProduct']);
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
     HttpClientModule,
    ],
    providers:[
      AdminServiceService
    ]
})
export class DeleteModal  {
  products:any={}
  constructor(public dialogRef: MatDialogRef<DeleteModal>,private adminService:AdminServiceService,    @Inject(MAT_DIALOG_DATA) public data: any,private router:Router) {}

//   productId = this.data.productId;



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
