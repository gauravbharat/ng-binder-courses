import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Course } from '../app.model';

export const CourseActions = createActionGroup({
  source: 'Courses',
  events: {
    'Fetch courses data': emptyProps(),
    'Fetch courses data success': props<{ formattedCourses: Course[] }>(),
  },
});
