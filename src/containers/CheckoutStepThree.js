import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as ordersActions from '../actions/ordersActions';
import * as paymentsActions from '../actions/paymentsActions';
import * as flashActions from '../actions/flashActions';

// Components
import Spinner from '../components/Spinner';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 14,
  },
  paymentItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
  }
});

class CheckoutStepThree extends Component {
  static propTypes = {
    ordersActions: PropTypes.shape({
      create: PropTypes.func,
    }),
    paymentsActions: PropTypes.shape({
      fetchAll: PropTypes.func,
    }),
    payments: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
    }),
    flashActions: PropTypes.shape({
      show: PropTypes.func,
    }),
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    })
  };

  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
    };
  }

  componentDidMount() {
    const { paymentsActions } = this.props;
    InteractionManager.runAfterInteractions(() => {
      paymentsActions.fetchAll();
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.payments.items,
      fetching: nextProps.payments.fetching,
    });
  }

  renderList() {
    return (
      <FlatList
        data={this.state.items}
        keyExtractor={item => +item.payment_id}
        numColumns={1}
        renderItem={({ item }) => this.renderItem(item)}
      />
    );
  }

  renderItem = (item) => {
    const { navigation, ordersActions, flashActions } = this.props;
    return (
      <TouchableOpacity
        style={styles.paymentItem}
        onPress={() => {
          const orderData = {
            ...navigation.state.params,
            payment_id: item.payment_id,
          };
          ordersActions.create(orderData, () => {
            flashActions.show({
              type: 'success',
              title: 'Success',
              text: 'Order has been placed.'
            });
          });
        }}
      >
        <Text style={styles.paymentItemText}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  }

  renderSpinner = () => (
    <Spinner visible mode="content" />
  );

  render() {
    return (
      <View style={styles.container}>
        {this.state.fetching ? this.renderSpinner() : this.renderList()}
      </View>
    );
  }
}

CheckoutStepThree.navigationOptions = () => {
  return {
    title: 'Billing Options'.toUpperCase(),
  };
};

export default connect(state => ({
  nav: state.nav,
  payments: state.payments,
  flash: state.flash,
}),
  dispatch => ({
    ordersActions: bindActionCreators(ordersActions, dispatch),
    paymentsActions: bindActionCreators(paymentsActions, dispatch),
    flashActions: bindActionCreators(flashActions, dispatch),
  })
)(CheckoutStepThree);
