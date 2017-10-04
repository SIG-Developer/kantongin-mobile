import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';
import ProductListView from './ProductListView';

const styles = EStyleSheet.create({
  container: {
    marginTop: 5,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  blockHeader: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '$darkColor',
    marginLeft: 14,
    marginRight: 14,
  }
});

export default class ProductBlocks extends Component {
  static propTypes = {
    name: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    onPress: PropTypes.func,
  }

  static defaultProps = {
    items: []
  }

  renderProduct = (item, index) => (
    <ProductListView
      key={index}
      product={{ item, }}
      onPress={() => this.props.onPress(item)}
    />
  );

  render() {
    const { items, name } = this.props;
    const itemsList = items.map((item, index) => this.renderProduct(item, index));
    return (
      <View style={styles.container}>
        <Text style={styles.blockHeader}>{name}</Text>
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
