import { Routes } from '@angular/router';
import { ProductsComponent } from './components/admin/products/products.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { CreateProductComponent } from './components/admin/create-product/create-product.component';
import { ShopComponent } from './components/shop/shop.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
  // {path:"",component:ProductsComponent},
  // {path:"Products",component:ProductsComponent},
  // {path:"CreateProduct",component:CreateProductComponent},
  
  { path: 'shop', component: ShopComponent, children: [
    { path: "products", component: AllProductsComponent },
    { path: "products/:id", component: ProductDetailsComponent }]},
  
  {path:"Orders",component:OrdersComponent}

];
