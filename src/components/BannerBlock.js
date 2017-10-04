import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';
import { get } from 'lodash';

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

export default class BannerBlocks extends Component {
  static propTypes = {
    name: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    onPress: PropTypes.func,
  }

  static defaultProps = {
    items: []
  }

  renderImage = (item, index) => {
    const imageUri = get(item, 'main_pair.icon.http_image_path');
    return (
      <TouchableOpacity
        key={index}
        onPress={() => this.props.onPress(item)}
      >
        <Image source={{ uri: imageUri }} style={styles.img} />
      </TouchableOpacity>
    );
  }

  render() {
    const { items, name } = this.props;
    const itemsList = items.map((item, index) => this.renderImage(item, index));
    return (
      <View style={styles.container}>
        <Text style={styles.blockHeader}>{name}</Text>
        <Swiper
          horizontal
          height={200}
          style={styles.container}
        >
          {itemsList}
        </Swiper>
      </View>
    );
  }
}
