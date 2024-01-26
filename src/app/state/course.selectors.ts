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

export const selectIsFetchingCourses = createSelector(
  selectCourseSelector,
  (state) => state.isLoading
);

export const selectDisplayCourses = createSelector(
  selectCourseSelector,
  (state) => state.displayCourses
);

export const selectMaxPageLength = createSelector(
  selectCourseSelector,
  (state) => state.length
);

export const selectCourseById = (courseId: string) =>
  createSelector(
    selectCourseSelector,
    (state) =>
      <Readonly<Course | undefined>>(
        state.formattedCourses.find((v) => v.courseId === courseId)
      )
  );
