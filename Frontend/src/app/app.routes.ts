import { Routes } from '@angular/router';
import { EditProfileComponent } from  './edit-profile/edit-profile.component'
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { OrderItemComponent } from './order-item/order-item.component';

export const routes: Routes = [{path: 'edit-profile/:id', component: EditProfileComponent},
{ path: 'profile',component: ProfileInfoComponent},
{ path: 'order-item/:username',component: OrderItemComponent}];
