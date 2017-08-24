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

// Import actions.
import * as ordersActions from '../actions/ordersActions';

// Components
import FormBlock from '../components/FormBlock';
import { stripTags, formatPrice } from '../utils';
import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentContainer: {
    padding: 14,
  },
});

class CheckoutComplete extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
    }),
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
      fetching: true,
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text>{i18n.gettext('Congratulations!')}</Text>
          <Text>{i18n.gettext('Your order has been successfully placed.')}</Text>
          <FormBlock title={i18n.gettext('order')}>
            <Text>{i18n.gettext('Your order has been successfully placed.')}</Text>
          </FormBlock>
        </ScrollView>
      </View>
    );
  }
}

export default connect(state => ({
  cart: state.cart,
  auth: state.auth,
}),
dispatch => ({
  ordersActions: bindActionCreators(ordersActions, dispatch),
})
)(CheckoutComplete);
