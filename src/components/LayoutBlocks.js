import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Blocks
import BannerBlock from './BannerBlock';
import ProductBlock from './ProductBlock';
import { toArray } from '../utils';

const styles = EStyleSheet.create({
  container: {
    marginBottom: 10,
  },
});

export default class LayoutBlocks extends Component {
  static propTypes = {
    blocks: PropTypes.arrayOf(PropTypes.object),
    location: PropTypes.string,
    navigation: PropTypes.shape({}),
  }

  static defaultProps = {
    blocks: [],
    location: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      blocks: [],
    };
  }

  componentDidMount() {
    const { blocks, location } = this.props;
    this.setState({
      blocks: blocks.filter(b => b.location === location),
    });
  }

  renderBlock = (block, index) => {
    const { navigation } = this.props;
    let items = toArray(block.content.items);
    switch (block.type) {
      case 'banners':
        return (
          <BannerBlock
            items={items}
            key={index}
          />
        );

      case 'products':
        return (
          <ProductBlock
            items={items}
            onPress={(product) => {
              navigation.navigate('ProductDetail', {
                pid: product.product_id,
              });
            }}
            key={index}
          />
        );

      default:
        return null;
    }
  }

  render() {
    const { blocks } = this.state;
    const blocksList = blocks.map((block, index) => this.renderBlock(block, index));
    return (
      <View style={styles.container}>
        {blocksList}
      </View>
    );
  }
}
