import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuLink } from './app.model';

const menuPaths = Object.keys(MenuLink);

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: menuPaths[0], redirectTo: '', pathMatch: 'full' },
  { path: menuPaths[1], component: WishlistComponent },
  { path: menuPaths[2], component: CartComponent },
  { path: menuPaths[3], component: ProfileComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
