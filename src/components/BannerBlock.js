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
    marginBottom: 20,
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
        <Text style={styles.header}>{name}</Text>
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
