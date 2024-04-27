import { Routes } from '@angular/router';
import { ProductsComponent } from './components/admin/products/products.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { CreateProductComponent } from './components/admin/create-product/create-product.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },

  // { path: '', component: ProductsComponent },
  { path: 'Products', component: ProductsComponent },
  { path: 'CreateProduct', component: CreateProductComponent },

  { path: 'Orders', component: OrdersComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
