import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as ordersActions from '../actions/ordersActions';
import * as paymentsActions from '../actions/paymentsActions';

// Components
import CheckoutSteps from '../components/CheckoutSteps';
import { stripTags } from '../utils';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentContainer: {
    padding: 14,
  },
  paymentItem: {
    padding: 14,
    marginLeft: -14,
    marginRight: -14,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#F1F1F1',
    backgroundColor: '#fff',
    marginBottom: 6,
  },
  paymentItemText: {
    fontSize: '0.9rem',
    paddingBottom: 6,
  },
  paymentItemDesc: {
    fontSize: '0.8rem',
    paddingBottom: 6,
    color: 'gray'
  },
});

class CheckoutStepThree extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
    }),
    shipping_id: PropTypes.string,
    navigator: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  static navigatorStyle = {
    navBarBackgroundColor: '#FAFAFA',
    navBarButtonColor: 'black',
  };

  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    const { cart } = this.props;
    const items = Object.keys(cart.payments).map(k => cart.payments[k]);
    this.setState({
      items,
    });
  }

  renderItem = (item) => {
    const { navigator, shipping_id } = this.props;
    return (
      <TouchableOpacity
        style={styles.paymentItem}
        onPress={() => {
          if (item.payment === 'Phone ordering') {
            navigator.push({
              screen: 'PaymentPhone',
              backButtonTitle: '',
              passProps: {
                shipping_id,
                payment_id: 2, // FIXME HARDCODED payment id
              },
            });
          }
        }}
      >
        <View>
          <Text style={styles.paymentItemText}>
            {item.description}
          </Text>
        </View>
        <Text style={styles.paymentItemDesc}>
          {stripTags(item.instructions)}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          ListHeaderComponent={() => <CheckoutSteps step={3} />}
          data={this.state.items}
          keyExtractor={(item, index) => index}
          numColumns={1}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </View>
    );
  }
}

export default connect(state => ({
  payments: state.payments,
  cart: state.cart,
}),
dispatch => ({
  ordersActions: bindActionCreators(ordersActions, dispatch),
  paymentsActions: bindActionCreators(paymentsActions, dispatch),
})
)(CheckoutStepThree);
