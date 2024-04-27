import { Component } from '@angular/core';
import { IndexComponent } from '../index/index.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../navbar/navbar.component';

@Component({
  selector: 'app-admin-main',
  standalone: true,
  imports: [
    RouterOutlet,
    IndexComponent,
    NavbarComponent
  ],
  templateUrl: './admin-main.component.html'
})
export class AdminMainComponent {

}
