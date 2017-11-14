import development from './development';

const config = {
  username: 'ascherbachenko@cs-cart.com',
  // API KEY
  apiKey: '',
  // API URL
  baseUrl: 'http://mobile.demo.cs-cart.com/api/4.0/',
  // SITE URL
  siteUrl: 'http://mobile.demo.cs-cart.com/',
  // SHOP NAME
  shopName: 'CS-Cart Mobile',

  ...development,
};

export default config;
