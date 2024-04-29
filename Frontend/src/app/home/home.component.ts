<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
>>>>>>> origin/Merna
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterModule],
=======
  imports: [RouterModule, CommonModule],
>>>>>>> origin/Merna
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent{
  
}
