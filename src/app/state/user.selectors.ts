import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

const userSelector = createFeatureSelector<UserState>('user');

export const totalWishlistedCourses = createSelector(
  userSelector,
  (state) => state.wishlistedItems.length
);

export const isCourseAlreadyWishlisted = (courseId: string) =>
  createSelector(
    userSelector,
    (state) =>
      state.wishlistedItems.findIndex((v) => v.courseId === courseId) > -1
  );
