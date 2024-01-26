import {
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';

import { Store } from '@ngrx/store';
import {
  selectDisplayCourses,
  selectFormattedCourses,
  selectMaxPageLength,
} from '../../state/course.selectors';
import { Subscription, take } from 'rxjs';
import { CourseActions } from '../../state/course.actions';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '../../shared/components/course-card/course-card.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { SortOrder } from '../../app.model';
import { BannerComponent } from '../../shared/components/banner/banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CourseCardComponent,
    SearchComponent,
    BannerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  #store = inject(Store);
  displayCourses$ = this.#store.select(selectDisplayCourses);

  searchState: WritableSignal<{
    searchText: string;
    pageIndex: number;
    pageSize: number;
    sortOrder: SortOrder;
  }> = signal({
    searchText: '',
    pageIndex: 0,
    pageSize: 4,
    sortOrder: 'none',
  });

  #subscriptions = new Subscription();
  #maxPageLength: WritableSignal<number> = signal(0);
  maxPageLength = this.#maxPageLength.asReadonly();

  pagePreviousButtonEnabled = computed(() => {
    const currentPageIndex = this.searchState().pageIndex;

    return currentPageIndex > 0;
  });

  pageNextButtonEnabled = computed(() => {
    const currentPageIndex = this.searchState().pageIndex;
    const maxPageLength = this.maxPageLength();

    return currentPageIndex < maxPageLength && maxPageLength > 0;
  });

  ngOnInit(): void {
    this.#subscriptions.add(
      this.#store.select(selectMaxPageLength).subscribe((length) => {
        this.#maxPageLength.set(length);
      })
    );
  }

  setSearchText(searchText: string): void {
    this.searchState.update((state) => ({
      ...state,
      searchText,
      pageIndex: 0,
    }));
    this.#applySearchOptions();
  }

  setPageIndex(pageIndex: number): void {
    // console.log('setPageIndex', pageIndex);

    if (pageIndex < 0) return;
    if (pageIndex > this.maxPageLength()) return;

    this.searchState.update((state) => ({
      ...state,
      pageIndex,
    }));
    this.#applySearchOptions();
  }

  setPageSize(pageSize: number, inputEl: HTMLInputElement): void {
    if (pageSize < 4) {
      inputEl.value = '4';
    }

    this.searchState.update((state) => ({
      ...state,
      pageSize: pageSize < 4 ? 4 : pageSize,
      pageIndex: 0,
    }));
    this.#applySearchOptions();
  }

  setSortOrder(sortOrder: SortOrder): void {
    this.searchState.update((state) => ({ ...state, sortOrder }));
    this.#applySearchOptions();
  }

  #applySearchOptions(): void {
    this.#store.dispatch(CourseActions.applySearchOptions(this.searchState()));
  }

  ngOnDestroy(): void {
    this.#store.dispatch(CourseActions.restoreDefaultPagination());
  }
}
