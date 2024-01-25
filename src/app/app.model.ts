export enum MenuLink {
  courses = '/',
  wishlist = '/wishlist',
  cart = '/cart',
  profile = '/profile',
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

export enum Position {
  student = 'student',
  professional = 'professional',
}

export enum WorkExperience {
  ZeroToFive = '0 - 5',
  FiveToTen = '5 - 10',
  TenAndAbove = '10 & above',
}

export interface User {
  email: string;
  displayName: string;
  firstName: string;
  gender: string;
  id: number;
  image: string;
  lastName: string;
  token: string;
  username: string;
  about: string;
  areasOfInterest: string[];
  position: Position;
  experience: WorkExperience | undefined;
  role: string;
}

export interface ApiError {
  status: number;
  url: string;
  error: { message: string }; //or can be any other struct based on backend config
}
