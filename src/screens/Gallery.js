import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';

// Components
import Icon from '../components/Icon';

import theme from '../config/theme';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  img: {
    width: '94%',
    height: 400,
    resizeMode: 'contain',
  },
  slide: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnContainer: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  closeBtn: {
    color: theme.$navBarButtonColor,
  }
});

export default class Gallery extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      dismissModal: PropTypes.func,
    }),
    images: PropTypes.arrayOf(PropTypes.string),
    activeIndex: PropTypes.number,
  };

  static navigatorStyle = {
    navBarHidden: true,
  };

  render() {
    const { images } = this.props;
    if (!images.length) {
      return null;
    }
    const items = images.map((href, index) => {
      return (
        <View style={styles.slide} key={index}>
          <Image
            style={styles.img}
            source={{ uri: href }}
          />
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <Swiper
          horizontal
          index={this.props.activeIndex}
        >
          {items}
        </Swiper>
        <TouchableOpacity
          style={styles.closeBtnContainer}
          onPress={() => this.props.navigator.dismissModal({ animationType: 'fade' })}
        >
          <Icon
            name="close"
            style={styles.closeBtn}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
