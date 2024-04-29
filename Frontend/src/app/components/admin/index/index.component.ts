import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RouterModule,
    RouterOutlet
  ],

  providers:[AuthService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

user:any={};
  constructor(private auth:AuthService){}
      ngOnInit(): void {

      this.auth.getMyUser().then(
        data=>{
          this.user=data;
console.log(this.user.data);

        }
      );

      }

  showSidebar: boolean = true;

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }




}
