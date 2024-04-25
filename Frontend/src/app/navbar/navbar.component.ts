import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [AuthService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, DoCheck {
  isLoggedIn: boolean = true;
  // private intervalId: any;

  constructor(
    private authService: AuthService
  ) {}
  ngDoCheck() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    // this.intervalId = setInterval(() => {
    //   this.isLoggedIn=this.authService.isLoggedIn();
    // }, 100);
  }

  logout() {
    this.authService.logout();
  }
}
