import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuLink, getMenuLinkName } from '../app.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  readonly menuItems = Object.freeze([
    Object.freeze({
      routerLink: MenuLink.courses,
      routerLinkName: getMenuLinkName(),
    }),
    Object.freeze({
      routerLink: MenuLink.wishlist,
      routerLinkName: getMenuLinkName(MenuLink.wishlist),
    }),
    Object.freeze({
      routerLink: MenuLink.cart,
      routerLinkName: getMenuLinkName(MenuLink.cart),
    }),
    Object.freeze({
      routerLink: MenuLink.profile,
      routerLinkName: getMenuLinkName(MenuLink.profile),
    }),
  ]);

  readonly routerLinkActiveOptions = Object.freeze({
    matrixParams: 'exact',
    queryParams: 'exact',
    paths: 'exact',
    fragment: 'exact',
  });

  ngOnInit(): void {}
}
