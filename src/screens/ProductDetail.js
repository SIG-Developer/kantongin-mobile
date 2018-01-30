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
import * as vendorActions from '../actions/vendorActions';

// Components
import DiscussionList from '../components/DiscussionList';
import SelectOption from '../components/SelectOption';
import InputOption from '../components/InputOption';
import QtyOption from '../components/QtyOption';
import SwitchOption from '../components/SwitchOption';
import SectionRow from '../components/SectionRow';
import SectionButton from '../components/SectionButton';
import Spinner from '../components/Spinner';
import Section from '../components/Section';
import Rating from '../components/Rating';
import Icon from '../components/Icon';

import i18n from '../utils/i18n';
import theme from '../config/theme';
import config from '../config';
import {
  iconsMap,
  iconsLoaded,
} from '../utils/navIcons';

import {
  DISCUSSION_COMMUNICATION_AND_RATING,
  DISCUSSION_RATING,
  DISCUSSION_DISABLED,
  VERSION_MVE,
} from '../constants';

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
    borderTopColor: '#F1F1F1',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1'
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
    borderColor: '#F0F0F0',
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
  noPadding: {
    padding: 0,
    paddingTop: 6,
    paddingBottom: 6,
  },
  sectionBtn: {
    paddingLeft: 14,
    paddingTop: 12,
    paddingBottom: 6,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  sectionBtnText: {
    color: '$primaryColor',
    fontSize: '0.9rem',
  },
  vendorWrapper: {
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 10,
  },
  vendorName: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  vendorProductCount: {
    fontSize: '0.7rem',
    color: 'gray',
    marginBottom: 13,
  },
  vendorDescription: {
    color: 'gray',
    fontSize: '0.9rem',
  },
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
    discussion: PropTypes.shape({
      posts: PropTypes.arrayOf(PropTypes.shape({})),
    }),
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
    vendorActions: PropTypes.shape({
      fetch: PropTypes.func,
    }),
    vendors: PropTypes.shape({}),
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
      amount: 1,
      images: [],
      product: {},
      discussion: {},
      vendor: null,
      fetching: true,
      selectedOptions: {},
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
    const {
      productDetail, navigator, vendors, discussion,
    } = nextProps;
    const product = productDetail;
    const images = [];

    if (!product) {
      return;
    }

    // If we haven't images put main image.
    if (has(product, 'main_pair.detailed.image_path')) {
      images.push(product.main_pair.detailed.image_path);
      Object.values(product.image_pairs).map(img => images.push(img.detailed.image_path));
    }

    if (config.version === VERSION_MVE &&
      !vendors.items[product.company_id] &&
      !vendors.fetching && product.company_id
    ) {
      this.props.vendorActions.fetch(product.company_id);
    }

    const defaultOptions = { ...this.state.selectedOptions };
    product.options.forEach((option) => {
      defaultOptions[option.option_id] = option.variants[option.value];
    });

    // Get active discussion.
    let activeDiscussion = discussion.items[`p_${product.product_id}`];
    if (!activeDiscussion) {
      activeDiscussion = {
        average_rating: 0,
        posts: [],
        search: {
          page: 1,
          total_items: 0,
        },
      };
    }

    this.setState({
      images,
      product,
      discussion: activeDiscussion,
      selectedOptions: defaultOptions,
      fetching: productDetail.fetching,
      vendor: vendors.items[product.company_id] || null,
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

  renderRating() {
    const { discussion } = this.state;

    if (discussion.type !== DISCUSSION_RATING &&
        discussion.type !== DISCUSSION_COMMUNICATION_AND_RATING) {
      return null;
    }

    return (
      <Rating
        value={discussion.average_rating}
        count={discussion.search.total_items}
      />
    );
  }

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
    const { navigator, auth } = this.props;
    const { discussion } = this.state;

    if (discussion.average_rating === '' || discussion.type === DISCUSSION_DISABLED) {
      return null;
    }

    const masMore = discussion.search.total_items > 10;
    let title = i18n.gettext('Reviews');
    if (discussion.search.total_items != 0) { // eslint-disable-line
      title = i18n.gettext('Reviews ({{count}})').replace('{{count}}', discussion.search.total_items);
    }

    return (
      <Section
        title={title}
        wrapperStyle={styles.noPadding}
        showRightButton={discussion.disable_adding || auth.logged}
        rightButtonText={i18n.gettext('Write a Review')}
        onRightButtonPress={() => {
          navigator.showModal({
            screen: 'WriteReview',
            passProps: {
              type: 'modal',
              activeDiscussion: discussion,
            }
          });
        }}
      >
        <DiscussionList
          items={discussion.posts.slice(0, 4)}
          type={discussion.type}
        />
        {masMore &&
          <TouchableOpacity
            style={styles.sectionBtn}
            onPress={() => {
              navigator.showModal({
                screen: 'Discussion',
              });
            }}
          >
            <Text style={styles.sectionBtnText}>
              {i18n.gettext('View All')}
            </Text>
          </TouchableOpacity>
        }
      </Section>
    );
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

  renderFeatures() {
    const { product } = this.state;
    const features = Object.keys(product.product_features).map(k => product.product_features[k]);
    return (
      <Section title={i18n.gettext('Feautures')}>
        {features.length ?
          features.map((item, index) => (
            <SectionRow
              name={item.description}
              value={item.variant}
              last={(index + 1) === features.length}
              key={index}
            />
          ))
          :
          <Text> {i18n.gettext('There are no feautures.')} </Text>
        }
      </Section>
    );
  }

  renderVendorInfo() {
    if (config.version !== VERSION_MVE || !this.state.vendor) {
      return null;
    }
    const { navigator } = this.props;

    return (
      <Section
        title={i18n.gettext('Vendor info')}
        wrapperStyle={styles.noPadding}
      >
        <View style={styles.vendorWrapper}>
          <Text style={styles.vendorName}>
            {this.state.vendor.company}
          </Text>
          <Text style={styles.vendorProductCount}>
            {i18n.gettext('134 items')}
          </Text>
          <Text style={styles.vendorDescription}>
            {this.state.vendor.description}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.sectionBtn}
          onPress={() => {
            navigator.showModal({
              screen: 'VendorDetail',
              passProps: {
                vendorId: this.state.vendor.company_id,
              },
            });
          }}
        >
          <Text style={styles.sectionBtnText}>
            {i18n.gettext('Go To Store')}
          </Text>
        </TouchableOpacity>
      </Section>
    );
  }

  renderShare() {
    const { product } = this.state;
    return (
      <SectionButton
        text={i18n.gettext('Share product')}
        onPress={() => {
          Share.share({
            message: product.full_description,
            title: product.product,
            url: config.baseUrl,
          }, {
            dialogTitle: product.product,
            tintColor: 'black'
          });
        }}
      />
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
            {this.renderVendorInfo()}
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
    vendors: state.vendors,
    wishList: state.wishList,
    discussion: state.discussion,
    productDetail: state.productDetail,
  }),
  dispatch => ({
    cartActions: bindActionCreators(cartActions, dispatch),
    vendorActions: bindActionCreators(vendorActions, dispatch),
    productsActions: bindActionCreators(productsActions, dispatch),
    wishListActions: bindActionCreators(wishListActions, dispatch),
  })
)(ProductDetail);
