import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ApiError, Course, User } from '../app.model';

export const UserActions = createActionGroup({
  source: 'Users',
  events: {
    'Add to wishlist': props<{ course: Course }>(),
    'Remove from wishlist': props<{ courseId: string }>(),
    'Clear wishlist': emptyProps(),
    'Login user': props<{ username: string; password: string }>(),
    'Login success': props<{ user: User }>(),
    'Login failed': props<{ errorDetails: ApiError }>(),
    'Logout user': emptyProps(),
  },
});
