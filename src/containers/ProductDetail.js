import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  InteractionManager,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

// Import actions.
import * as flashActions from '../actions/flashActions';
import * as productsActions from '../actions/productsActions';

// Components
import SelectOption from '../components/SelectOption';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  descriptionBlock: {
    paddingTop: 10,
    marginTop: 10,
    paddingLeft: 14,
    paddingRight: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1'
  },
  nameText: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  priceText: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: 'black',
  },
  promoText: {
    marginBottom: 10,
  },
  optionsContainer: {
    backgroundColor: '#EEEEEE',
    paddingTop: 14,
    paddingBottom: 14,
    marginTop: 24,
    marginBottom: 14,
  },
  optionsWrapper: {
    padding: 14,
    backgroundColor: '#fff',
  },
  addToCartBtn: {
    backgroundColor: '#FF6008',
    padding: 14,
  },
  addToCartBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: '1rem',
  }
});

class ProductDetail extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.Object,
    }),
    products: PropTypes.shape({
    }),
    productsActions: PropTypes.shape({
      fetchOptions: PropTypes.func,
    })
  }

  constructor(props) {
    super(props);

    this.state = {
      product: {},
      selectedOptions: {},
      images: [],
    };
  }

  componentDidMount() {
    const { navigation, productsActions } = this.props;
    const { pid, cid } = navigation.state.params;
    InteractionManager.runAfterInteractions(() => {
      productsActions.fetchOptions(cid, pid);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { products, navigation } = nextProps;
    const { pid, cid } = navigation.state.params;
    const { selectedOptions } = this.state;
    const product = products.items[cid].find(i => i.product_id === pid);
    const images = [];
    // If we haven't images put main image.
    if ('image_pairs' in product) {
      Object.values(product.image_pairs).map(img => images.push(img.detailed.image_path));
    } else {
      images.push(product.main_pair.detailed.image_path);
    }

    // Add default option values.
    if ('options' in product) {
      const defaultOptions = { ...selectedOptions };
      product.options.forEach((option) => {
        const variants = Object.keys(option.variants).map(k => option.variants[k]);
        if (selectedOptions[option.option_name] === undefined) {
          defaultOptions[option.option_name] = variants[0];
        }
      });
      this.setState({
        selectedOptions: defaultOptions,
      });
    }

    this.setState({
      images,
      product,
    });
  }

  renderImage() {
    const { images } = this.state;
    const productImages = images.map((img, index) => (
      <View
        style={styles.slide}
        key={index}
      >
        <Image source={{ uri: img }} style={styles.productImage} />
      </View>
    ));
    return (
      <Swiper
        horizontal
        height={300}
        style={styles.wrapper}
        removeClippedSubviews={false}
      >
        {productImages}
      </Swiper>
    );
  }

  renderName() {
    const { product } = this.state;
    if (!product.product) {
      return null;
    }
    return (
      <Text style={styles.nameText}>
        {product.product}
      </Text>
    );
  }

  renderDesc() {
    const { product } = this.state;
    if (product.full_description) {
      return (
        <Text style={styles.descText}>{product.full_description}</Text>
      );
    }
    return null;
  }

  renderPrice() {
    const { product } = this.state;
    if (!product.price) {
      return null;
    }
    return (
      <Text style={styles.priceText}>${parseFloat(product.price).toFixed(2)}</Text>
    );
  }

  renderOptionItem(item) {
    const option = { ...item };
    const { selectedOptions } = this.state;
    // FIXME: Brainfuck code to convert object to array.
    option.variants = Object.keys(option.variants).map(k => option.variants[k]);
    const defaultValue = selectedOptions[option.option_name];

    switch (item.option_type) {
      case 'S':
        return (
          <SelectOption
            option={option}
            value={defaultValue}
            key={item.option_id}
            onChange={val => this.handleOptionChange(option.option_name, val)}
          />
        );
      default:
        return null;
    }
  }

  renderOptions() {
    const { product } = this.state;
    if (!product.options) {
      return null;
    }
    return (
      <View style={styles.optionsContainer}>
        <View style={styles.optionsWrapper}>
          {product.options.map(o => this.renderOptionItem(o))}
        </View>
      </View>
    );
  }

  renderAddToCart() {
    return (
      <View style={styles.addToCartContainer}>
        <TouchableOpacity style={styles.addToCartBtn}>
          <Text style={styles.addToCartBtnText}>
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  handleOptionChange(name, val) {
    const { selectedOptions } = this.state;
    const newOptions = { ...selectedOptions };
    newOptions[name] = val;
    this.setState({
      selectedOptions: newOptions,
    });
  }

  render() {
    const { navigation, products } = this.props;
    const { product } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderImage()}
          <View style={styles.descriptionBlock}>
            {this.renderName()}
            {this.renderPrice()}
            {this.renderDesc()}
          </View>
          {this.renderOptions()}
        </ScrollView>
        {this.renderAddToCart()}
      </View>
    );
  }
}

ProductDetail.navigationOptions = ({ navigation }) => {
  return {
    title: `Product`.toUpperCase(),
  };
};

export default connect(state => ({
  nav: state.nav,
  flash: state.flash,
  products: state.products,
  categories: state.categories,
}),
  dispatch => ({
    flashActions: bindActionCreators(flashActions, dispatch),
    productsActions: bindActionCreators(productsActions, dispatch),
  })
)(ProductDetail);
