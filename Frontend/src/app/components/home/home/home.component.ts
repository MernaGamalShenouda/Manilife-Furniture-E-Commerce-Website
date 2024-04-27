import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule
  ],
  providers:[
    AuthService
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: any;
  userID: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userID = this.authService.getLoggedInUser();
    this.authService.GetUserByID(this.userID).subscribe({
      next:(data)=>{
        this.user = data;
        this.user = this.user.data;
      },
      error:(err)=>{console.log("Error")}
    })
  }
}
