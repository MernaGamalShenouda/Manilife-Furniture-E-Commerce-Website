/*import { Component } from '@angular/core';
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
