import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

const selectUserSelector = createFeatureSelector<UserState>('user');

export const selectTotalWishlistedCourses = createSelector(
  selectUserSelector,
  (state) => state.wishlistedItems.length
);

export const selectWishlistedCourses = createSelector(
  selectUserSelector,
  (state) => state.wishlistedItems
);

export const selectIsCourseAlreadyWishlisted = (courseId: string) =>
  createSelector(
    selectUserSelector,
    (state) =>
      state.wishlistedItems.findIndex((v) => v.courseId === courseId) > -1
  );

export const selectUser = createSelector(
  selectUserSelector,
  (state) => state.user
);
export const selectIsUserLoggedIn = createSelector(
  selectUserSelector,
  (state) => !!state.user
);
export const selectIsUserLoading = createSelector(
  selectUserSelector,
  (state) => state.isLoading
);
