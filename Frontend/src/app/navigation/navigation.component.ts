import { Component, DoCheck } from '@angular/core';
import { CartComponent } from '../components/cart/cart.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements DoCheck{
  isLoggedIn: boolean = true;

  constructor(private dialog: MatDialog, private authService: AuthService) {}

  ngDoCheck() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  openCartDialog() {
    const dialogRef = this.dialog.open(CartComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Cart dialog closed: ${result}`);
    });
  }

  logout() {
    this.authService.logout();
  }
}
