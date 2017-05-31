import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import DropdownAlert from 'react-native-dropdownalert';
import EStyleSheet from 'react-native-extended-stylesheet';

// Components

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  bottomBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
    padding: 15,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnAddToCart: {
    backgroundColor: 'black',
    padding: 10,
    color: '#fff'
  },
  btnCustomize: {
    padding: 10,
    color: 'gray'
  }
});

class ProductDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      mode: 'modal',
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    const { product } = this.props;
    const images = [];
    // If we haven't images put main image.
    if ('image_pairs' in product) {
      Object.values(product.image_pairs).map(img => images.push(img.detailed.image_path));
    } else {
      images.push(product.main_pair.detailed.image_path);
    }
    this.setState({
      images,
    });
  }

  onClose() {
    this.props.onClose();
  }

  render() {
    const { product } = this.props;
    const productImages = this.state.images.map((img, index) =>
      <View style={styles.slide} key={index}>
        <Image source={{ uri: img }} style={styles.productImage} />
      </View>
    );
    return (
      <View style={styles.container}>
        <Swiper
          style={styles.wrapper}
          horizontal={false}
          height={560}
        >
          {productImages}
        </Swiper>
        <View style={styles.bottomBar}>
          <TouchableOpacity
            onPress={() => {
              this.props.onAddToCart(this.props.product);
              this.dropdown.alertWithType('success', 'Success', 'The product was added to your cart');
            }}
          >
            <Text style={styles.btnAddToCart}>
              Add to cart
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.onAddToCart(this.props.product)}
          >
            <Text style={styles.btnCustomize}>
              Customize
            </Text>
          </TouchableOpacity>
        </View>
        <DropdownAlert
          ref={ref => this.dropdown = ref}
          onClose={data => this.onClose(data)}
        />
      </View>
    );
  }
}

ProductDetail.propTypes = {
  product: PropTypes.shape({}).isRequired,
  onClose: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductDetail;
