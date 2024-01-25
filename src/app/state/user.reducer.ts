import { createReducer, on } from '@ngrx/store';
import { Course } from '../app.model';
import { getInitialState } from './app.state';
import { UserActions } from './user.actions';

export type UserState = {
  wishlistedItems: Course[];
};

const initialState: UserState = {
  wishlistedItems: [],
};

export const userReducer = createReducer(
  getInitialState('user') || initialState,
  on(UserActions.addToWishlist, (state, { course }) => ({
    ...state,
    wishlistedItems: [
      JSON.parse(JSON.stringify(course)) as Course,
      ...state.wishlistedItems,
    ],
  })),
  on(UserActions.removeFromWishlist, (state, { courseId }) => {
    const clonedWishlistedItems = <Course[]>(
      JSON.parse(JSON.stringify(state.wishlistedItems))
    );
    const foundIndex = clonedWishlistedItems.findIndex(
      (v) => v.courseId === courseId
    );

    if (foundIndex > -1) {
      clonedWishlistedItems.splice(foundIndex, 1);
    }

    return {
      ...state,
      wishlistedItems: clonedWishlistedItems,
    };
  }),
  on(UserActions.clearWishlist, (state) => ({ ...state, wishlistedItems: [] }))
);
