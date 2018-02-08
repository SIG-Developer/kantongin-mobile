import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import CartFooter from '../../src/components/CartFooter';

describe('<CartFooter />', () => {
  it('renders <CartFooter /> component correctly', () => {
    const tree = renderer.create(<CartFooter
      totalPrice="100%"
      btnText="test"
      onBtnPress={() => {}}
      isBtnDisabled={false}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
