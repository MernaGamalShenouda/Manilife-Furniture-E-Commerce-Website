import { Component } from '@angular/core';
import { RegisterService } from '../../../Services/register.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  providers:[
    RegisterService
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  url_Photo:any={}
  user = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    image:{},
    gender: ''
  };
  constructor(private registerService: RegisterService, private router: Router) {}

  submitForm() {


this.user.image=this.url_Photo.data.secure_url;
    this.registerService.AddUser(this.user).subscribe(
      {
        next: (response: any) => {
          console.log('User added successfully:', response);
          this.router.navigate(['/Login']);
        },
        error: (error) => {
          console.error('Error adding user:', error);
        }
      }
    );
  }


//--------------Upload Photo----------------------------------

uploadPhoto(event: any) {
  const file: File = event.target.files[0];
  const formData = new FormData();
    formData.append('image', file);
  this.registerService.uploadImage(formData).subscribe({
    next: data => {
      this.url_Photo=data

    },
    error: err => {
      console.error(err);
    }
  });
}
}
