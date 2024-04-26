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

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const userId = 1  //+this.route.snapshot.paramMap.get('id'); // Assuming user ID is passed in route params
    this.userService.GetUserByID(userId).subscribe(user => {
      this.user = user;
    });
  }

  onSubmit(): void {
    this.userService.updateUserById(this.user.id, this.user).subscribe(updatedUser => {
      console.log('User updated successfully:', updatedUser);
     
    });
  }
}
