import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { selectFormattedCourses } from '../../state/course.selectors';
import { Subscription, take } from 'rxjs';
import { CourseActions } from '../../state/course.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  #store = inject(Store);
  formattedCourses$ = this.#store.select(selectFormattedCourses);

  #sub!: Subscription;

  ngOnInit(): void {
    this.#sub = this.formattedCourses$
      .pipe(take(1))
      .subscribe((formattedData) => {
        // console.log('HomeComponent : formattedData', formattedData);

        if (formattedData.length === 0) {
          setTimeout(() => {
            this.#store.dispatch(CourseActions.fetchCoursesData());
          }, 0);
        }
      });
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }
}
