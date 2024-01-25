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
