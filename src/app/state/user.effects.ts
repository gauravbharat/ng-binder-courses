import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../shared/services/auth.service';
import { UserActions } from './user.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { UtilService } from '../shared/services/util.service';

export const login$ = createEffect(
  (
    action$ = inject(Actions),
    authService = inject(AuthService),
    utilService = inject(UtilService)
  ) => {
    return action$.pipe(
      ofType(UserActions.loginUser),
      exhaustMap(({ username, password }) =>
        authService.login({ username, password }).pipe(
          map((user) => {
            utilService.showSnackbar({
              snackBarMessage: [`Login successful`],
            });

            return UserActions.loginSuccess({ user });
          }),
          catchError((err) => {
            return of(
              UserActions.loginFailed({
                errorDetails: {
                  url: err.url,
                  status: err.status,
                  error: err.error,
                },
              })
            );
          })
        )
      )
    );
  },
  { functional: true }
);

export const loginFailed$ = createEffect(
  (action$ = inject(Actions), utilService = inject(UtilService)) => {
    return action$.pipe(
      ofType(UserActions.loginFailed),
      tap(({ errorDetails }) => {
        console.log('loginFailed$', errorDetails);
        utilService.showSnackbar({
          snackBarMessage: [
            `${errorDetails.error.message}`,
            `Server returned a status of ${errorDetails.status}`,
          ],
          errorSnackBar: true,
          duration: 5000,
        });
      })
    );
  },
  { functional: true, dispatch: false }
);
