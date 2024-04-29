import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../../Services/admin-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers:[AdminServiceService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent  implements OnInit {

  countProducts:Number=0;
  countUsers:Number=0;
constructor(private adminService:AdminServiceService){}
  ngOnInit(): void {
this.GetOrders()
this.getCountProducts()
this.getCountUsers()
  }


countOrders:Number=0;
totalPriceSum:Number = 0;
RecentOrders:any={};

  GetOrders():void{
    this.adminService.GetOrders().subscribe({
      next:(data:any)=>{
        this.countOrders=data.countOrders;
        this.RecentOrders=data.orders;

        for (let i = 0; i < data.TotalPrice.length; i++) {
          this.totalPriceSum += data.TotalPrice[i].totalPrice;
        }

       // Sort orders by date in descending order (most recent first)
       data.orders.sort((a: { date: string }, b: { date: string }) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Get the recent orders
      this.RecentOrders = data.orders.slice(0, 5);








      },

      error:error=>{
        console.error(error);

      }
    })
  }

//------------------Count Of Products--------------------------------

getCountProducts(): void {
  this.adminService.GetProducts().subscribe({
    next: (data: any) => {

      this.countProducts=data.countProducts;

    },
    error: (err) => {
      console.error(err);
    }
  });
}
//-------------------- Get Count Users--------------------------


getCountUsers(): void {
  this.adminService.GetUsers().subscribe({
    next: (data: any) => {
      this.countUsers=data.countUsers;

    },
    error: (err) => {
      console.error(err);
    }
  });
}




}
