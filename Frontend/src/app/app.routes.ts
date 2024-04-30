import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/admin/products/products.component';
import { CreateProductComponent } from './components/admin/create-product/create-product.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminMainComponent } from './components/admin/admin-main/admin-main.component';
import { AdminGuard } from './Guards/admin.guard';
import { loggedInGuard } from './Guards/logged-in.guard';
import { HttpClientModule } from '@angular/common/http';
import { userAuthGuard } from './Guards/user-auth.guard';
import { authGuard } from './Guards/auth.guard';
import { adminAuthGuard } from './Guards/admin-auth.guard';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './components/error/error.component';

import { ShopComponent } from './components/shop/shop.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './components/admin/users/users.component';
import { OrdersAdminComponent } from './components/admin/adminOrders/orders.component';
import { profileOrders } from './components/profile/profile-orders/profile-orders.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { ProfileInfoComponent } from './components/profile/profile-info/profile-info.component';


export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard, adminAuthGuard],
    component: AdminMainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'adminProducts', component: ProductsComponent },
      { path: 'adminCreateProduct', component: CreateProductComponent },
      { path: 'adminOrders', component: OrdersAdminComponent },
      { path: 'adminUsers', component: UsersComponent },
    ],
  },

  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', canActivate: [userAuthGuard], component: HomeComponent },
  { path: 'about', canActivate: [userAuthGuard], component: AboutComponent },

  {
    path: 'Register',
    canActivate: [loggedInGuard],
    component: RegisterComponent,
  },
  { path: 'Login', canActivate: [loggedInGuard], component: LoginComponent },
  {
    path: 'shop',
    canActivate: [userAuthGuard, authGuard],
    component: ShopComponent,
    children: [
      { path: 'products', component: AllProductsComponent },
      { path: 'products/:id', component: ProductDetailsComponent },
    ],
  },
  { path: 'edit-profile/:id', component: EditProfileComponent },
  { path: 'profile', component: ProfileInfoComponent },
  { path: 'OrdersByUser',component: profileOrders},

  { path: '**', component: ErrorComponent },
];
