import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';
import { Course } from '../app.model';

const selectCourseSelector = createFeatureSelector<CourseState>('courses');

export const selectTotalCourseCount = createSelector(
  selectCourseSelector,
  (state) => state.formattedCourses.length
);

export const selectFormattedCourses = createSelector(
  selectCourseSelector,
  (state) => state.formattedCourses
);
export const selectDisplayCourses = createSelector(
  selectCourseSelector,
  (state) => state.displayCourses
);

export const selectMaxPageLength = createSelector(
  selectCourseSelector,
  (state) => state.length
);
