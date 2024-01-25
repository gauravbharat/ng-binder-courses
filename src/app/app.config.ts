import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { courseReducer } from './state/course.reducer';
import * as courseEffects from './state/course.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { cartReducer } from './state/cart.reducer';
import { userReducer } from './state/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
      courses: courseReducer,
      cart: cartReducer,
      user: userReducer,
    }),
    provideEffects(courseEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
