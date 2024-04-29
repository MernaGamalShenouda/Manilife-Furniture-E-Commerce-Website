import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ HttpClientModule ],
  providers:[
    UserService],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any;
  userId : any; 
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
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
      image: updatedData.image,
      fullname: updatedData.fullname
    };
    this.authService.updateUser(this.userId, updatedUserData).subscribe(updatedUser => {
      console.log('User updated successfully:', updatedUser);
     
    });
  }
}
