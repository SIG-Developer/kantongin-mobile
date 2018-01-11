import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Share,
  Image,
  ScrollView,
  TouchableOpacity,
  InteractionManager,
  KeyboardAvoidingView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';
import { has } from 'lodash';
import { stripTags, formatPrice } from '../utils';

// Import actions.
import * as cartActions from '../actions/cartActions';
import * as productsActions from '../actions/productsActions';
import * as wishListActions from '../actions/wishListActions';

// Components
import SelectOption from '../components/SelectOption';
import InputOption from '../components/InputOption';
import QtyOption from '../components/QtyOption';
import SwitchOption from '../components/SwitchOption';
import Spinner from '../components/Spinner';
import Section from '../components/Section';
import Rating from '../components/Rating';

import i18n from '../utils/i18n';

// theme
import theme from '../config/theme';

import {
  iconsMap,
  iconsLoaded,
} from '../utils/navIcons';
import Icon from '../components/Icon';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$screenBackgroundColor',
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
    paddingBottom: 10,
    marginTop: 10,
    paddingLeft: 14,
    paddingRight: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1'
  },
  nameText: {
    fontSize: '1.2rem',
    color: '$darkColor',
    marginBottom: 5,
  },
  priceText: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '$darkColor',
  },
  promoText: {
    marginBottom: 10,
  },
  descText: {
    marginTop: 10,
    color: 'gray'
  },
  addToCartContainer: {
    padding: 10,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '$grayColor',
  },
  addToCartBtn: {
    backgroundColor: '$primaryColor',
    padding: 10,
    flex: 1,
    borderRadius: 2,
  },
  addToCartBtnText: {
    textAlign: 'center',
    color: '$primaryColorText',
    fontSize: 16,
  },
  addToWishList: {
    backgroundColor: '$addToWishListColor',
    width: 60,
    marginLeft: 12,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToWishListIcon: {
    color: '#fff',
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: '#FD542A',
    borderRadius: 6,
  },
  outlineBtnText: {
    color: '#FD542A',
    padding: 16,
    textAlign: 'center',
    fontSize: '0.9rem',
    backgroundColor: 'transparent',
  },
  feautureGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    paddingBottom: 8,
    paddingTop: 8,
  },
  feautureNameText: {
    fontWeight: 'bold',
  }
});

class ProductDetail extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      push: PropTypes.func,
      setOnNavigatorEvent: PropTypes.func,
      showInAppNotification: PropTypes.func,
      showModal: PropTypes.func,
      setButtons: PropTypes.func,
    }),
    wishListActions: PropTypes.shape({
      add: PropTypes.func,
    }),
    pid: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    hideSearch: PropTypes.bool,
    hideWishList: PropTypes.bool,
    productDetail: PropTypes.shape({
    }),
    productsActions: PropTypes.shape({
      fetchOptions: PropTypes.func,
    }),
    cartActions: PropTypes.shape({
      add: PropTypes.func,
    }),
    auth: PropTypes.shape({
      token: PropTypes.string,
      logged: PropTypes.bool,
    }),
    cart: PropTypes.shape({
      fetching: PropTypes.boolean,
    }),
  }

  static navigatorStyle = {
    navBarBackgroundColor: theme.$navBarBackgroundColor,
    navBarButtonColor: theme.$navBarButtonColor,
    navBarButtonFontSize: theme.$navBarButtonFontSize,
    navBarTextColor: theme.$navBarTextColor,
    screenBackgroundColor: theme.$screenBackgroundColor,
  };

  constructor(props) {
    super(props);

    this.state = {
      product: {},
      fetching: true,
      amount: 1,
      selectedOptions: {},
      images: [],
    };

    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    const buttons = {
      rightButtons: [
        {
          id: 'cart',
          component: 'CartBtn',
          passProps: {},
        },
        {
          id: 'search',
          icon: iconsMap.search,
        },
      ],
    };
    iconsLoaded.then(() => {
      const { hideSearch } = this.props;
      if (hideSearch) {
        buttons.rightButtons.splice(-1, 1);
      }
      this.props.navigator.setButtons(buttons);
    });
  }

  componentDidMount() {
    const { productsActions, pid, } = this.props;
    InteractionManager.runAfterInteractions(() => {
      productsActions.fetch(pid);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { productDetail, navigator } = nextProps;
    const { selectedOptions } = this.state;
    // FIXME
    const product = productDetail;
    if (!product) {
      return;
    }
    const images = [];
    // If we haven't images put main image.
    if (has(product, 'main_pair.detailed.image_path')) {
      images.push(product.main_pair.detailed.image_path);
      Object.values(product.image_pairs).map(img => images.push(img.detailed.image_path));
    }

    // // Add default option values.
    if ('options' in product) {
      const defaultOptions = { ...selectedOptions };
      product.options.forEach((option) => {
        if (option.option_type === 'S') {
          const variants = Object.keys(option.variants).map(k => option.variants[k]);
          if (selectedOptions[option.option_id] === undefined && variants.length) {
            defaultOptions[option.option_id] = variants[0];
          }
        } else if (option.option_type === 'I') {
          defaultOptions[option.option_id] = '';
        } else if (option.option_type === 'C') {
          const variants = Object.keys(option.variants).map(k => option.variants[k]);
          if (selectedOptions[option.option_id] === undefined && variants.length) {
            defaultOptions[option.option_id] = variants[1]; // Default no
          }
        }
      });
      this.setState({
        selectedOptions: defaultOptions,
      });
    }

    this.setState({
      images,
      product,
      fetching: productDetail.fetching,
    }, () => this.calculatePrice());

    navigator.setTitle({
      title: product.product,
    });
  }

  onNavigatorEvent(event) {
    const { navigator, hideSearch } = this.props;
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'search') {
        if (hideSearch) {
          navigator.pop();
          return;
        }
        navigator.showModal({
          screen: 'Search',
          animated: false,
        });
      }
    }
  }

  calculatePrice = () => {
    const { selectedOptions, product } = this.state;
    const { productDetail } = this.props;
    let newPrice = 0;
    newPrice += +productDetail.price;
    Object.keys(selectedOptions).forEach((key) => {
      newPrice += +selectedOptions[key].modifier;
    });
    newPrice *= this.state.amount;
    this.setState({
      product: {
        ...product,
        price: newPrice,
      },
    });
  }

  handleAddToCart() {
    const productOptions = {};
    const { product, selectedOptions } = this.state;

    if (!this.props.auth.logged) {
      return this.props.navigator.showModal({
        screen: 'Login',
      });
    }

    // Convert product options to the option_id: variant_id array.
    Object.keys(selectedOptions).forEach((k) => {
      productOptions[k] = selectedOptions[k];
      if (selectedOptions[k].variant_id) {
        productOptions[k] = selectedOptions[k].variant_id;
      }
    });

    const products = {
      [this.state.product.product_id]: {
        product_id: product.product_id,
        amount: this.state.amount,
        product_options: productOptions,
      },
    };
    return this.props.cartActions.add({ products });
  }

  handleAddToWishList() {
    const productOptions = {};
    const { product, selectedOptions } = this.state;

    if (!this.props.auth.logged) {
      return this.props.navigator.showModal({
        screen: 'Login',
      });
    }

    // Convert product options to the option_id: variant_id array.
    Object.keys(selectedOptions).forEach((k) => {
      productOptions[k] = selectedOptions[k];
      if (selectedOptions[k].variant_id) {
        productOptions[k] = selectedOptions[k].variant_id;
      }
    });

    const products = {
      [this.state.product.product_id]: {
        product_id: product.product_id,
        amount: this.state.amount,
        product_options: productOptions,
      },
    };
    return this.props.wishListActions.add({ products });
  }

  handleOptionChange(name, val) {
    const { selectedOptions } = this.state;
    const newOptions = { ...selectedOptions };
    newOptions[name] = val;
    this.setState({
      selectedOptions: newOptions,
    }, () => this.calculatePrice());
  }

  renderImage() {
    const { images } = this.state;
    const productImages = images.map((img, index) => (
      <TouchableOpacity
        style={styles.slide}
        key={index}
        onPress={() => {
          this.props.navigator.showModal({
            screen: 'Gallery',
            animationType: 'fade',
            passProps: {
              images: [...this.state.images],
              activeIndex: index,
            },
          });
        }}
      >
        <Image source={{ uri: img }} style={styles.productImage} />
      </TouchableOpacity>
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

  renderRating = () => (
    <Rating
      value={'3'}
    />
  );

  renderDesc() {
    const { product } = this.state;
    if (product.full_description) {
      return (
        <Text style={styles.descText}>
          {stripTags(product.full_description)}
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
      <Text style={styles.priceText}>
        {formatPrice(product.price)}
      </Text>
    );
  }

  renderDiscussion() {
    return null;
  }

  renderOptionItem = (item) => {
    const option = { ...item };
    const { selectedOptions } = this.state;
    // FIXME: Brainfuck code to convert object to array.
    option.variants = Object.keys(option.variants).map(k => option.variants[k]);
    const defaultValue = selectedOptions[option.option_id];

    switch (item.option_type) {
      case 'I':
      case 'T':
        return (
          <InputOption
            option={option}
            value={defaultValue}
            key={item.option_id}
            onChange={val => this.handleOptionChange(option.option_id, val)}
          />
        );

      case 'S':
        return (
          <SelectOption
            option={option}
            value={defaultValue}
            key={item.option_id}
            onChange={val => this.handleOptionChange(option.option_id, val)}
          />
        );

      case 'C':
        return (
          <SwitchOption
            option={option}
            value={defaultValue}
            key={item.option_id}
            onChange={val => this.handleOptionChange(option.option_id, val)}
          />
        );
      default:
        return null;
    }
  }

  renderOptions() {
    const { product } = this.state;
    if (!product.options.length) {
      return null;
    }
    return (
      <Section>
        {product.options.map(o => this.renderOptionItem(o))}
        <QtyOption
          value={this.state.amount}
          onChange={(val) => {
            this.setState({
              amount: val,
            }, () => this.calculatePrice());
          }}
        />
      </Section>
    );
  }

  renderFeautureItem = item => (
    <View style={styles.feautureGroup} key={item.feature_id}>
      <View style={styles.feautureName}>
        <Text style={styles.feautureNameText}>
          {item.description}
        </Text>
      </View>
      <View style={styles.feautureValue}>
        <Text style={styles.feautureValueText}>
          {item.variant}
        </Text>
      </View>
    </View>
  );

  renderFeatures() {
    const { product } = this.state;
    const features = Object.keys(product.product_features).map(k => product.product_features[k]);
    if (features.length === 0) {
      return (
        <Section>
          <Text> {i18n.gettext('There are no feautures.')} </Text>
        </Section>
      );
    }
    return (
      <Section title={i18n.gettext('Feautures')}>
        {features.map(f => this.renderFeautureItem(f))}
      </Section>
    );
  }

  renderShare() {
    const { product } = this.state;
    return (
      <Section>
        <TouchableOpacity
          style={styles.outlineBtn}
          onPress={() => {
            Share.share({
              message: product.full_description,
              title: product.product,
              url: 'http://amelekesov.tk',
            }, {
              dialogTitle: product.product,
              excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter',
                'com.apple.uikit.activity.mail'
              ],
              tintColor: 'black'
            });
          }}
        >
          <Text style={styles.outlineBtnText}> {i18n.gettext('Share product')} </Text>
        </TouchableOpacity>
      </Section>
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
            {i18n.gettext('Add to cart').toUpperCase()}
          </Text>
        </TouchableOpacity>

        {!this.props.hideWishList &&
          <TouchableOpacity
            style={styles.addToWishList}
            onPress={() => this.handleAddToWishList()}
          >
            <Icon name="favorite" size={24} style={styles.addToWishListIcon} />
          </TouchableOpacity>
        }
      </View>
    );
  }

  renderSpinner = () => (
    <Spinner visible mode="content" />
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
          contentContainerStyle={{ marginBottom: 122 }}
          behavior="position"
        >
          <ScrollView>
            {this.renderImage()}
            <View style={styles.descriptionBlock}>
              {this.renderName()}
              {this.renderRating()}
              {this.renderPrice()}
              {this.renderDesc()}
            </View>
            {this.renderOptions()}
            {this.renderDiscussion()}
            {this.renderFeatures()}
            {this.renderShare()}
          </ScrollView>
          {this.renderAddToCart()}
        </KeyboardAvoidingView>
        <Spinner visible={cart.fetching} />
      </View>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
    cart: state.cart,
    productDetail: state.productDetail,
    wishList: state.wishList,
  }),
  dispatch => ({
    productsActions: bindActionCreators(productsActions, dispatch),
    cartActions: bindActionCreators(cartActions, dispatch),
    wishListActions: bindActionCreators(wishListActions, dispatch),
  })
)(ProductDetail);
