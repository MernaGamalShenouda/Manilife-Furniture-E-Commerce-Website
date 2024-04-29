import { Component, DoCheck, OnInit } from '@angular/core';
import { CartComponent } from '../components/cart/cart.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../Services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements DoCheck {
  isLoggedIn: boolean = true;
  login: boolean = false;
  register: boolean = false;
  currentUrl: string = '';

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}

  ngDoCheck() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUrl = this.router.url;

    this.login = this.currentUrl == '/Login';
    this.register = this.currentUrl == '/Register';
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
