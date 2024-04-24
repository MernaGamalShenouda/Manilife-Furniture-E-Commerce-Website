import { Routes } from '@angular/router';
import { ProductsComponent } from './components/admin/products/products.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { CreateProductComponent } from './components/admin/create-product/create-product.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { HomeComponent } from './components/home/home/home.component';

export const routes: Routes = [
  {path:"",component:ProductsComponent},
  {path:"Products",component:ProductsComponent},
  {path:"CreateProduct",component:CreateProductComponent},

  {path:"Orders",component:OrdersComponent},

  {path:"Register", component:RegisterComponent},
  {path:"Login", component:LoginComponent},
  {path:"Home", component:HomeComponent},

];
