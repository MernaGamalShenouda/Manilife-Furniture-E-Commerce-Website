/*import { AuthService } from './../Services/auth.service';
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule} from '@angular/router';


@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [RouterModule],
  providers:[
    UserService],
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent {
  username: string = "torky";
  userOrders: any[] = [];

  constructor(private userService: UserService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.username ="torky" //this.route.snapshot.params["username"];
    this.route.params.subscribe(params => {
      this.username = "torky"//params['username'];
      this.fetchUserOrders();
  });

}

fetchUserOrders() {
  this.userService.getOrdersByUserName(this.username).subscribe(
    (orders: any[]) => {
      this.userOrders = orders;
    },
    error => {
      console.error('Error fetching user orders:', error);
    }
  );
}
}
*/
// user-orders.component.ts
/*
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { RouterModule} from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-orders',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
  standalone: true,
  imports: [RouterModule,
    NgFor, NgIf],
  providers:[
    AuthService],
})
export class UserOrdersComponent implements OnInit {
  public userId:any;
  orders: any[]=[];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
   /* this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      this.loadUserOrders();
      */
/*this.loadUserOrders();
    }
  

  loadUserOrders() {
   // this.userOrdersService.getUserOrders(this.userId).subscribe(
    this.authService.getorders().subscribe(
      (data) => {
        this.orders = data;
        console.log(this.orders)
      },
      (error) => {
        console.error('Error fetching user orders:', error);
      }
    );
  }
}
*/
/*import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
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
  providers:[AuthService],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css'
})
export class OrdersComponent  implements OnInit {

  orders: any[]=[];

  constructor(private authService:AuthService ,public dialog: MatDialog){}


  ngOnInit(): void {
    this.loadOrdersByUsername();
  }

  async loadOrdersByUsername(): Promise<void> {
    try {
      this.orders = await this.authService.getOrdersByUsername();
      console.log(this.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Handle error if needed
    }
  }

}
*/

import { Component, Input, OnInit, Output,EventEmitter  } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports:[NavbarComponent],
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrdersComponent implements OnInit {
 @Output() ordersLoaded = new EventEmitter<any[]>();
  orders:any[]=[];
  username: any='';

  constructor(
    private authService: AuthService, // Inject AuthService if available
  ) { }

  ngOnInit(): void {
    this.loadOrdersByUsername();
  }

  loadOrdersByUsername(): void {
    // Get the username of the logged-in user from AuthService or any other method
    this.username  = this.authService. getMyUser().then((userData: any) => {
      this.username = userData.data.username;
    console.log(this.username +"this is user")
 
    if (this.username) {
     
      this.authService.getOrdersByUsername(this.username).subscribe(
        (data) => {
          this.orders = data;
          console.log(this.orders);
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
    } else {
      console.error('Username not available.');
    }
});
}


  deleteOrder(id: any): void {
    this.authService.deleteOrderById(id).subscribe(
      {
        next: (data) => {
          console.log('Order deleted:', data);
          this.loadOrdersByUsername();
        },
        error: (error) => {
          console.error('Error deleting order:', error);
        }
      }
    );
  }

}
