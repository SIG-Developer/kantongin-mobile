import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Button from '../../src/components/Button';

it('renders <Button /> component correctly', () => {
  const tree = renderer.create(<Button>Test</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <Button /> component with type', () => {
  const tree = renderer.create(<Button type="primary">Test</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});
