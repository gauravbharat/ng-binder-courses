import { createReducer, on } from '@ngrx/store';
import { ApiError, Course, User } from '../app.model';
import { getInitialState } from './app.state';
import { UserActions } from './user.actions';

export type UserState = {
  wishlistedItems: Course[]; //this should be stored on the server and fetched with the user details
  user: User | undefined;
  isLoading: boolean;
  apiError: ApiError | undefined;
};

const initialState: UserState = {
  wishlistedItems: [],
  user: undefined,
  isLoading: false,
  apiError: undefined,
};

export const userReducer = createReducer(
  getInitialState('user') || initialState,
  on(
    UserActions.addToWishlist,
    (state, { course }): UserState => ({
      ...state,
      wishlistedItems: [
        JSON.parse(JSON.stringify(course)) as Course,
        ...state.wishlistedItems,
      ],
    })
  ),
  on(UserActions.removeFromWishlist, (state, { courseId }): UserState => {
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
  on(
    UserActions.clearWishlist,
    (state): UserState => ({ ...state, wishlistedItems: [] })
  ),
  on(
    UserActions.loginUser,
    (state): UserState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    UserActions.loginSuccess,
    (state, { user }): UserState => ({
      ...state,
      user,
      isLoading: false,
      apiError: undefined,
    })
  ),
  on(
    UserActions.loginFailed,
    (state, { errorDetails }): UserState => ({
      ...state,
      user: undefined,
      isLoading: false,
      apiError: errorDetails,
    })
  ),
  on(
    UserActions.updateUserStart,
    (state): UserState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(UserActions.updateUserSuccess, (state, { userData }): UserState => {
    const newData = JSON.parse(JSON.stringify(userData));
    const image = userData.image;

    return {
      ...state,
      user: { ...state.user, ...newData, image },
      isLoading: false,
    };
  }),
  on(
    UserActions.logoutUser,
    (state): UserState => ({
      ...state,
      isLoading: false,
      user: undefined,
      apiError: undefined,
      wishlistedItems: [], // this should be cleared if user login failed or user logout, but should be server saved to fetch again
    })
  )
);
