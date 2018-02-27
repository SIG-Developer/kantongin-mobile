import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import FormBlock from '../../src/components/FormBlock';

it('renders <FormBlock /> component correctly', () => {
  const tree = renderer.create(<FormBlock title="test" noContainerStyle>Test</FormBlock>).toJSON();
  expect(tree).toMatchSnapshot();
});
