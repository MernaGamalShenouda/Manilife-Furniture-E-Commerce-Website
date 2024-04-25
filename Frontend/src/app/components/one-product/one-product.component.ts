import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-one-product',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './one-product.component.html',
  styleUrl: './one-product.component.css'
})
export class OneProductComponent {
  @Input() Product:any;

  
}
