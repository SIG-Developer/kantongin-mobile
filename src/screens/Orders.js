import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  InteractionManager,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Styles
import theme from '../config/theme';

// Import actions.
import * as authActions from '../actions/authActions';
import * as ordersActions from '../actions/ordersActions';

// Components
import Spinner from '../components/Spinner';
import EmptyList from '../components/EmptyList';

import i18n from '../utils/i18n';
import { formatPrice } from '../utils';
import { registerDrawerDeepLinks } from '../utils/deepLinks';

import {
  iconsMap,
  iconsLoaded,
} from '../utils/navIcons';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    padding: 14,
  },
  orderItemEmail: {
    fontSize: '0.7rem',
    color: 'gray'
  },
  orderItemCustomer: {
    marginRight: 20,
  },
  orderItemCustomerText: {
    fontWeight: 'bold',
  },
  orderItemStatusText: {
    textAlign: 'right',
  },
  orderItemTotal: {
    fontWeight: 'bold',
    fontSize: '0.7rem',
    textAlign: 'right',
  }
});

class Orders extends Component {
  static propTypes = {
    ordersActions: PropTypes.shape({
      login: PropTypes.func,
    }),
    orders: PropTypes.shape({
      fetching: PropTypes.bool,
      items: PropTypes.arrayOf(PropTypes.object),
    }),
    navigator: PropTypes.shape({
      setTitle: PropTypes.func,
      setButtons: PropTypes.func,
      push: PropTypes.func,
      setOnNavigatorEvent: PropTypes.func,
    }),
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
      orders: [],
      fetching: true,
    };

    props.navigator.setTitle({
      title: i18n.gettext('Orders').toUpperCase(),
    });

    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    iconsLoaded.then(() => {
      this.props.navigator.setButtons({
        leftButtons: [
          {
            id: 'sideMenu',
            icon: iconsMap.menu,
          },
        ],
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
      });
    });
  }

  componentDidMount() {
    const { ordersActions } = this.props;
    InteractionManager.runAfterInteractions(() => {
      ordersActions.fetch();
    });
  }

  componentWillReceiveProps(nextProps) {
    const { orders } = nextProps;
    this.setState({
      orders: orders.items,
      fetching: orders.fetching,
    });
  }

  onNavigatorEvent(event) {
    const { navigator } = this.props;
    registerDrawerDeepLinks(event, navigator);
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideMenu') {
        navigator.toggleDrawer({ side: 'left' });
      } else if (event.id === 'cart') {
        navigator.showModal({
          screen: 'Cart',
        });
      } else if (event.id === 'search') {
        navigator.showModal({
          screen: 'Search',
          title: i18n.gettext('Search'),
        });
      }
    }
  }

  getOrderStatus = (status) => {
    switch (status) {
      case 'P':
        return {
          text: i18n.gettext('Processed'),
          style: { color: '#97cf4d' }
        };

      case 'C':
        return {
          text: i18n.gettext('Complete'),
          style: { color: '#97cf4d' }
        };

      case 'O':
        return {
          text: i18n.gettext('Open'),
          style: { color: '#ff9522' }
        };

      case 'F':
        return {
          text: i18n.gettext('Failed'),
          style: { color: '#ff5215' }
        };

      case 'D':
        return {
          text: i18n.gettext('Declined'),
          style: { color: '#ff5215' }
        };

      case 'B':
        return {
          text: i18n.gettext('Backordered'),
          style: { color: '#28abf6' }
        };

      case 'I':
        return {
          text: i18n.gettext('Canceled'),
          style: { color: '#c2c2c2' }
        };

      default:
        return null;
    }
  }

  renderItem = (item) => {
    const status = this.getOrderStatus(item.status);
    return (
      <TouchableOpacity
        onPress={() => this.props.navigator.push({
          screen: 'OrderDetail',
          backButtonTitle: '',
          passProps: {
            orderId: item.order_id,
          },
        })}
      >
        <View style={styles.orderItem}>
          <View style={styles.orderItemCustomer}>
            <Text style={styles.orderItemCustomerText}>
              #{item.order_id} {item.firstname} {item.lastname}
            </Text>
            <Text style={styles.orderItemEmail}>
              {item.email}
            </Text>
          </View>
          <View style={styles.orderItemStatus}>
            <Text style={[styles.orderItemStatusText, status.style]}>
              {status.text}
            </Text>
            <Text style={styles.orderItemTotal}>
              {formatPrice(item.total_formatted.price)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderList = () => {
    const { orders, fetching } = this.state;
    if (fetching) {
      return null;
    }
    return (
      <FlatList
        keyExtractor={(item, index) => `order_${index}`}
        data={orders}
        ListEmptyComponent={<EmptyList />}
        renderItem={({ item }) => this.renderItem(item)}
      />
    );
  };

  render() {
    const { fetching } = this.state;
    return (
      <View style={styles.container}>
        {this.renderList()}
        <Spinner visible={fetching} mode="content" />
      </View>
    );
  }
}

export default connect(
  state => ({
    nav: state.nav,
    auth: state.auth,
    flash: state.flash,
    orders: state.orders,
  }),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch),
    ordersActions: bindActionCreators(ordersActions, dispatch),
  })
)(Orders);
