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
import { MenuLink } from './app.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    FooterComponent,
    HeaderComponent,
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

    return currentUrl === MenuLink.courses;
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
