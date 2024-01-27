import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course, kCurrencySymbol } from '../../app.model';

import data from '../../data/data.json';
import { Store } from '@ngrx/store';
import { selectCourseById } from '../../state/course.selectors';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  #store = inject(Store);

  getCourses(): Observable<Course[]> {
    return of(
      data.map((v) => {
        const actualPrice = +v.actualPrice.replace(kCurrencySymbol, '');
        const discountPercentage = +v.discountPercentage.replace('%', '');
        const discountAmount = (discountPercentage / 100) * actualPrice;
        const discountedPrice =
          discountPercentage > 0 ? Math.round(actualPrice - discountAmount) : 0;

        return {
          ...v,
          actualPrice,
          discountPercentage,
          discountedPrice,
        };
      })
    );
    // .pipe(delay(5000));
  }

  getCourseById(courseId: string): Observable<Course | undefined> {
    return this.#store.select(selectCourseById(courseId));
  }
}
