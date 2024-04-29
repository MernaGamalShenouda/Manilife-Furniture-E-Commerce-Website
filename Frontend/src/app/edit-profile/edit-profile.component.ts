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
    this.userService.GetUserByID(this.userId).subscribe(user => {
      this.user = user;
    });
  }

  onSubmit(username:any ,email:any , image:any): void {
    let updatedUser = { username, email ,image}
    this.userService.updateUserById(this.user.id, updatedUser).subscribe(updatedUser => {
      console.log('User updated successfully:', updatedUser);
     
    });
  }
}
