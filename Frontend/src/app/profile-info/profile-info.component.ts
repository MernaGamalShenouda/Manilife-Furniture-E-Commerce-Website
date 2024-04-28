import { Component ,OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [MatCardModule, RouterModule,HttpClientModule, NavbarComponent],
  providers:[
    AuthService],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})

export class ProfileInfoComponent implements OnInit {
  public userData: any;

  constructor(private authService: AuthService) { }

 /* ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.authService.getMyUser().then(
      (user) => {
        this.userData = user;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
*/

  ngOnInit(): void {
    this.authService.getMyUser().then(user => {
      this.userData = user;
      console.log(this.userData);
    }).catch(error => {
      console.error('Error:', error);
    });
  }
}
