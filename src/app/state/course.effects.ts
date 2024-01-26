import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { CourseActions } from './course.actions';
import { exhaustMap, map, of, withLatestFrom } from 'rxjs';
import data from '../data/data.json';
import { Course, kCurrencySymbol } from '../app.model';
import { Store } from '@ngrx/store';
import { selectFormattedCourses } from './course.selectors';

export const loadCourses$ = createEffect(
  (action$ = inject(Actions), store = inject(Store)) => {
    return action$.pipe(
      ofType(CourseActions.fetchCoursesData),
      exhaustMap(() =>
        of(
          data.map((v) => {
            const actualPrice = +v.actualPrice.replace(kCurrencySymbol, '');
            const discountPercentage = +v.discountPercentage.replace('%', '');
            const discountAmount = (discountPercentage / 100) * actualPrice;
            const discountedPrice =
              discountPercentage > 0
                ? Math.round(actualPrice - discountAmount)
                : 0;

            return {
              ...v,
              actualPrice,
              discountPercentage,
              discountedPrice,
            };
          })
        ).pipe(
          map((formattedCourses) => {
            store.dispatch(
              CourseActions.fetchCoursesDataSuccess({ formattedCourses })
            );

            return CourseActions.restoreDefaultPagination();
          })
        )
      )
    );
  },
  { functional: true }
);

export const restoreDefaultPagination$ = createEffect(
  (action$ = inject(Actions)) => {
    return action$.pipe(
      ofType(CourseActions.restoreDefaultPagination),
      exhaustMap(() => {
        return of(true).pipe(
          map(() =>
            CourseActions.applySearchOptions({
              sortOrder: 'none',
              searchText: '',
              pageIndex: 0,
              pageSize: 4,
            })
          )
        );
      })
    );
  },
  { functional: true }
);

export const applySearchOptions$ = createEffect(
  (action$ = inject(Actions), store = inject(Store)) => {
    return action$.pipe(
      ofType(CourseActions.applySearchOptions),
      withLatestFrom(store.select(selectFormattedCourses)),
      exhaustMap(([props, formattedCourses]) => {
        return of(true).pipe(
          map(() => {
            // console.log('applySearchOptions$', props);

            const sortOrder = props.sortOrder || 'none';
            const searchText = props.searchText || '';
            const pageIndex = props.pageIndex || 0;
            const pageSize = props.pageSize || 4;

            let searchItems: string[] = [];

            if (searchText.trim().length > 0) {
              searchItems = searchText.trim().toLowerCase().split(' ');
            }

            const sortFunc = (a: Course, b: Course) =>
              sortOrder === 'asc'
                ? a.discountPercentage > 0
                  ? a.discountedPrice - b.discountedPrice
                  : a.actualPrice - b.actualPrice
                : a.discountPercentage > 0
                ? b.discountedPrice - a.discountedPrice
                : b.actualPrice - a.actualPrice;

            const filterFunc = (v: Course) =>
              // Expensive search but returns granular results; ideal for less data
              searchItems.length > 0
                ? searchItems.some((si1) =>
                    v.courseName.toLowerCase().includes(si1)
                  ) ||
                  searchItems.some((si2) =>
                    v.author.toLowerCase().includes(si2)
                  ) ||
                  searchItems.some((si3) =>
                    v.tags.some((tag) => tag.toLowerCase().includes(si3))
                  )
                : v;

            /** simple search; ideal for thousands of records or backend API controled pagination/search/sort
             * v.courseName.toLowerCase().includes(searchText)
             * v.author.toLowerCase().includes(searchText)
             * v.tags.some((tag) => tag.toLowerCase().includes(searchText))
             */

            let displayCourses = formattedCourses
              .filter(filterFunc)
              .sort(sortOrder !== 'none' ? sortFunc : () => 0);

            const filteredCoursesCount = displayCourses.length;

            let length = Math.round(filteredCoursesCount / pageSize) - 1; //starting from 0

            if (length < 1 && pageSize < filteredCoursesCount) {
              length = 1;
            }

            const startIndex = pageIndex * pageSize;
            const endIndex = startIndex + pageSize;

            // console.log(
            //   'startIndex',
            //   startIndex,
            //   'endIndex',
            //   endIndex,
            //   'filteredCoursesCount - 1',
            //   filteredCoursesCount - 1,
            //   'filteredCoursesCount - 1 > startIndex',
            //   filteredCoursesCount - 1 > startIndex
            // );

            if (filteredCoursesCount > startIndex) {
              displayCourses = displayCourses.slice(startIndex, endIndex);
            }

            return CourseActions.searchOptionsApplied({
              courseOptions: {
                sortOrder,
                searchText,
                pageIndex,
                pageSize,
                length,
                displayCourses,
              },
            });
          })
        );
      })
    );
  },
  { functional: true }
);
