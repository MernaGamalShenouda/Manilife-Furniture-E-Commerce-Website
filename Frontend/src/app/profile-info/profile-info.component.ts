import { Component ,OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [MatCardModule, RouterModule,HttpClientModule],
  providers:[
    UserService],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent implements OnInit  {
  user: any;
  id:number=1;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService) { 
    this.id =this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.userService.GetUserByID(this.id).subscribe((data: any) => {
    this.user = data;
    console.log(this.user);
    });
  }
}
