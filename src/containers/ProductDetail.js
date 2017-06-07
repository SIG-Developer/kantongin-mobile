import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

// Import actions.
import * as flashActions from '../actions/flashActions';

// Components
import Spinner from '../components/Spinner';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    marginTop: -10,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 260,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: 'red',
  },
});

class ProductDetail extends Component {
  static propTypes = {
    flashActions: PropTypes.shape({
      show: PropTypes.func,
    }),
  }

  constructor(props) {
    super(props);

    this.state = {
      product: {},
      images: [],
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const product = navigation.state.params.product;
    const images = [];
    // If we haven't images put main image.
    if ('image_pairs' in product) {
      Object.values(product.image_pairs).map(img => images.push(img.detailed.image_path));
    } else {
      images.push(product.main_pair.detailed.image_path);
    }
    this.setState({
      images,
      product,
    });
  }

  render() {
    const { navigation } = this.props;
    console.log(navigation);
    const { product } = this.state;
    const productImages = this.state.images.map((img, index) =>
      <View style={styles.slide} key={index}>
        <Image source={{ uri: img }} style={styles.productImage} />
      </View>
    );
    return (
      <View style={styles.container}>
        <StatusBar
          animated
          hidden
        />
        <ScrollView>
          <Swiper
            style={styles.wrapper}
            horizontal
            height={300}
          >
            {productImages}
          </Swiper>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Icon
              name={'search'}
              style={[styles.tabIcon]}
            />
          </TouchableOpacity>
          <Text>{product.product}</Text>
        </ScrollView>
      </View>
    );
  }
}

ProductDetail.navigationOptions = () => {
  return {
    title: 'Profile',
  };
};

export default connect(state => ({
  nav: state.nav,
  flash: state.flash,
  products: state.products,
}),
  dispatch => ({
    flashActions: bindActionCreators(flashActions, dispatch),
  })
)(ProductDetail);
