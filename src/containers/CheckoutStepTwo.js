import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as t from 'tcomb-form-native';

// Import actions.
import * as shippingActions from '../actions/shippingActions';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 14,
  }
});

class CheckoutStepTwo extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
    };
  }

  componentDidMount() {
    const { shippingActions } = this.props;
    shippingActions.fetchAll();
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

CheckoutStepTwo.navigationOptions = () => {
  return {
    title: 'Checkout step two'.toUpperCase(),
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
