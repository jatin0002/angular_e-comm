import { SearchComponent } from './components/search/search.component';
import { SellerUpdateProductComponent } from './components/seller-update-product/seller-update-product.component';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { AuthGuard } from './auth.guard';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller-auth', component: SellerAuthComponent },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'seller-add-product',
    component: SellerAddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'seller-update-product/:id',
    component: SellerUpdateProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search/:query',
    component: SearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
