import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private authService: AuthService
  ) {}
  logout() {
    this.authService.logout();
  }
}
