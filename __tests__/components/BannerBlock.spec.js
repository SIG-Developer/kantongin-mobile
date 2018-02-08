import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import BannerBlock from '../../src/components/BannerBlock';

it('renders <BannerBlock /> component correctly', () => {
  const tree = renderer.create(<BannerBlock
    name="Banner block"
    items={[
      {
        url: 'test',
        main_pair: {
          icon: {
            http_image_path: '',
          },
        }
      }
    ]}
    onPress={() => {}}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
