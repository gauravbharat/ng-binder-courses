import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Course, SortOrder } from '../app.model';
import { CourseOptions } from './course.reducer';

export const CourseActions = createActionGroup({
  source: 'Courses',
  events: {
    'Fetch courses data': emptyProps(),
    'Fetch courses data success': props<{ formattedCourses: Course[] }>(),
    'Restore default pagination': emptyProps(),
    'Apply search options': props<{
      sortOrder?: SortOrder;
      searchText?: string;
      pageIndex?: number;
      pageSize?: number;
    }>(),
    'Search options applied': props<{
      courseOptions: CourseOptions;
    }>(),
  },
});
