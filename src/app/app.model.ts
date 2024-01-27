import { TemplateRef } from '@angular/core';

export enum MenuLink {
  courses = '/',
  wishlist = '/wishlist',
  cart = '/cart',
  profile = '/profile',
  course = '/course',
}

export enum RoutePathParams {
  COURSE_ID = ':courseId',
}

export const getMenuLinkName = (menuLink = MenuLink.courses) => {
  switch (menuLink) {
    case MenuLink.wishlist:
      return 'Wishlist';

    case MenuLink.cart:
      return 'Cart';

    case MenuLink.profile:
      return 'Profile';

    default:
      return 'Courses';
  }
};

export enum MimeTypes {
  IMAGE_JPEG = 'image/jpeg',
}

export interface Course {
  courseId: string;
  actualPrice: number;
  author: string;
  courseName: string;
  courseImageUrl: string;
  discountPercentage: number;
  tags: string[];
  discountedPrice: number;
}

export const kCurrencySymbol = '₹';

export enum LocalStoreKeys {
  APP_STATE = 'appState',
}

export type SnackBarStateProps = {
  snackBarMessage: string[];
  errorSnackBar?: boolean;
  duration?: number;
};

export type ModalStateProps = {
  modalTitle: string;
  modalTemplateMessage?: TemplateRef<HTMLDivElement>;
  modalMessage?: string[];
};

export enum Position {
  student = 'student',
  professional = 'professional',
}

export enum WorkExperience {
  ZeroToFive = '0 - 5',
  FiveToTen = '5 - 10',
  TenAndAbove = '10 & above',
}

export enum Expertise {
  BACKEND = 'backend',
  FRONTEND = 'frontend',
  FULLSTACK = 'fullstack',
}

export interface UserUpdateData {
  email: string;
  displayName: string;
  firstName: string;
  gender: string | undefined;
  image: string | ArrayBuffer | null | undefined;
  lastName: string | undefined;
  username: string;
  about: string | undefined;
  areasOfInterest: string[];
  position: Position | undefined;
  experience: WorkExperience | undefined;
  expertise: Expertise | undefined;
  role: string | undefined;
}

export interface User extends UserUpdateData {
  id: number | undefined;
  token: string;
}

export interface ApiError {
  status: number;
  url: string;
  error: { message: string }; //or can be any other struct based on backend config
}

export type SortOrder = 'asc' | 'desc' | 'none';
