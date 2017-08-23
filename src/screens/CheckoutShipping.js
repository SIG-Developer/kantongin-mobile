import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as shippingActions from '../actions/shippingActions';

// Components
import CheckoutSteps from '../components/CheckoutSteps';
import CartFooter from '../components/CartFooter';

import i18n from '../utils/i18n';
import { stripTags, formatPrice } from '../utils';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentContainer: {
    padding: 14,
  },
  shippingItem: {
    padding: 14,
    marginLeft: -14,
    marginRight: -14,
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
  }
});

class CheckoutShipping extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      setButtons: PropTypes.func,
    }),
    cart: PropTypes.shape({}),
  };

  static navigatorStyle = {
    navBarBackgroundColor: '#FAFAFA',
    navBarButtonColor: 'black',
  };

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      fetching: false,
    };
  }

  componentDidMount() {
    const { cart } = this.props;
    this.setState({
      items: this.normalizeData(cart.product_groups),
      fetching: false,
    });
  }

  normalizeData = (blobData) => {
    const items = [];
    const itemsWithSections = {};
    // Add section: [{item}] to the eventsWithSections.
    blobData.map((currentItem) => {
      const sectionName = currentItem.name;
      if (!{}.hasOwnProperty.call(itemsWithSections, sectionName)) {
        itemsWithSections[sectionName] = [];
      }
      const shippingsAsArray = Object
        .keys(currentItem.shippings).map(k => currentItem.shippings[k]);
      itemsWithSections[sectionName] = shippingsAsArray;
      return itemsWithSections;
    });
    Object.keys(itemsWithSections).forEach((key) => {
      items.push({
        data: itemsWithSections[key],
        title: key,
      });
    });
    return items;
  }

  renderItem = (item) => {
    const { navigator } = this.props;
    return (
      <TouchableOpacity
        style={styles.shippingItem}
        onPress={() => navigator.push({
          screen: 'CheckoutPayment',
          backButtonTitle: '',
          title: i18n.gettext('Checkout').toUpperCase(),
          passProps: {
            shipping_id: item.shipping_id,
          }
        })}
      >
        <View style={styles.shippingItemTitleWrap}>
          <Text style={styles.shippingItemText}>
            {item.shipping} {item.delivery_time}
          </Text>
          <Text style={styles.shippingItemRate}>
            {formatPrice(item.rate)}
          </Text>
        </View>
        <Text style={styles.shippingItemDesc}>
          {stripTags(item.description)}
        </Text>
      </TouchableOpacity>
    );
  };

  renderHeader = (section) => {
    if (this.state.items.length === 1) {
      return null;
    }
    return (
      <Text style={styles.shippingTitle}>
        {section.title}
      </Text>
    );
  };

  render() {
    const { cart } = this.props;
    return (
      <View style={styles.container}>
        <SectionList
          contentContainerStyle={styles.contentContainer}
          sections={this.state.items}
          keyExtractor={item => +item.shipping_id}
          numColumns={1}
          ListHeaderComponent={() => <CheckoutSteps step={2} />}
          renderSectionHeader={({ section }) => this.renderHeader(section)}
          renderItem={({ item }) => this.renderItem(item)}
        />
        <CartFooter
          totalPrice={formatPrice(cart.total)}
          btnText={i18n.gettext('Next').toUpperCase()}
          onBtnPress={() => this.handlePlaceOrder()}
        />
      </View>
    );
  }
}

export default connect(state => ({
  cart: state.cart,
  shippings: state.shippings,
}),
dispatch => ({
  shippingActions: bindActionCreators(shippingActions, dispatch),
})
)(CheckoutShipping);
