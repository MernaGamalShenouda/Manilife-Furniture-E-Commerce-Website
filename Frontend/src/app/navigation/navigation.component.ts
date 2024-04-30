import { Component, DoCheck, OnInit, HostListener } from '@angular/core';
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
  showBackground: boolean = false;

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

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const offset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.showBackground = offset >= window.innerHeight * 0.1;
    console.log('showBackground:', this.showBackground);
  }
}
