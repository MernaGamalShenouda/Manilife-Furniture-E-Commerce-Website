import { Component } from '@angular/core';
import { CartComponent } from '../components/cart/cart.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
constructor(private dialog: MatDialog){}

  openCartDialog() {
    const dialogRef = this.dialog.open(CartComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Cart dialog closed: ${result}`);
    });
  }
}
