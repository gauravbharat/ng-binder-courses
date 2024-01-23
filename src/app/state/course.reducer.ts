import { createReducer, on } from '@ngrx/store';
import { Course } from '../app.model';
import { CourseActions } from './course.actions';

export type CourseState = {
  formattedCourses: Course[];
};

export const initialState: CourseState = {
  formattedCourses: [],
};

export const courseReducer = createReducer(
  initialState,
  on(CourseActions.fetchCoursesDataSuccess, (state, { formattedCourses }) => ({
    ...state,
    formattedCourses: [...formattedCourses],
  }))
);
