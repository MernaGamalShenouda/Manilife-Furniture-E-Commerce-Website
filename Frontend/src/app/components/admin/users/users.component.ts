import { Component } from '@angular/core';
import { AdminServiceService } from '../../../Services/admin-service.service';

import { Inject, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,

} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
  ],
  providers:[AdminServiceService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users:any={};
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  countUsers:any;
  searchValue:string='';
  selectAllChecked: boolean = false;



  constructor(private adminService: AdminServiceService ,public dialog: MatDialog) {}



  //------------------ngOnInit----------------------------------
  ngOnInit(): void {
    this.getUsers()

    }


//------------------------get All Users-----------------------------
    getUsers(): void {
      this.adminService.GetUsers(this.currentPage, this.pageSize).subscribe({
        next: (data: any) => {

          this.users = data.data;
          this.countUsers=data.countUsers;
          this.totalPages = Math.ceil(data.countProducts/ this.pageSize);

        },
        error: (err) => {
          console.error(err);
        }
      });
    }

//----------toggle All Chechboxs-------------------------------------

  toggleAllCheckboxes() {

    for (let index = 0; index < this.users.length; index++) {
      this.users[index].checked = this.selectAllChecked

    }
  }

//--------------Pagnation----------------------------------------------

goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.getUsers();
  }
}


//--------------Range of Products showed-----------------------
getRange(): string {
  const startRange = (this.currentPage - 1) * this.pageSize + 1;
  const endRange = Math.min(this.currentPage * this.pageSize, this.countUsers);
  return `${startRange}-${endRange}`;
}

//------------------get Search Product------------------------------

Getname(e:any) {

  if(e.target.value.trim()===""){
    this.getUsers()
  }
    this.adminService.GetUserByName(e.target.value.trim()).subscribe({
        next: (data: any) => {
            this.users = data.users;

            console.log(data);


        },
        error: (error: any) => {
            console.error(error);
        }
    });
}


//-------------- Delete Modal-----------------------------------------
openDialog(enterAnimationDuration: string, exitAnimationDuration: string,userId:any=null): void {


  const dialogRef = this.dialog.open(DeleteModal, {
    width: '400px',
    data: {
      enterAnimationDuration,
      exitAnimationDuration,
      userId: userId,
      users:this.users,

    }
  });



  dialogRef.afterClosed().subscribe((updatedUsers: any[]) => {
    if (updatedUsers) {
      this.users = updatedUsers;

    }
  });
}


}




//---------------component of Delete Modal-------------------------------------

@Component({
  selector: 'DeleteModal.app',
  templateUrl: './userDeleteModal.component.html',
  standalone: true,
  imports: [
     MatDialogActions,
     MatDialogClose,
     MatDialogTitle,
     MatDialogContent,
     MatButtonModule,
     HttpClientModule,
    ],
    providers:[
      AdminServiceService
    ]
})
export class DeleteModal  {
  products:any={}
  constructor(public dialogRef: MatDialogRef<DeleteModal>,
              private adminService:AdminServiceService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router:Router
            ) {}

  userId = this.data.userId;


  //------------------Confirm Delete----------------------------------
  confirm(){

    //----------------------Update desgin when Delete--------------------
    const index = this.data.users.findIndex((product: any) => product._id === this.userId);
    if (index !== -1) {
      this.data.users.splice(index, 1);
    }

    this.adminService.deleteUser(this.userId).subscribe({
      next:data=>{

        this.dialogRef.close(this.data.users);
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





