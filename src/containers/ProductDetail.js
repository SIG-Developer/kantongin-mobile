import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
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

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 280,
    resizeMode: 'contain',
  },
  backBtn: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  backIcon: {
    fontSize: 36,
    paddingRight: 2,
    marginTop: -2,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  descriptionBlock: {
    marginTop: 10,
    paddingTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1'
  },
  nameText: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  priceText: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  promoText: {
    marginBottom: 10,
    textAlign: 'center',
  }
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
    axios
      .get('/options/?product_id=12')
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  renderDesc() {
    const { product } = this.state;
    if (product.full_description) {
      return (
        <Text style={styles.promoText}>{product.full_description}</Text>
      );
    }
    return null;
  }

  renderPrice() {
    const { product } = this.state;
    return (
      <Text style={styles.priceText}>${product.price}</Text>
    );
  }

  render() {
    const { navigation } = this.props;
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
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <Swiper
            style={styles.wrapper}
            horizontal
            height={280}
          >
            {productImages}
          </Swiper>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Icon
              name={'angle-left'}
              style={[styles.backIcon]}
            />
          </TouchableOpacity>
          <View style={styles.descriptionBlock}>
            <Text style={styles.nameText}>{product.product}</Text>
            {this.renderDesc()}
            {this.renderPrice()}
          </View>
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
