
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProfileService } from '../../../Services/profile.service';


@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ HttpClientModule  ],
  providers:[ProfileService],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any;
  userId : any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) {
     this.userId =this.route.snapshot.params["id"]; // Assuming user ID is passed in route params }
  }
  ngOnInit(): void {
  }

  onSubmit(updatedData: any): void {
    this.userId = this.profileService.getLoggedInUser();
    const updatedUserData = {
      username: updatedData.username,
      email: updatedData.email,
      image: updatedData.image,
      fullname: updatedData.fullname
    };
    this.profileService.updateUser(this.userId, updatedUserData).subscribe(
      {
        next:data=>{
          console.log('User updated successfully:', data);

        },error:error => {
          console.error('Error:', error);
        }
      }
    );
    // this.router.navigate(['/profile']);
  }


}

