import { Component, ViewChild } from '@angular/core';
import { RegisterService } from '../../../Services/register.service';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule, CommonModule],
  providers: [RegisterService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  url_Photo: any = {};

  @ViewChild('registerForm', { static: false }) registerForm!: NgForm;

  user = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    image: {},
    gender: '',
  };

  emailError: string = '';
  passError: string = '';
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  submitForm() {
    this.user.image = this.url_Photo.data.secure_url;
    this.registerForm.form.markAllAsTouched();

    if (this.registerForm.form.valid) {
      if (this.checkPasswordStrength(this.registerForm.controls['password'])) {
        console.log('Password is too weak. Please enter a stronger password.');
        return;
      }

      this.registerService.AddUser(this.user).subscribe({
        next: (response: any) => {
          console.log('User added successfully:', response);
          this.router.navigate(['/Login']);
        },
        error: (error) => {
          console.error('Error adding user:', error);
          this.emailError = error.error.text;
          console.log(this.emailError);
        },
      });
    } else {
      console.log('Form is invalid. Please check your inputs.');
    }
  }

  checkPasswordStrength(control: any) {
    if (control.value && control.value.length < 8) {
      this.passError =
        'Password is too weak. Please enter a stronger password.';
      return { weakPassword: true };
    }
    return null;
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
