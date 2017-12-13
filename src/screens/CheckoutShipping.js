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
    fontSize: 28,
  },
  checkIcon: {
    fontSize: 28,
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
      total: 0,
      selectedId: null,
      selectedItem: {
        rate: 0,
      },
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

  handleNextPress() {
    const { navigator } = this.props;
    navigator.push({
      screen: 'CheckoutPayment',
      title: i18n.gettext('Checkout').toUpperCase(),
      backButtonTitle: '',
      passProps: {
        total: this.state.total,
        shipping_id: this.state.selectedItem.shipping_id,
      },
    });
  }

  renderItem = (item) => {
    const isSelected = (item.shipping_id && this.state.selectedId);
    return (
      <TouchableOpacity
        style={[styles.shippingItem]}
        onPress={() => {
          if (isSelected) {
            return;
          }
          this.setState({
            selectedId: item.shipping_id,
            selectedItem: item,
            total: item.rate + this.state.total,
          });
        }}
      >
        <View style={styles.shippingItemTitleWrap}>
          {isSelected ?
            <Icon name="radio-button-checked" style={styles.checkIcon} /> :
            <Icon name="radio-button-unchecked" style={styles.uncheckIcon} />
          }
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

  renderSteps = () => (
    <View style={styles.stepsWrapper}>
      <CheckoutSteps step={2} />
    </View>
  );

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
    return (
      <View style={styles.container}>
        <SectionList
          contentContainerStyle={styles.contentContainer}
          sections={this.state.items}
          keyExtractor={item => +item.shipping_id}
          numColumns={1}
          ListHeaderComponent={() => this.renderSteps()}
          renderSectionHeader={({ section }) => this.renderHeader(section)}
          renderItem={({ item }) => this.renderItem(item)}
        />
        <CartFooter
          totalPrice={formatPrice(this.state.total)}
          btnText={i18n.gettext('Next').toUpperCase()}
          isBtnDisabled={this.state.selectedId == null}
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
