import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

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
      routerLink: '/',
      routerLinkName: 'Courses',
    }),
    Object.freeze({
      routerLink: '/wishlist',
      routerLinkName: 'Wishlist',
    }),
    Object.freeze({
      routerLink: '/cart',
      routerLinkName: 'Cart',
    }),
    Object.freeze({
      routerLink: '/profile',
      routerLinkName: 'Profile',
    }),
  ]);

  ngOnInit(): void {}
}
