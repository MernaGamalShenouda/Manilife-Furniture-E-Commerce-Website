
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from '../../../Services/register.service';

import { ProfileService } from '../../../Services/profile.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ HttpClientModule ,FormsModule , ReactiveFormsModule],
  providers:[ProfileService,RegisterService],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any;
  userId : any;
  url_Photo: any = {};



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private registerService: RegisterService
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
   });


  onSubmit(): void {
    const updatedUserData = {
      username: this.form.controls['username'].value,
      email: this.form.controls['email'].value,
      image: this.url_Photo.data.secure_url,
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
    this.router.navigate(['/profile']);
  }



  //--------------Upload Photo----------------------------------

  uploadPhoto(event: any) {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    this.registerService.uploadImage(formData).subscribe({
      next: (data) => {
        this.url_Photo = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }


}

