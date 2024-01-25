import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { Course, kCurrencySymbol } from '../../../app.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { cartItemExists } from '../../../state/cart.selectors';
import { take } from 'rxjs';
import { CartActions } from '../../../state/cart.actions';
import { ButtonComponent } from '../button/button.component';

type CourseCardDisplayParent = 'home' | 'cartWidget' | 'cart' | 'wishlist';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent implements OnInit {
  @Input() course!: Course;
  @Input() displayAt: CourseCardDisplayParent = 'home';

  imageLoaded: WritableSignal<boolean> = signal(false);
  imageLoadError: WritableSignal<boolean> = signal(false);
  displayAtCartWidget: WritableSignal<boolean> = signal(false);

  readonly currencySymbol = kCurrencySymbol;

  tempVar = false;

  #store = inject(Store);

  ngOnInit(): void {
    this.displayAtCartWidget.set(this.displayAt === 'cartWidget');
  }

  addToCart(): void {
    this.#store
      .select(cartItemExists(this.course.courseId))
      .pipe(take(1))
      .subscribe((isCartItemExists) => {
        // console.log('isCartItemExists', isCartItemExists > -1);

        if (isCartItemExists === -1) {
          this.#store.dispatch(
            CartActions.addCartItem({ course: this.course })
          );
          // show success message
        } else {
          // TODO: show exists message
        }
      });
  }

  removeFromCart(): void {
    this.#store.dispatch(
      CartActions.removeCartItem({ courseId: this.course.courseId })
    );
  }
}
