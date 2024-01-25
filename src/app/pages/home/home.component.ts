import { Component, OnInit, inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { selectFormattedCourses } from '../../state/course.selectors';
import { take } from 'rxjs';
import { CourseActions } from '../../state/course.actions';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '../../shared/components/course-card/course-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  #store = inject(Store);
  formattedCourses$ = this.#store.select(selectFormattedCourses);

  ngOnInit(): void {
    this.formattedCourses$.pipe(take(1)).subscribe((formattedData) => {
      // console.log('HomeComponent : formattedData', formattedData);

      if (formattedData.length === 0) {
        setTimeout(() => {
          this.#store.dispatch(CourseActions.fetchCoursesData());
        }, 0);
      }
    });
  }
}
