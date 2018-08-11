import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';
import chunk from 'lodash/chunk';
import ProductListView from './ProductListView';
import { PRODUCT_NUM_COLUMNS } from '../utils';

const styles = EStyleSheet.create({
  container: {
    marginTop: 5,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  header: {
    fontWeight: 'bold',
    fontSize: '1.3rem',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    color: '$categoriesHeaderColor',
  },
  chunk: {
    flex: 1,
    flexDirection: 'row',
  }
});

export default class ProductBlock extends Component {
  static propTypes = {
    name: PropTypes.string,
    wrapper: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    onPress: PropTypes.func,
  }

  static defaultProps = {
    items: []
  }

  renderProduct = (items, index) => (
    <View style={styles.chunk} key={index}>
      {items.map((item, chunkIndex) => (
        <ProductListView
          key={chunkIndex}
          product={{ item, }}
          onPress={() => this.props.onPress(item)}
        />
      ))}
    </View>
  );

  render() {
    const { items, name, wrapper } = this.props;
    const itemsList = chunk(items, PRODUCT_NUM_COLUMNS)
      .map((items, index) => this.renderProduct(items, index));

    return (
      <View style={styles.container}>
        {wrapper !== '' && <Text style={styles.header}>{name}</Text>}
        <Swiper
          horizontal
          height={300}
          style={styles.container}
        >
          {itemsList}
        </Swiper>
      </View>
    );
  }
}
