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
  user = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    image: null as File | null,
    gender: ''
  };

  constructor(private registerService: RegisterService, private router: Router) {}

  submitForm() {
    this.registerService.AddUser(this.user).subscribe(
      (response: any) => {
        console.log('User added successfully:', response);
        this.router.navigate(['/Login']);
      },
      (error) => {
        console.error('Error adding user:', error);
      }
    );
  }

  formData = new FormData();

  onFileSelected(event: any) {
    const file: File = event.target.files[0]; 
    console.log(file);
    this.user.image = file; 
    this.formData.append('image', this.user.image);
  }
}