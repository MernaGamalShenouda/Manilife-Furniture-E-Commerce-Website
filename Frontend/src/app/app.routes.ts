import { Routes } from '@angular/router';
import { ProductsComponent } from './components/admin/products/products.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { CreateProductComponent } from './components/admin/create-product/create-product.component';

export const routes: Routes = [
  {path:"",component:ProductsComponent},
  {path:"Products",component:ProductsComponent},
  {path:"CreateProduct",component:CreateProductComponent},

  {path:"Orders",component:OrdersComponent}

];
