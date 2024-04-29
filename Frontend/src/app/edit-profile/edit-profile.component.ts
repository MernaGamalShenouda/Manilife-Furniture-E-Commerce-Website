import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ HttpClientModule , NavbarComponent ],
  providers:[AuthService],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any;
  userId : any; 
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { 
     this.userId =this.route.snapshot.params["id"]; // Assuming user ID is passed in route params }
  }
  ngOnInit(): void {
  }

  onSubmit(updatedData: any): void {
    this.userId = this.authService.getLoggedInUser();
    const updatedUserData = {
      username: updatedData.username,
      email: updatedData.email,
      image: updatedData.image
    };
    this.authService.updateUser(this.userId, updatedUserData).subscribe(updatedUser => {
      console.log('User updated successfully:', updatedUser);
    }, error => {
      console.error('Error:', error);
    });
  }
}

