import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import values from 'lodash/values';
import uniqueId from 'lodash/uniqueId';

// Import actions.
import * as shippingActions from '../actions/shippingActions';

// Components
import CheckoutSteps from '../components/CheckoutSteps';
import CartFooter from '../components/CartFooter';
import Icon from '../components/Icon';

import i18n from '../utils/i18n';
import { stripTags, formatPrice } from '../utils';

// theme
import theme from '../config/theme';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentContainer: {
  },
  shippingItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#F1F1F1',
    backgroundColor: '#fff',
    marginBottom: 6,
  },
  shippingItemText: {
    fontSize: '0.9rem',
    paddingBottom: 6,
  },
  shippingItemDesc: {
    fontSize: '0.8rem',
    paddingBottom: 6,
    color: 'gray'
  },
  shippingTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: 14,
    textAlign: 'center',
  },
  shippingItemRate: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: '1rem',
  },
  shippingItemTitleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uncheckIcon: {
    fontSize: '1rem',
  },
  checkIcon: {
    fontSize: '1rem',
    opacity: 0.5,
  },
  stepsWrapper: {
    padding: 14,
  },
});


class CheckoutShipping extends Component {
  static propTypes = {
    cart: PropTypes.shape({}),
    navigator: PropTypes.shape({
      push: PropTypes.func,
    }),
    total: PropTypes.number,
  };

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
      items: [],
      shipping_id: {},
      isNextDisabled: true,
      total: 0,
    };
  }

  componentDidMount() {
    const { cart } = this.props;
    this.setState({
      items: this.normalizeData(cart.product_groups),
      total: this.props.total,
    });
  }

  normalizeData = (blobData) => {
    return blobData.map((currentItem) => {
      const item = { ...currentItem };
      item.shippings = values(item.shippings);
      item.shippings = item.shippings.map(i => ({ ...i, isSelected: false, }));
      return item;
    });
  }

  handleNextPress() {
    const { navigator } = this.props;
    navigator.push({
      screen: 'CheckoutPayment',
      title: i18n.gettext('Checkout').toUpperCase(),
      backButtonTitle: '',
      passProps: {
        total: this.state.total,
        shipping_id: this.state.shipping_id,
      },
    });
  }

  recalculateTotal() {
    const { items } = this.state;
    let newTotal = this.props.total;
    items.map(company => company
      .shippings.forEach((shipping) => {
        if (shipping.isSelected) {
          newTotal += shipping.rate;
        }
      }));
    this.setState({
      total: newTotal,
    });
  }

  handleSelect(shipping, shippingIndex, itemIndex) {
    if (shipping.isSelected) {
      return;
    }
    // Check shipping
    const newItems = [...this.state.items];
    newItems[itemIndex].shippings = newItems[itemIndex].shippings
      .map(s => ({ ...s, isSelected: false, }));
    newItems[itemIndex].shippings[shippingIndex].isSelected = true;

    // Get selected ids
    const selectedIds = {
      ...this.state.shipping_id,
    };
    selectedIds[`${itemIndex}`] = `${shipping.shipping_id}`;

    let isNextDisabled = true;
    if (newItems.filter(c => c.shippings
      .filter(s => s.isSelected).length).length === newItems.length) {
      isNextDisabled = false;
    }

    this.setState({
      items: newItems,
      shipping_id: selectedIds,
      isNextDisabled,
    }, () => this.recalculateTotal());
  }

  renderItem = (shipping, shippingIndex, itemIndex) => {
    return (
      <TouchableOpacity
        key={uniqueId('item_')}
        style={[styles.shippingItem]}
        onPress={() => this.handleSelect(shipping, shippingIndex, itemIndex)}
      >
        <View style={styles.shippingItemTitleWrap}>
          {shipping.isSelected ?
            <Icon name="radio-button-checked" style={styles.checkIcon} /> :
            <Icon name="radio-button-unchecked" style={styles.uncheckIcon} />
          }
          <Text style={styles.shippingItemText}>
            {shipping.shipping} {shipping.delivery_time}
          </Text>
          <Text style={styles.shippingItemRate}>
            {formatPrice(shipping.rate)}
          </Text>
        </View>
        <Text style={styles.shippingItemDesc}>
          {stripTags(shipping.description)}
        </Text>
      </TouchableOpacity>
    );
  };

  renderSteps = () => (
    <View style={styles.stepsWrapper}>
      <CheckoutSteps step={2} />
    </View>
  );

  renderCompany = (title) => {
    if (this.state.items.length === 1) {
      return null;
    }
    return (
      <Text style={styles.shippingTitle}>
        {title}
      </Text>
    );
  };

  render() {
    const { items, isNextDisabled, total } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {this.renderSteps()}
          {items.map((item, itemIndex) => (
            <View key={item.company_id}>
              {this.renderCompany(item.name)}
              {item.shippings
                .map((shipping, shippingIndex) => this
                  .renderItem(shipping, shippingIndex, itemIndex))}
            </View>
          ))}
        </ScrollView>
        <CartFooter
          totalPrice={formatPrice(total)}
          btnText={i18n.gettext('Next').toUpperCase()}
          isBtnDisabled={isNextDisabled}
          onBtnPress={() => this.handleNextPress()}
        />
      </View>
    );
  }
}

export default connect(
  state => ({
    cart: state.cart,
    shippings: state.shippings,
  }),
  dispatch => ({
    shippingActions: bindActionCreators(shippingActions, dispatch),
  })
)(CheckoutShipping);
