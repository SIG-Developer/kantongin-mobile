import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';
import ProductListView from './ProductListView';

const styles = EStyleSheet.create({
  container: {},
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});

export default class ProductBlocks extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
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
    const { items } = this.props;
    const itemsList = items.map((item, index) => this.renderProduct(item, index));
    return (
      <Swiper
        horizontal
        height={250}
        style={styles.container}
      >
        {itemsList}
      </Swiper>
    );
  }
}
