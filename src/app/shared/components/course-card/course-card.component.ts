import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Course, MenuLink, kCurrencySymbol } from '../../../app.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectIsCartItemExists } from '../../../state/cart.selectors';
import { Subscription } from 'rxjs';
import { CartActions } from '../../../state/cart.actions';
import { ButtonComponent } from '../button/button.component';
import { UtilService } from '../../services/util.service';
import { selectIsCourseAlreadyWishlisted } from '../../../state/user.selectors';
import { UserActions } from '../../../state/user.actions';
import { Router } from '@angular/router';

type CourseCardDisplayParent = 'home' | 'cartWidget' | 'cart' | 'wishlist';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent implements OnInit, OnDestroy {
  @Input() course!: Course;
  @Input() displayAt: CourseCardDisplayParent = 'home';

  imageLoaded: WritableSignal<boolean> = signal(false);
  imageLoadError: WritableSignal<boolean> = signal(false);

  isCourseWishlisted: WritableSignal<boolean> = signal(false);
  isCourseCarted: WritableSignal<boolean> = signal(false);

  #displayAt: WritableSignal<CourseCardDisplayParent> = signal('home');
  displayAtCartWidget = computed(() => {
    const currentDisplayAt = this.#displayAt();
    return currentDisplayAt === 'cartWidget';
  });
  displayAtHome = computed(() => {
    const currentDisplayAt = this.#displayAt();
    return currentDisplayAt === 'home';
  });
  displayAtWishlist = computed(() => {
    const currentDisplayAt = this.#displayAt();
    return currentDisplayAt === 'wishlist';
  });
  displayAtCart = computed(() => {
    const currentDisplayAt = this.#displayAt();
    return currentDisplayAt === 'cart';
  });

  readonly currencySymbol = kCurrencySymbol;

  #store = inject(Store);
  #utilService = inject(UtilService);
  protected subscriptions = new Subscription();
  #router = inject(Router);

  ngOnInit(): void {
    this.#displayAt.set(this.displayAt);

    this.subscriptions.add(
      this.#store
        .select(selectIsCourseAlreadyWishlisted(this.course.courseId))
        .subscribe((isWishlisted) => {
          this.isCourseWishlisted.set(isWishlisted);
        })
    );

    this.subscriptions.add(
      this.#store
        .select(selectIsCartItemExists(this.course.courseId))
        .subscribe((isCarted) => {
          this.isCourseCarted.set(isCarted > -1);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addToCart(): void {
    if (this.isCourseCarted()) {
      this.#utilService.showSnackbar({
        snackBarMessage: [
          `${this.course.courseName} already exists in the cart`,
        ],
        errorSnackBar: true,
      });
    } else {
      this.#store.dispatch(CartActions.addCartItem({ course: this.course }));

      this.removeFromWishlist();

      this.#utilService.showSnackbar({
        snackBarMessage: [`Course successfully added in the cart`],
      });
    }
  }

  removeFromCart(): void {
    this.#store.dispatch(
      CartActions.removeCartItem({ courseId: this.course.courseId })
    );
  }

  addToWishlist(): void {
    if (this.isCourseCarted()) {
      this.#utilService.showSnackbar({
        snackBarMessage: [
          `${this.course.courseName} already exists in the cart`,
        ],
        errorSnackBar: true,
      });
    } else {
      this.#store.dispatch(UserActions.addToWishlist({ course: this.course }));
    }
  }

  moveToWishListFromCart(): void {
    this.removeFromCart();
    this.#store.dispatch(UserActions.addToWishlist({ course: this.course }));
  }

  removeFromWishlist(): void {
    this.#store.dispatch(
      UserActions.removeFromWishlist({ courseId: this.course.courseId })
    );
  }

  openCourseDetail(): void {
    this.#router.navigate([`${MenuLink.course}`, this.course.courseId]);
  }
}
