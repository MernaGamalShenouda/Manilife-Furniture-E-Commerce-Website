import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { HttpClientModule } from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    HttpClientModule,
    MatChipsModule
  ],
  providers:[AdminServiceService],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent  implements OnInit {

  Orders:any[]=[];

  constructor(private adminService:AdminServiceService){}


  ngOnInit(): void {
    this.GetOrders()
  }



//------------Get All Orders----------------------------------
  GetOrders():void{
    this.adminService.GetOrders().subscribe({
      next:(data:any)=>{
        this.Orders=data;
     

      },

      error:error=>{
        console.error(error);

      }
    })
  }




}
