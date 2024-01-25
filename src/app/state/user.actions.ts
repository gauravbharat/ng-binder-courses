import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from '../app.model';

export const UserActions = createActionGroup({
  source: 'Users',
  events: {
    'Add to wishlist': props<{ course: Course }>(),
    'Remove from wishlist': props<{ courseId: string }>(),
    'Clear wishlist': emptyProps(),
  },
});
