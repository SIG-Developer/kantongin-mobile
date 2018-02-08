import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import CategoryBlock from '../../src/components/CategoryBlock';

it('renders <CategoryBlock /> component correctly', () => {
  const tree = renderer.create(<CategoryBlock
    totalPrice="100%"
    btnText="test"
    onBtnPress={() => {}}
    isBtnDisabled={false}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
