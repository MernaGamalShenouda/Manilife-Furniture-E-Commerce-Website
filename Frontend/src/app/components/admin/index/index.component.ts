import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  showSidebar: boolean = true;

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
  

}
