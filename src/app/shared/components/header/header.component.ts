import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuLink, getMenuLinkName } from '../../../app.model';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../state/user.actions';
import {
  selectIsUserLoading,
  selectIsUserLoggedIn,
} from '../../../state/user.selectors';
import { selectTotalCartItems } from '../../../state/cart.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly menuLink = MenuLink;
  readonly menuItems = Object.freeze([
    Object.freeze({
      routerLink: MenuLink.courses,
      routerLinkName: getMenuLinkName(),
      routerLinkIconClass: 'fi fi-rr-e-learning',
    }),
    Object.freeze({
      routerLink: MenuLink.wishlist,
      routerLinkName: getMenuLinkName(MenuLink.wishlist),
      routerLinkIconClass: 'fi fi-rr-heart',
    }),
    Object.freeze({
      routerLink: MenuLink.cart,
      routerLinkName: getMenuLinkName(MenuLink.cart),
      routerLinkIconClass: 'fi fi-rr-shopping-cart',
    }),
    Object.freeze({
      routerLink: MenuLink.profile,
      routerLinkName: getMenuLinkName(MenuLink.profile),
      routerLinkIconClass: 'fi fi-rr-user',
    }),
  ]);

  readonly routerLinkActiveOptions = Object.freeze({
    matrixParams: 'exact',
    queryParams: 'exact',
    paths: 'exact',
    fragment: 'exact',
  });

  #store = inject(Store);

  isUserLoggedIn$ = this.#store.select(selectIsUserLoggedIn);
  isUserLoading$ = this.#store.select(selectIsUserLoading);
  totalCartItems$ = this.#store.select(selectTotalCartItems);

  onLogin(): void {
    this.#store.dispatch(
      UserActions.loginUser({ username: 'kminchelle', password: '0lelplR' })
    );
  }
}
