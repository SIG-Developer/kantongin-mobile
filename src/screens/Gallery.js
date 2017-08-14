import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';

const styles = EStyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'green',
  },
  img: {
    height: 300,
    width: 300,
  },
  scroll: {
    flex: 1,
  }
});

export default class Gallery extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      resetTo: PropTypes.func,
      showModal: PropTypes.func,
      toggleDrawer: PropTypes.func,
      dismissModal: PropTypes.func,
      showInAppNotification: PropTypes.func,
    }),
    images: PropTypes.arrayOf(PropTypes.string),
  };

  render() {
    const { navigator, images } = this.props;
    if (!images.length) {
      return null;
    }
    const items = images.map((href, index) => {
      return (
        <Image
          key={index}
          style={styles.img}
          source={{ uri: href }}
        />
      );
    });

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigator.dismissLightBox()}>
          <Text>Close</Text>
        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={styles.scroll}
        >
          {items}
        </ScrollView>
      </View>
    );
  }
}
