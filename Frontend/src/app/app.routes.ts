import { RouterModule, Routes } from '@angular/router';
// import { ProductsComponent } from './components/admin/products/products.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { CreateProductComponent } from './components/admin/create-product/create-product.component';
// import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminMainComponent } from './components/admin/admin-main/admin-main.component';
import { AdminGuard } from './Guards/admin.guard';
import { loggedInGuard } from './Guards/logged-in.guard';
import { HttpClientModule } from '@angular/common/http';
import { userAuthGuard } from './Guards/user-auth.guard';
import { authGuard } from './Guards/auth.guard';
import { adminAuthGuard } from './Guards/admin-auth.guard';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { ShopComponent } from './components/shop/shop.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  // {path:"",component:ProductsComponent},
  // {path:"Products",component:ProductsComponent},
  // {path:"CreateProduct",component:CreateProductComponent},

  {
    path: 'admin',
    canActivate: [authGuard, adminAuthGuard],
    component: AdminMainComponent,
    children: [
      // { path: 'dashboard', component: DashboardComponent },
      // { path: 'adminProducts', component: ProductsComponent },
      { path: 'adminCreateProduct', component: CreateProductComponent },
      { path: 'adminOrders', component: OrdersComponent },
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

  {
    path: 'Orders',
    canActivate: [userAuthGuard, authGuard],
    component: OrdersComponent,
  },

  {
    path: 'edit-profile/:id',
    canActivate: [userAuthGuard, authGuard],
    component: EditProfileComponent,
  },
  {
    path: 'profile',
    canActivate: [userAuthGuard, authGuard],
    component: ProfileInfoComponent,
  },
  {
    path: 'order-item/:username',
    canActivate: [userAuthGuard, authGuard],
    component: OrderItemComponent,
  },

  { path: '**', component: ErrorComponent },
];
