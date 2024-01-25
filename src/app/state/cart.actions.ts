import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from '../app.model';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add cart item': props<{ course: Course }>(),
    'Remove cart item': props<{ courseId: string }>(),
    'Clear cart': emptyProps(),
  },
});
