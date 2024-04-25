import { Routes } from '@angular/router';
import { EditProfileComponent } from  './edit-profile/edit-profile.component'
import { ProfileInfoComponent } from './profile-info/profile-info.component';

export const routes: Routes = [{path: 'edit-profile', component: EditProfileComponent},
{ path: 'profile',component: ProfileInfoComponent}];
