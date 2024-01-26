import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { Course, kCurrencySymbol } from '../../../app.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectIsCartItemExists } from '../../../state/cart.selectors';
import { Subscription, take } from 'rxjs';
import { CartActions } from '../../../state/cart.actions';
import { ButtonComponent } from '../button/button.component';
import { UtilService } from '../../services/util.service';
import { selectIsCourseAlreadyWishlisted } from '../../../state/user.selectors';
import { UserActions } from '../../../state/user.actions';

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
  displayAtCartWidget: WritableSignal<boolean> = signal(false);
  isCourseWishlisted: WritableSignal<boolean> = signal(false);

  readonly currencySymbol = kCurrencySymbol;

  #store = inject(Store);
  #utilService = inject(UtilService);
  #subscriptions = new Subscription();

  ngOnInit(): void {
    this.displayAtCartWidget.set(this.displayAt === 'cartWidget');

    this.#subscriptions.add(
      this.#store
        .select(selectIsCourseAlreadyWishlisted(this.course.courseId))
        .subscribe((isWishlisted) => {
          this.isCourseWishlisted.set(isWishlisted);
        })
    );
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }

  addToCart(): void {
    this.#store
      .select(selectIsCartItemExists(this.course.courseId))
      .pipe(take(1))
      .subscribe((isCartItemExists) => {
        // console.log('isCartItemExists', isCartItemExists > -1);

        if (isCartItemExists === -1) {
          this.#store.dispatch(
            CartActions.addCartItem({ course: this.course })
          );

          this.removeFromWishlist();

          this.#utilService.showSnackbar({
            snackBarMessage: [`Course successfully added in the cart`],
          });
        } else {
          this.#utilService.showSnackbar({
            snackBarMessage: [
              `${this.course.courseName} already exists in the cart`,
            ],
            errorSnackBar: true,
          });
        }
      });
  }

  removeFromCart(): void {
    this.#store.dispatch(
      CartActions.removeCartItem({ courseId: this.course.courseId })
    );
  }

  addToWishlist(): void {
    this.#store.dispatch(UserActions.addToWishlist({ course: this.course }));
  }

  removeFromWishlist(): void {
    this.#store.dispatch(
      UserActions.removeFromWishlist({ courseId: this.course.courseId })
    );
  }
}
