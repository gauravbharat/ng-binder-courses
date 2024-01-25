// import {
//   patchState,
//   signalStore,
//   withComputed,
//   withMethods,
//   withState,
// } from '@ngrx/signals';
// import { Course } from '../app.model';
// import { computed } from '@angular/core';

// type WishlistState = {
//   wishlistedItems: Course[];
// };

// const initialState: WishlistState = {
//   wishlistedItems: [],
// };

// export const WishlistStore = signalStore(
//   { providedIn: 'root' },
//   withState(initialState),
//   withComputed(({ wishlistedItems }) => ({
//     totalWishlistedItems: computed(() => wishlistedItems().length),
//     // getWishlistedItems: computed(() => wishlistedItems().map((v) => v)),
//   })),
//   withMethods((store) => ({
//     isCourseAlreadyWishlisted(courseId: string): boolean {
//       return (
//         store.wishlistedItems().findIndex((v) => v.courseId === courseId) > -1
//       );
//     },
//     addToWishlist(course: Course): void {
//       if (
//         store
//           .wishlistedItems()
//           .findIndex((v) => v.courseId === course.courseId) === -1
//       ) {
//         patchState(store, (state) => ({
//           ...state,
//           wishlistedItems: [
//             JSON.parse(JSON.stringify(course)) as Course,
//             ...state.wishlistedItems,
//           ],
//         }));
//       }
//     },
//     removeFromWishlist(courseId: string): void {
//       const clonedWishlistedItems = <Course[]>(
//         JSON.parse(JSON.stringify(store.wishlistedItems))
//       );
//       const foundIndex = clonedWishlistedItems.findIndex(
//         (v) => v.courseId === courseId
//       );

//       if (foundIndex > -1) {
//         clonedWishlistedItems.splice(foundIndex, 1);
//         patchState(store, (state) => ({
//           ...state,
//           wishlistedItems: clonedWishlistedItems,
//         }));
//       }
//     },
//     clearWishlist(): void {
//       patchState(store, (state) => ({
//         ...state,
//         wishlistedItems: [],
//       }));
//     },
//   }))
// );
