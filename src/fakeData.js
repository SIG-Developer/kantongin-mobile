
export const blocks = [
  {
    type: 'banners',
    location: 'mainPage',
    items: [
      {
        http_image_path: 'http://imakarov.us/images/promo/1/banner-en-sale-40-80.png',
        href: 'test',
      },
      {
        http_image_path: 'http://imakarov.us/images/promo/1/banner-en-xbox360.png',
        href: 'test',
      },
      {
        http_image_path: 'http://imakarov.us/images/promo/1/banner-en-point.png',
        href: 'test',
      },
      {
        http_image_path: 'http://imakarov.us/images/promo/1/banner-en-girl.png',
        href: 'test',
      },
    ],
  },
  {
    type: 'products',
    location: 'mainPage',
    items: [
      {
        product: 'Birds of Prey: The Complete Series (DVD)',
        product_id: '12',
        main_category: 224,
        price: 14.24,
        main_pair: {
          detailed: {
            http_image_path: 'http://imakarov.us/images/detailed/0/1917865.jpg',
          }
        }
      },
      {
        product: 'Nike Futura Unravel Women\'s T-Shirt',
        product_id: '91',
        main_category: 227,
        price: 22.24,
        main_pair: {
          detailed: {
            http_image_path: 'http://imakarov.us/images/detailed/0/437394_010_B.jpg',
          }
        }
      }
    ],
  },
  {
    type: 'banners',
    location: 'productDetail',
  }
];
