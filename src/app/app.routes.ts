import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', redirectTo: '', pathMatch: 'full' },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
