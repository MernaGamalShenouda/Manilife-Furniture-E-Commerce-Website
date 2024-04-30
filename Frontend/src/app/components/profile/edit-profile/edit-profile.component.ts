
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProfileService } from '../../../Services/profile.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ HttpClientModule ,FormsModule , ReactiveFormsModule],
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
    console.log('form:', this.form);
  }


  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fullname: new FormControl('', [Validators.required]),
    email:new FormControl ('',[Validators.required]),
    image:new FormControl('',[Validators.required])
   });


  onSubmit(): void {
    const updatedUserData = {
      username: this.form.controls['username'].value,
      email: this.form.controls['email'].value,
      image: this.form.controls['image'].value,
      fullname: this.form.controls['fullname'].value
    };
    console.log(updatedUserData);
    
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

