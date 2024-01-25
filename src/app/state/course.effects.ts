import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { CourseActions } from './course.actions';
import { exhaustMap, map, of } from 'rxjs';
import data from '../data/data.json';
import { kCurrencySymbol } from '../app.model';

export const loadCourses$ = createEffect(
  (action$ = inject(Actions)) => {
    return action$.pipe(
      ofType(CourseActions.fetchCoursesData),
      exhaustMap(() =>
        of(
          data.map((v) => {
            const actualPrice = +v.actualPrice.replace(kCurrencySymbol, '');
            const discountPercentage = +v.discountPercentage.replace('%', '');
            const discountAmount = (discountPercentage / 100) * actualPrice;
            const discountedPrice = Math.round(actualPrice - discountAmount);

            return {
              ...v,
              actualPrice,
              discountPercentage,
              discountedPrice,
            };
          })
        ).pipe(
          map((formattedCourses) =>
            CourseActions.fetchCoursesDataSuccess({ formattedCourses })
          )
        )
      )
    );
  },
  { functional: true }
);
