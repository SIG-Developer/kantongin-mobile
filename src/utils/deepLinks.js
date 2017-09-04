
export const registerDrawerDeepLinks = (e, navigator) => {
  if (e.type === 'DeepLink') {
    if (e.link === 'home/') {
      navigator.resetTo({
        screen: 'MainCategory',
        animated: false,
      });
    } else if (e.link === 'cart/content') {
      navigator.resetTo({
        screen: 'Cart',
        animated: false,
      });
    } else if (e.link === 'profile/') {
      navigator.push({
        screen: 'Profile',
        backButtonTitle: '',
        animated: false,
      });
    } else if (e.link === 'orders/') {
      navigator.resetTo({
        screen: 'Orders',
        animated: false,
      });
    }
  }
};

export const unregisterDrawerDeepLinks = () => {};
