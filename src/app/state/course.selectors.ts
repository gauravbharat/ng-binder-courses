import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

const courseSelector = createFeatureSelector<CourseState>('courses');
export const selectFormattedCourses = createSelector(
  courseSelector,
  (state) => state.formattedCourses
);
