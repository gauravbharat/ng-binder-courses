import { createReducer, on } from '@ngrx/store';
import { Course } from '../app.model';
import { CourseActions } from './course.actions';
// import { getInitialState } from './app.state';

export type CourseState = {
  formattedCourses: Course[];
};

export const initialState: CourseState = {
  formattedCourses: [],
};

export const courseReducer = createReducer(
  // getInitialState('courses') || initialState,
  initialState,
  on(
    CourseActions.fetchCoursesDataSuccess,
    (state, { formattedCourses }): CourseState => ({
      ...state,
      formattedCourses: [...formattedCourses],
    })
  )
);
