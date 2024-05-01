import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule, NgClass } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ProfileService } from '../../../Services/profile.service';

@Component({
  selector: 'app-profileOrders',
  standalone: true,
  imports: [NgClass, HttpClientModule],
  providers: [ProfileService],
  templateUrl: './profile-orders.component.html',
  styleUrls: ['./profile-orders.component.css'],
})
export class profileOrders implements OnInit {
  @Output() ordersLoaded = new EventEmitter<any[]>();
  orders: any[] = [];
  username: any = '';

  constructor(
    private profileService: ProfileService // Inject AuthService if available
  ) {}

  ngOnInit(): void {
    this.loadOrdersByUsername();
  }

  loadOrdersByUsername(): void {
    this.username = this.profileService.getMyUser().then((userData: any) => {
      this.username = userData.data.username;
      console.log(this.username + 'this is user');

      if (this.username) {
        this.profileService.getOrdersByUsername(this.username).subscribe(
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

  // deleteOrder(id: any): void {
  //   this.profileService.deleteOrderById(id).subscribe(
  //     {
  //       next: (data) => {
  //         console.log('Order deleted:');
  //         this.loadOrdersByUsername();
  //       },
  //       error: (error) => {
  //         console.error('Error deleting order:', error);
  //       }
  //     }
  //   );
  // }

  deleteOrder(order: any): void {
    if (order.state === 'Pending') {
      this.profileService.deleteOrderById(order._id).subscribe({
        next: (data) => {
          console.log('Order deleted:');
          this.loadOrdersByUsername();
        },
        error: (error) => {
          console.error('Error deleting order:', error);
        },
      });
    } else {
      alert('Cannot delete order. Order state is not Pending.');
    }
  }
}
