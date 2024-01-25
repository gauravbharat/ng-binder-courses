import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

const selectCartSelector = createFeatureSelector<CartState>('cart');

export const selectTotalCartItems = createSelector(
  selectCartSelector,
  (state) => state.cartItems.length
);

export const selectCartItems = createSelector(selectCartSelector, (state) =>
  state.cartItems.map((v) => v)
);

export const selectCartItemsTotalValue = createSelector(
  selectCartSelector,
  (state) =>
    state.cartItems.reduce(
      (total, cartItem) =>
        total + (cartItem.discountedPrice || cartItem.actualPrice),
      0
    )
);

// since selector props are deprecated, the selector needs to be rewritten as a "factory selector".
export const selectIsCartItemExists = (courseId: string) =>
  createSelector(selectCartSelector, (state) =>
    state.cartItems.findIndex((v) => v.courseId === courseId)
  );
