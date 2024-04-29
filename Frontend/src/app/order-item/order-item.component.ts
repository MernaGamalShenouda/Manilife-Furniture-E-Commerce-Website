import { Component, Input, OnInit, Output,EventEmitter  } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';
import { CommonModule, NgClass } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports:[NavbarComponent ,NgClass],
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
