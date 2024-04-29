import { Component ,OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor } from '@angular/common';
//import { OrdersComponent } from '../order-item/order-item.component';


@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [MatCardModule, RouterModule,HttpClientModule, NavbarComponent,NgFor],//OrdersComponent],
  providers:[
    AuthService],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})

export class ProfileInfoComponent implements OnInit {
  public userData: any;
  public orders : any[]=[];
  public username: any='';


  constructor(private authService: AuthService) { }

  
/*
  loadUserData(): void {
    this.authService.getMyUser().then(
      (user) => {
        this.userData = user;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
*/

  ngOnInit(): void {
    this.loadOrdersByUsername();
    this.handleOrdersLoaded(this.orders);
    this.authService.getMyUser().then(user => {
      this.userData = user;
      console.log(this.userData);
    }).catch(error => {
      console.error('Error:', error);
    });

    this.authService.getLoggedInUsername().then(user => {
      this.userData = user;
      console.log(this.userData);
    }).catch(error => {
      console.error('Error:', error);
    });
 
  }
  handleOrdersLoaded(orders: any[]): void {
    this.orders = orders;
    console.log(this.orders);
    
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
          console.log(this.orders[0].username);
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
  trackOrder(index: number, order: any): string {
    return order._id;
  }
}
