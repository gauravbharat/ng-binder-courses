import { Component, inject } from '@angular/core';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { CourseCardComponent } from '../../shared/components/course-card/course-card.component';
import { Store } from '@ngrx/store';
import {
  selectTotalWishlistedCourses,
  selectWishlistedCourses,
} from '../../state/user.selectors';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, BannerComponent, CourseCardComponent, RouterModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  #store = inject(Store);

  wishlistedCourses$ = this.#store.select(selectWishlistedCourses);
  totalWishlistedCourses$ = this.#store.select(selectTotalWishlistedCourses);
}
