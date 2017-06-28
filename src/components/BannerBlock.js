import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';

const styles = EStyleSheet.create({
  container: {},
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});

export default class BannerBlocks extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    items: []
  }

  renderImage = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => alert(item.href)}
      >
        <Image source={{ uri: item.http_image_path }} style={styles.img} />
      </TouchableOpacity>
    );
  }

  render() {
    const { items } = this.props;
    const itemsList = items.map((item, index) => this.renderImage(item, index));
    return (
      <Swiper
        horizontal
        height={220}
        style={styles.container}
      >
        {itemsList}
      </Swiper>
    );
  }
}
