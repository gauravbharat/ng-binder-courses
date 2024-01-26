import {
  Component,
  OnDestroy,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import {
  selectCartItems,
  selectCartItemsActualValue,
  selectCartItemsTotalValue,
  selectTotalCartItems,
} from '../../state/cart.selectors';
import { CourseCardComponent } from '../../shared/components/course-card/course-card.component';
import { CommonModule } from '@angular/common';
import { kCurrencySymbol } from '../../app.model';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { UtilService } from '../../shared/services/util.service';
import { Subscription } from 'rxjs';
import { CartActions } from '../../state/cart.actions';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BannerComponent,
    CourseCardComponent,
    ButtonComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnDestroy {
  @ViewChild('modalMessage')
  private _modalTemplateMessage!: TemplateRef<HTMLDivElement>;
  #store = inject(Store);
  #utilService = inject(UtilService);

  cartedCourses$ = this.#store.select(selectCartItems);
  totalCartedCourses$ = this.#store.select(selectTotalCartItems);

  totalCartItemValue$ = this.#store.select(selectCartItemsTotalValue);
  totalCartItemNoDiscValue$ = this.#store.select(selectCartItemsActualValue);

  readonly currencySymbol = kCurrencySymbol;

  #subscription: Subscription = new Subscription();

  handleCheckout(): void {
    this.#utilService.showModal({
      modalTitle: 'Purchased',
      modalTemplateMessage: this._modalTemplateMessage,
    });

    this.#subscription.add(
      this.#utilService.modalClosed$.subscribe((modalClosed) => {
        if (modalClosed) {
          this.#store.dispatch(CartActions.clearCart());
        }
      })
    );

    this.#subscription.add();
  }

  ngOnDestroy(): void {
    this.#subscription?.unsubscribe();
  }
}
