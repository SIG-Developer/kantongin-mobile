import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import EmptyList from '../../src/components/EmptyList';

it('renders <EmptyList /> component correctly', () => {
  const tree = renderer.create(<EmptyList />).toJSON();
  expect(tree).toMatchSnapshot();
});
