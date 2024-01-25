import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuLink, getMenuLinkName } from '../../../app.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
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
}