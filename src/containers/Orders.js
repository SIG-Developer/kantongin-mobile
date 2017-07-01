import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  InteractionManager,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as authActions from '../actions/authActions';
import * as ordersActions from '../actions/ordersActions';
import * as flashActions from '../actions/flashActions';

// Components
import Spinner from '../components/Spinner';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  orderItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    padding: 14,
  },
  orderItemId: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    maxWidth: 50,
    marginRight: 20,
  },
  orderItemCustomer: {
    marginRight: 20,
  }
});

class Profile extends Component {
  static propTypes = {
    authActions: PropTypes.shape({
      login: PropTypes.func,
    }),
    flashActions: PropTypes.shape({
      show: PropTypes.func,
    }),
    auth: PropTypes.shape({
      logged: PropTypes.bool,
      fetching: PropTypes.bool,
    }),
  }

  constructor(props) {
    super(props);
  
    this.state = {
      orders: [],
      fetching: true,
    };
  }

  componentDidMount() {
    const { auth, ordersActions } = this.props;
    InteractionManager.runAfterInteractions(() => {
      ordersActions.fetch(auth.token);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { orders } = nextProps;
    this.setState({
      orders: orders.items,
      fetching: orders.fetching,
    });
  }

  renderItem(item) {
    return (
      <View style={styles.orderItem}>
        <Text style={styles.orderItemId}>
          {item.order_id}
        </Text>
        <View style={styles.orderItemCustomer}>
          <Text style={styles.orderItemCustomerText}>
            {item.firstname} {item.lastname}
          </Text>
          <Text style={styles.orderItemEmail}>
            {item.email}
          </Text>
        </View>
        <Text style={styles.orderItemStatus}>
          {item.status}
        </Text>
        <Text style={styles.orderItemTotal}>
          {item.total}
        </Text>
      </View>
    );
  }

  renderList = () => {
    const { orders, fetching } = this.state;
    if (fetching) {
      return null;
    }
    return (
      <FlatList
        keyExtractor={(item, index) => index}
        data={orders}
        renderItem={({ item }) => this.renderItem(item)}
      />
    );
  };

  render() {
    const { fetching } = this.state;
    return (
      <View style={styles.container}>
        {this.renderList()}
        <Spinner visible={fetching} />
      </View>
    );
  }
}

Profile.navigationOptions = () => {
  return {
    title: 'Orders'.toUpperCase(),
  };
};

export default connect(state => ({
  nav: state.nav,
  auth: state.auth,
  flash: state.flash,
  orders: state.orders,
}),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch),
    flashActions: bindActionCreators(flashActions, dispatch),
    ordersActions: bindActionCreators(ordersActions, dispatch),
  })
)(Profile);
