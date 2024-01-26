import { createReducer, on } from '@ngrx/store';
import { Course, SortOrder } from '../app.model';
import { CourseActions } from './course.actions';
// import { getInitialState } from './app.state';

// Since the app is using local pagination/sort/search, using a local fetch data store variable (formattedCourses) for reference

export interface CourseOptions {
  displayCourses: ReadonlyArray<Course>;
  sortOrder: SortOrder;
  searchText: string;
  pageIndex: number; //The zero-based page index of the displayed list of items. Defaulted to 0.
  pageSize: number; //Number of items to display on a page. By default set to 4.
  length: number;
}

export interface CourseState extends CourseOptions {
  formattedCourses: ReadonlyArray<Course>;
  isLoading: boolean;
}

export const initialState: CourseState = {
  formattedCourses: [],
  displayCourses: [],
  sortOrder: 'none',
  searchText: '',
  pageIndex: 0,
  pageSize: 4,
  length: 0,
  isLoading: true,
};

export const courseReducer = createReducer(
  initialState,
  on(
    CourseActions.fetchCoursesDataSuccess,
    (state, { formattedCourses }): CourseState => ({
      ...state,
      formattedCourses: [...formattedCourses],
      isLoading: false,
    })
  ),
  on(
    CourseActions.searchOptionsApplied,
    (state, { courseOptions }): CourseState => {
      return {
        ...state,
        sortOrder: courseOptions.sortOrder,
        searchText: courseOptions.searchText,
        pageIndex: courseOptions.pageIndex,
        pageSize: courseOptions.pageSize,
        length: courseOptions.length,
        displayCourses: courseOptions.displayCourses,
      };
    }
  )
);
