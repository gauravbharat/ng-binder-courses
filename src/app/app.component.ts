import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
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
import { Subscription, filter, take, timer } from 'rxjs';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {
  LocalStoreKeys,
  MenuLink,
  SnackBarStateProps,
  kCurrencySymbol,
} from './app.model';
import { Store } from '@ngrx/store';
import {
  selectCartItems,
  selectCartItemsTotalValue,
  selectTotalCartItems,
} from './state/cart.selectors';
import { CourseCardComponent } from './shared/components/course-card/course-card.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { UtilService } from './shared/services/util.service';
import { selectIsUserLoggedIn } from './state/user.selectors';
import { UserActions } from './state/user.actions';
import { ModalComponent } from './shared/components/modal/modal.component';

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
    ModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('snackBarContainer', { read: ViewContainerRef })
  private _snackBarContainer!: ViewContainerRef;
  @ViewChild('snackBar', { read: TemplateRef })
  private _snackBarChild!: TemplateRef<HTMLDivElement>;

  title = 'ng-binder-courses';

  #subscriptions: Subscription = new Subscription();
  #snackBarTimerSub!: Subscription;

  #router = inject(Router);
  #store = inject(Store);
  #utilService = inject(UtilService);

  #snackBarMessage: WritableSignal<string[]> = signal([]);
  #errorSnackBar: WritableSignal<boolean> = signal(false);
  #currentUrl = signal('/');
  showCartWidget = computed(() => {
    const currentUrl = this.#currentUrl();

    return currentUrl === MenuLink.courses;
  });

  snackBarMessage = this.#snackBarMessage.asReadonly();
  errorSnackBar = this.#errorSnackBar.asReadonly();

  cartItemCount$ = this.#store.select(selectTotalCartItems);
  cartItems$ = this.#store.select(selectCartItems);
  cartItemTotalValue$ = this.#store.select(selectCartItemsTotalValue);
  showModal$ = this.#utilService.modalTrigger$;

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
          // const clone = JSON.parse(JSON.stringify(appState));
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

    this.#subscriptions.add(
      this.#utilService.snackBarTrigger$.subscribe(
        (newSnackBarProps: SnackBarStateProps) => {
          // console.log('newSnackBarProps', newSnackBarProps);

          this.clearSnackBar();

          if (newSnackBarProps.snackBarMessage.length > 0) {
            this.#errorSnackBar.set(newSnackBarProps?.errorSnackBar || false);
            this.#snackBarMessage.set(newSnackBarProps.snackBarMessage);

            this._snackBarContainer.createEmbeddedView(this._snackBarChild);
            this.#snackBarTimerSub = timer(
              newSnackBarProps.duration!
            ).subscribe({
              complete: () => {
                this._snackBarContainer.clear();
              },
            });
          }
        }
      )
    );

    /**
     * since authentication and authorization needs to be handled implicitly with no separate login page specified in requirement
     * passing hard-coded credentials as expected by the dummy auth api https://dummyjson.com/docs/auth
     */
    this.#store
      .select(selectIsUserLoggedIn)
      .pipe(take(1))
      .subscribe((isUserLoggedIn) => {
        if (!isUserLoggedIn) {
          this.#store.dispatch(
            UserActions.loginUser({
              username: 'kminchelle',
              password: '0lelplR',
            })
          );
        }
      });
  }

  clearSnackBar(): void {
    this._snackBarContainer.clear();
    this.#snackBarMessage.set([]);
    this.#snackBarTimerSub?.unsubscribe();
    this.#errorSnackBar.set(false);
  }

  handleCheckout(): void {
    this.#router.navigateByUrl('/cart');
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
    this.#snackBarTimerSub?.unsubscribe();
  }
}
