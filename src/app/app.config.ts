import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { courseReducer } from './state/course.reducer';
import * as courseEffects from './state/course.effects';
import * as userEffects from './state/user.effects';

import { provideStoreDevtools } from '@ngrx/store-devtools';
import { cartReducer } from './state/cart.reducer';
import { userReducer } from './state/user.reducer';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideStore({
      courses: courseReducer,
      cart: cartReducer,
      user: userReducer,
    }),
    provideEffects(courseEffects, userEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(withFetch()),
  ],
};
