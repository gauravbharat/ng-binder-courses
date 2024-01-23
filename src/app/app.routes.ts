import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MenuLink } from './app.model';

const menuPaths = Object.keys(MenuLink);

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: menuPaths[1], component: WishlistComponent },
  { path: menuPaths[2], component: CartComponent },
  { path: menuPaths[3], component: ProfileComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
