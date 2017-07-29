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
import * as shippingActions from '../actions/shippingActions';

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
  shippingItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
  }
});

class CheckoutStepTwo extends Component {
  static propTypes = {
    shippingActions: PropTypes.shape({
      fetchAll: PropTypes.func,
    }),
    shippings: PropTypes.shape({
      fetching: PropTypes.bool,
      items: PropTypes.arrayOf(PropTypes.object),
    }),
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    })
  };

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      fetching: false,
    };
  }

  componentDidMount() {
    const { shippingActions } = this.props;
    InteractionManager.runAfterInteractions(() => {
      shippingActions.fetchAll();
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.shippings.items,
      fetching: nextProps.shippings.fetching,
    });
  }

  renderList() {
    return (
      <FlatList
        data={this.state.items}
        keyExtractor={item => +item.shipping_id}
        numColumns={1}
        renderItem={({ item }) => this.renderItem(item)}
      />
    );
  }

  renderItem = (item) => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        style={styles.shippingItem}
        onPress={() => navigation.navigate('CheckoutStepThree', {
          ...navigation.state.params,
          shipping_id: item.shipping_id,
        })}
      >
        <Text style={styles.shippingItemText}>
          {item.shipping} {item.delivery_time}
        </Text>
      </TouchableOpacity>
    );
  };

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

CheckoutStepTwo.navigationOptions = () => {
  return {
    title: 'Shipping Options'.toUpperCase(),
  };
};

export default connect(state => ({
  nav: state.nav,
  shippings: state.shippings,
}),
  dispatch => ({
    shippingActions: bindActionCreators(shippingActions, dispatch),
  })
)(CheckoutStepTwo);
