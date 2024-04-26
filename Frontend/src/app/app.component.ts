import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileInfoComponent } from './profile-info/profile-info.component'; // Fix the casing and add quotes around the module path
import { OrderItemComponent } from './order-item/order-item.component'; // Fix the casing and add quotes around the module path
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileInfoComponent, OrderItemComponent, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
}
