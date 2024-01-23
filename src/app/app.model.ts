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
