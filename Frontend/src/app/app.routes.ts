import { Routes } from '@angular/router';
import { ProductsComponent } from './components/admin/products/products.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { CreateProductComponent } from './components/admin/create-product/create-product.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';

export const routes: Routes = [
  {path:"dashboard",component:DashboardComponent},
  {path:"adminProducts",component:ProductsComponent},
  {path:"adminCreateProduct",component:CreateProductComponent},
  {path:"adminOrders",component:OrdersComponent}

];
