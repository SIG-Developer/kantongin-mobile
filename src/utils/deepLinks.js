
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
    }
  }
};
