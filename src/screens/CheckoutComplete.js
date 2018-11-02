import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Components
import FormBlock from '../components/FormBlock';
import FormBlockField from '../components/FormBlockField';
import Spinner from '../components/Spinner';

import i18n from '../utils/i18n';
import Api from '../services/api';
import { formatPrice, getImagePath, getCountryByCode } from '../utils';

import {
  iconsMap,
  iconsLoaded,
} from '../utils/navIcons';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentContainer: {
    padding: 14,
  },
  mainHeader: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: '0.8rem',
    color: '#7C7C7C',
    marginBottom: 24,
  },
  header: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  date: {
    fontSize: '0.7rem',
    color: '#7C7C7C',
  },
  flexWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productsWrapper: {
    marginTop: 30,
  },
  productItem: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
  },
  productItemImage: {
    width: 100,
    height: 100,
  },
  productItemDetail: {
    marginLeft: 14,
    width: '70%',
  },
  productItemName: {
    fontSize: '0.9rem',
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  productItemPrice: {
    fontSize: '0.7rem',
    color: 'black',
  },
});

class CheckoutComplete extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: '#FAFAFA',
    navBarButtonColor: '#989898',
  };

  static propTypes = {
    orderId: PropTypes.number,
    navigator: PropTypes.shape({
      push: PropTypes.func,
      setTitle: PropTypes.func,
      setButtons: PropTypes.func,
      setOnNavigatorEvent: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
      orderDetail: {},
    };

    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    const { orderId, navigator } = this.props;
    navigator.setTitle({
      title: i18n.gettext('Checkout complete').toUpperCase(),
    });
    iconsLoaded.then(() => {
      navigator.setButtons({
        leftButtons: [
          {
            id: 'close',
            icon: iconsMap.close,
          },
        ],
      });
    });

    Api.get(`/sra_orders/${orderId}`)
      .then((response) => {
        this.setState({
          fetching: false,
          orderDetail: response.data,
        });
      })
      .catch(() => {
        this.setState({
          fetching: false,
        });
      });
  }

  onNavigatorEvent(event) {
    const { navigator } = this.props;
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        navigator.dismissModal();
      }
    }
  }

  renderProduct = (item, index) => {
    let productImage = null;
    const imageUri = getImagePath(item);
    if (imageUri) {
      productImage = (
        <Image
          source={{ uri: imageUri }}
          style={styles.productItemImage}
        />);
    }
    return (
      <View style={styles.productItem} key={index}>
        {productImage}
        <View style={styles.productItemDetail}>
          <Text
            style={styles.productItemName}
            numberOfLines={1}
          >
            {item.product}
          </Text>
          <Text style={styles.productItemPrice}>
            {`${item.amount} x ${formatPrice(item.price_formatted.price)}`}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const { orderDetail, fetching } = this.state;
    if (fetching) {
      return (
        <View style={styles.container}>
          <Spinner visible mode="content" />
        </View>
      );
    }

    const productsList = orderDetail.product_groups.map((group) => {
      const products = Object.keys(group.products).map(k => group.products[k]);
      return products.map((p, i) => this.renderProduct(p, i));
    });

    const date = new Date(orderDetail.timestamp * 1000);

    let state;
    const foundCountry = {
      name: orderDetail.b_country,
      states: [],
      ...getCountryByCode(orderDetail.b_country),
    };
    state = foundCountry.states.filter(s => s.code === orderDetail.b_state);
    let foundState = {
      name: orderDetail.b_state,
    };
    if (state.length) {
      foundState = {
        ...foundState,
        ...state[0],
      };
    }

    const foundCountryShipping = {
      name: orderDetail.s_country,
      states: [],
      ...getCountryByCode(orderDetail.s_country),
    };
    state = foundCountryShipping.states.filter(s => s.code === orderDetail.s_state);
    let foundStateShipping = {
      name: orderDetail.s_state,
    };
    if (state.length) {
      foundStateShipping = {
        ...foundState,
        ...state[0],
      };
    }

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.mainHeader}>
            {i18n.gettext('Congratulations!')}
          </Text>
          <Text style={styles.subHeader}>
            {i18n.gettext('Your order has been successfully placed.')}
          </Text>
          <FormBlock>
            <View style={styles.flexWrap}>
              <Text style={styles.header}>
                {i18n.gettext('order').toUpperCase()} #{orderDetail.order_id}
              </Text>
              <Text style={styles.date}>
                {`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`}
              </Text>
            </View>

            <View style={styles.productsContainer}>
              <Text style={styles.header}>
                {i18n.gettext('Products information').toUpperCase()}
              </Text>
              <View style={styles.productsWrapper}>
                {productsList}
              </View>
            </View>
          </FormBlock>

          <FormBlock
            title={i18n.gettext('Billing address')}
            buttonText={i18n.gettext('Show all').toUpperCase()}
            simpleView={(
              <View>
                <FormBlockField title={`${i18n.gettext('First name')}:`}>
                  {orderDetail.b_firstname}
                </FormBlockField>
                <FormBlockField title={`${i18n.gettext('Last name')}:`}>
                  {orderDetail.b_lastname}
                </FormBlockField>
              </View>
            )}
          >
            <View>
              <FormBlockField title={`${i18n.gettext('First name')}:`}>
                {orderDetail.b_firstname}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('Last name')}:`}>
                {orderDetail.b_lastname}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('E-mail')}:`}>
                {orderDetail.email}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('Phone')}:`}>
                {orderDetail.b_phone}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('Address')}:`}>
                {orderDetail.b_address} {orderDetail.b_address2}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('City')}:`}>
                {orderDetail.b_city}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('Country')}:`}>
                {foundCountry.name}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('State')}:`}>
                {foundState.name}
              </FormBlockField>
            </View>
          </FormBlock>

          <FormBlock
            title={i18n.gettext('Shipping address')}
            buttonText={i18n.gettext('Show all').toUpperCase()}
            simpleView={(
              <View>
                <FormBlockField title={`${i18n.gettext('First name')}:`}>
                  {orderDetail.s_firstname}
                </FormBlockField>
                <FormBlockField title={`${i18n.gettext('Last name')}:`}>
                  {orderDetail.s_lastname}
                </FormBlockField>
              </View>)
            }
          >
            <View>
              <FormBlockField title={`${i18n.gettext('First name')}:`}>
                {orderDetail.s_firstname}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('Last name')}:`}>
                {orderDetail.s_lastname}
              </FormBlockField>
              <FormBlockField title={i18n.gettext('E-mail:')}>
                {orderDetail.email}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('Phone')}:`}>
                {orderDetail.s_phone}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('Address')}:`}>
                {orderDetail.s_address} {orderDetail.s_address2}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('City')}:`}>
                {orderDetail.s_city}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('Country')}:`}>
                {foundCountryShipping.name}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('State')}:`}>
                {foundStateShipping.name}
              </FormBlockField>
            </View>
          </FormBlock>
        </ScrollView>
      </View>
    );
  }
}

export default connect(state => ({
  cart: state.cart,
  auth: state.auth,
}))(CheckoutComplete);
