import { CanActivateFn, Router, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MenuLink } from './app.model';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsUserLoggedIn } from './state/user.selectors';
import { tap } from 'rxjs';

const menuPaths = Object.keys(MenuLink);

const canActivateProfilePage: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsUserLoggedIn).pipe(
    tap((isUserLoggedIn) => {
      if (!isUserLoggedIn) {
        router.navigate(['/'], { replaceUrl: true });
      }
    })
  );
};

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: menuPaths[1], component: WishlistComponent },
  { path: menuPaths[2], component: CartComponent },
  {
    path: menuPaths[3],
    component: ProfileComponent,
    canActivate: [canActivateProfilePage],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
