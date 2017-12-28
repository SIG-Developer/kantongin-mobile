import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import { WishList } from '../../src/screens/WishList';

it('renders <WishList /> component correctly', () => {
  const tree = renderer.create(<WishList
    navigator={{
      pop: () => {},
      setTitle: () => {},
      dismissModal: () => {},
      showModal: () => {},
      setOnNavigatorEvent: () => {},
    }}
    wishListActions={{
      fetch: () => {},
    }}
    wishList={{
      items: [
        {
          main_pair: {
            detailed: {
              http_image_path: 'http://image.path'
            }
          },
          price_formatted: {
            price: '20$',
          }
        }
      ],
    }}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
