import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LocalStoreKeys, MenuLink, kCurrencySymbol } from './app.model';
import { Store } from '@ngrx/store';
import {
  getCartItems,
  getCartItemsTotalValue,
  getTotalCartItems,
} from './state/cart.selectors';
import { CourseCardComponent } from './shared/components/course-card/course-card.component';
import { ButtonComponent } from './shared/components/button/button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    FooterComponent,
    HeaderComponent,
    CourseCardComponent,
    ButtonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-binder-courses';

  #subscriptions: Subscription = new Subscription();
  #router = inject(Router);
  #store = inject(Store);

  #currentUrl = signal('/');
  showCartWidget = computed(() => {
    const currentUrl = this.#currentUrl();

    return currentUrl === MenuLink.courses;
  });

  cartItemCount$ = this.#store.select(getTotalCartItems);
  cartItems$ = this.#store.select(getCartItems);
  cartItemTotalValue$ = this.#store.select(getCartItemsTotalValue);

  readonly currencySymbol = kCurrencySymbol;

  ngOnInit(): void {
    this.#subscriptions.add(
      this.#router.events
        .pipe(filter((e) => e instanceof NavigationEnd))
        .subscribe((navigationEnd) => {
          this.#currentUrl.set((navigationEnd as NavigationEnd).url);
        })
    );

    this.#subscriptions.add(
      this.#store.subscribe((appState) => {
        try {
          const clone = JSON.parse(JSON.stringify(appState));
          // console.log('appState', appState);
          localStorage.setItem(
            LocalStoreKeys.APP_STATE,
            JSON.stringify(appState)
          );
        } catch (e) {
          if (e instanceof DOMException && e.name === 'QuotaExceededError') {
            // Handle the error by reducing the size of the data being stored or using a different form of data storage
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }
}
