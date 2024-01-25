import { createReducer, on } from '@ngrx/store';
import { Course } from '../app.model';
import { getInitialState } from './app.state';
import { CartActions } from './cart.actions';

export type CartState = {
  cartItems: Course[];
};

export const initialState: CartState = {
  cartItems: [],
};

export const cartReducer = createReducer(
  getInitialState('cart') || initialState,
  on(
    CartActions.addCartItem,
    (state, { course }): CartState => ({
      ...state,
      cartItems: [
        JSON.parse(JSON.stringify(course)) as Course,
        ...state.cartItems,
      ],
    })
  ),
  on(CartActions.removeCartItem, (state, { courseId }): CartState => {
    const clonedCartItems = <Course[]>(
      JSON.parse(JSON.stringify(state.cartItems))
    );
    const foundIndex = clonedCartItems.findIndex(
      (v) => v.courseId === courseId
    );

    if (foundIndex > -1) {
      clonedCartItems.splice(foundIndex, 1);
    }

    return {
      ...state,
      cartItems: clonedCartItems,
    };
  }),
  on(CartActions.clearCart, (state): CartState => ({ ...state, cartItems: [] }))
);
