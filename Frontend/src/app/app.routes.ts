import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/admin/products/products.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { CreateProductComponent } from './components/admin/create-product/create-product.component';
import { ShopComponent } from './components/shop/shop.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminMainComponent } from './components/admin/admin-main/admin-main.component';
import { AdminGuard } from './Guards/admin.guard';
import { loggedInGuard } from './Guards/logged-in.guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  // {path:"",component:ProductsComponent},
  // {path:"Products",component:ProductsComponent},
  // {path:"CreateProduct",component:CreateProductComponent},

  {
    path: 'admin',
    component: AdminMainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'adminProducts', component: ProductsComponent },
      { path: 'adminCreateProduct', component: CreateProductComponent },
      { path: 'adminOrders', component: OrdersComponent },
    ],
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'Register',/*canActivate:[loggedInGuard],*/ component: RegisterComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'shop',
    component: ShopComponent,
    children: [
      { path: 'products', component: AllProductsComponent },
      { path: 'products/:id', component: ProductDetailsComponent },
    ],
  },

  { path: 'Orders', component: OrdersComponent },
];
