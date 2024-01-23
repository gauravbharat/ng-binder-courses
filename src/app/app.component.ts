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
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CartWidgetComponent } from './shared/components/cart-widget/cart-widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    FooterComponent,
    HeaderComponent,
    CartWidgetComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-binder-courses';

  #subscriptions: Subscription = new Subscription();
  #router = inject(Router);

  #currentUrl = signal('/');
  showCartWidget = computed(() => {
    const currentUrl = this.#currentUrl();

    return currentUrl === '/' || currentUrl === '/courses';
  });

  coursesAdded = true;

  ngOnInit(): void {
    this.#subscriptions.add(
      this.#router.events
        .pipe(filter((e) => e instanceof NavigationEnd))
        .subscribe((navigationEnd) => {
          this.#currentUrl.set((navigationEnd as NavigationEnd).url);
        })
    );
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }
}
