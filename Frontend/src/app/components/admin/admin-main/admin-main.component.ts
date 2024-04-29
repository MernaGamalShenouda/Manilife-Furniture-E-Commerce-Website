import { Component } from '@angular/core';
import { IndexComponent } from '../index/index.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-main',
  standalone: true,
  imports: [
    RouterOutlet,
    IndexComponent
  ],
  templateUrl: './admin-main.component.html'
})
export class AdminMainComponent {

}
