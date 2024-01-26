import { Component, inject } from '@angular/core';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { CourseCardComponent } from '../../shared/components/course-card/course-card.component';
import { Store } from '@ngrx/store';
import { selectWishlistedCourses } from '../../state/user.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, BannerComponent, CourseCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  #store = inject(Store);

  wishlistedCourses$ = this.#store.select(selectWishlistedCourses);
}
