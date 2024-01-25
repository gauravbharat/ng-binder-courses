import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

const selectCourseSelector = createFeatureSelector<CourseState>('courses');
export const selectFormattedCourses = createSelector(
  selectCourseSelector,
  (state) => state.formattedCourses
);
