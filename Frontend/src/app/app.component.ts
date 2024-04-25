import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IndexComponent } from './components/admin/index/index.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IndexComponent, NavigationComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Frontend';
}
