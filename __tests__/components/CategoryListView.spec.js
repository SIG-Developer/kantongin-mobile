import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import CategoryListView from '../../src/components/CategoryListView';

it('renders <CategoryListView /> component correctly', () => {
  const tree = renderer.create(<CategoryListView
    category={{
      main_pair: {
        detailed: {
          http_image_path: 'http://test.com',
        }
      }
    }}
    onPress={() => {}}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
