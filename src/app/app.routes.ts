import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  ResolveFn,
  Router,
  Routes,
} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { Course, MenuLink, RoutePathParams } from './app.model';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsUserLoggedIn } from './state/user.selectors';
import { Observable, tap } from 'rxjs';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { UtilService } from './shared/services/util.service';
import { CourseService } from './shared/services/course.service';

const menuPaths = Object.keys(MenuLink);

const canActivateProfilePage: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsUserLoggedIn).pipe(
    tap((isUserLoggedIn) => {
      if (!isUserLoggedIn) {
        router.navigate(['/'], { replaceUrl: true });
      }
    })
  );
};

const resolveCourseId: ResolveFn<Observable<Readonly<Course | undefined>>> = (
  route: ActivatedRouteSnapshot
) => {
  const courseId: string =
    route.params[`${RoutePathParams.COURSE_ID.slice(1)}`];
  const utilService = inject(UtilService);

  const isValidCourseId = !!courseId && utilService.isValidId(courseId);

  console.log('resolveCourseId courseId', courseId, isValidCourseId);

  const navigateToHome = () => {
    const router = inject(Router);
    router.navigate(['/'], { replaceUrl: true });
  };

  if (!isValidCourseId) {
    navigateToHome();
  }

  const courseService = inject(CourseService);

  return courseService.getCourseById(courseId);
  // .pipe(
  //   map((course) => {
  //     console.log('course', course);
  //     return of(course);
  //   })
  // );
};

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: menuPaths[1], component: WishlistComponent },
  { path: menuPaths[2], component: CartComponent },
  {
    path: menuPaths[3],
    component: ProfileComponent,
    canActivate: [canActivateProfilePage],
  },
  {
    path: `${menuPaths[4]}/${RoutePathParams.COURSE_ID}`,
    component: CourseDetailsComponent,
    resolve: { courseDetails: resolveCourseId },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
