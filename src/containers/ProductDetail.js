import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import striptags from 'striptags';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  InteractionManager,
  KeyboardAvoidingView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

// Import actions.
import * as cartActions from '../actions/cartActions';
import * as flashActions from '../actions/flashActions';
import * as productsActions from '../actions/productsActions';

// Components
import SelectOption from '../components/SelectOption';
import InputOption from '../components/InputOption';
import Spinner from '../components/Spinner';

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
  descText: {
    marginTop: 10,
    color: 'gray'
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
  addToCartContainer: {
    // position: 'absolute',
    //bottom: 0,
    //marginTop: -60,
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
    }),
    flashActions: PropTypes.shape({
      show: PropTypes.func,
    }),
    cartActions: PropTypes.shape({
      add: PropTypes.func,
    }),
    auth: PropTypes.shape({
      token: PropTypes.string,
    }),
    cart: PropTypes.shape({
      fetching: PropTypes.boolean,
    }),
  }

  constructor(props) {
    super(props);

    this.state = {
      product: {},
      fetching: true,
      amount: 1,
      selectedOptions: {},
      images: [],
    };
  }

  componentDidMount() {
    const { navigation, productsActions } = this.props;
    const { pid, cid } = navigation.state.params;
    InteractionManager.runAfterInteractions(() => {
      productsActions.fetch(cid, pid);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { products, navigation } = nextProps;
    const { pid, cid } = navigation.state.params;
    const { selectedOptions } = this.state;
    // FIXME
    const product = products.items[cid].find(i => i.product_id == pid);
    if (!product) {
      return;
    }
    const images = [];
    // If we haven't images put main image.
    if ('image_pairs' in product) {
      images.push(product.main_pair.detailed.image_path);
      Object.values(product.image_pairs).map(img => images.push(img.detailed.image_path));
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
      fetching: products.fetching,
    });
  }

  handleAddToCart() {
    const productOptions = {};
    const { product, selectedOptions } = this.state;
    const { auth, flashActions } = this.props;
    // Convert product options to the option_id: variant_id array.
    Object.keys(selectedOptions).forEach((k) => {
      productOptions[selectedOptions[k].option_id] = selectedOptions[k].variant_id;
    });

    const products = {
      [this.state.product.product_id]: {
        product_id: product.product_id,
        amount: 1,
        product_options: productOptions,
      },
    };
    this.props.cartActions.add(
      { products },
      auth.token,
      () => {
        flashActions.show({
          type: 'success',
          title: 'Success',
          text: 'The product was added to your cart.'
        });
      }
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
        <Text style={styles.descText}>
          {striptags(product.full_description).trimLeft()}
        </Text>
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
      case 'I':
      case 'T':
        return (
          <InputOption
            option={option}
            value={defaultValue}
            key={item.option_id}
            onChange={val => this.handleOptionChange(option.option_name, val)}
          />
        );

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
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={() => this.handleAddToCart()}
        >
          <Text style={styles.addToCartBtnText}>
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderSpinner = () => (
    <View style={styles.container}>
      <ActivityIndicator
        size={'large'}
        style={{ flex: 1 }}
      />
    </View>
  );

  render() {
    const { fetching } = this.state;
    const { cart } = this.props;
    if (fetching) {
      return this.renderSpinner();
    }
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          contentContainerStyle={{ marginBottom: 98 }}
          behavior={'position'}
        >
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
        </KeyboardAvoidingView>
        <Spinner visible={cart.fetching} />
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
  auth: state.auth,
  cart: state.cart,
  flash: state.flash,
  products: state.products,
  categories: state.categories,
}),
  dispatch => ({
    flashActions: bindActionCreators(flashActions, dispatch),
    productsActions: bindActionCreators(productsActions, dispatch),
    cartActions: bindActionCreators(cartActions, dispatch),
  })
)(ProductDetail);
