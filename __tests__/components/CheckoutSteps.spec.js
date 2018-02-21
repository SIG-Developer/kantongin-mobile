import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import CheckoutSteps from '../../src/components/CheckoutSteps';

it('renders <CheckoutSteps /> component correctly', () => {
  const tree = renderer.create(<CheckoutSteps
    step={1}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <CheckoutSteps /> with props', () => {
  const tree = renderer.create(<CheckoutSteps
    step={2}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
