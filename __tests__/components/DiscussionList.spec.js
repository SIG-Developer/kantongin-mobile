import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import DiscussionList from '../../src/components/DiscussionList';

it('renders <DiscussionList /> component correctly', () => {
  const tree = renderer.create(<DiscussionList
    items={[
      {},
    ]}
    infinite={false}
    fetching={false}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
