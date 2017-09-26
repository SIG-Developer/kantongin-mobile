import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CategoryListView from './CategoryListView';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default class CategoriesBlocks extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    onPress: PropTypes.func,
  }

  static defaultProps = {
    items: []
  }

  renderCategory = (item, index) => (
    <CategoryListView
      category={item}
      index={index}
      onPress={() => this.props.onPress(item)}
      key={index}
    />
  );

  render() {
    const { items } = this.props;
    const itemsList = items.map((item, index) => this.renderCategory(item, index));
    return (
      <View style={styles.container}>
        {itemsList}
      </View>
    );
  }
}
