import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { HttpClientModule } from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    HttpClientModule,
    MatChipsModule,
    CommonModule,
    MatButtonToggleModule
  ],
  providers:[AdminServiceService],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent  implements OnInit {

  Orders:any[]=[];

  constructor(private adminService:AdminServiceService ,public dialog: MatDialog){}


  ngOnInit(): void {
    this.GetOrders()
  }



//------------Get All Orders----------------------------------
  GetOrders():void{
    this.adminService.GetOrders().subscribe({
      next:(data:any)=>{
        this.Orders=data;

        console.log(data);


      },

      error:error=>{
        console.error(error);

      }
    }) 
  }


  updateOrderState(orderId: number, newState: string) {
    this.adminService.updateOrderState(orderId, newState).subscribe(() => {
      this.GetOrders();
    });
  }

}

