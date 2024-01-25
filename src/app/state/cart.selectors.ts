import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';
import { Course } from '../app.model';

const cartSelector = createFeatureSelector<CartState>('cart');

export const getTotalCartItems = createSelector(
  cartSelector,
  (state) => state.cartItems.length
);

export const getCartItems = createSelector(cartSelector, (state) =>
  state.cartItems.map((v) => v)
);

export const getCartItemsTotalValue = createSelector(cartSelector, (state) =>
  state.cartItems.reduce(
    (total, cartItem) =>
      total + (cartItem.discountedPrice || cartItem.actualPrice),
    0
  )
);

// since selector props are deprecated, the selector needs to be rewritten as a "factory selector".
export const cartItemExists = (courseId: string) =>
  createSelector(cartSelector, (state) =>
    state.cartItems.findIndex((v) => v.courseId === courseId)
  );
