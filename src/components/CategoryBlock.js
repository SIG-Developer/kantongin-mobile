import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CategoryListView from './CategoryListView';
import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$categoriesBackgroundColor',
    padding: 5,
    paddingTop: 5,
    paddingBottom: 10,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  header: {
    fontWeight: 'bold',
    fontSize: '1.3rem',
    paddingLeft: 5,
    paddingTop: 10,
    paddingBottom: 10,
    color: '$categoriesHeaderColor',
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
      onPress={() => this.props.onPress(item)}
      key={index}
    />
  );

  render() {
    const { items } = this.props;

    if (!items.length) {
      return null;
    }

    const itemsList = items.map((item, index) => this.renderCategory(item, index));
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {i18n.gettext('Categories')}
        </Text>
        <View style={styles.wrapper}>
          {itemsList}
        </View>
      </View>
    );
  }
}
