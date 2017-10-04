import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  WebView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as authActions from '../actions/authActions';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class PayPalCompleteWebView extends Component {
  static propTypes = {
    return_url: PropTypes.string,
    payment_url: PropTypes.string,
    orderId: PropTypes.number,
    navigator: PropTypes.shape({
      push: PropTypes.func,
      setOnNavigatorEvent: PropTypes.func,
    })
  };
  componentDidMount() {
    const { navigator } = this.props;
    // FIXME: Set title
    navigator.setTitle({
      title: 'PayPal'.toUpperCase(),
    });
  }

  onNavigationStateChange = (e) => {
    const url = e.url;
    if (url.startsWith(this.props.return_url)) {
      this.props.navigator.push({
        screen: 'CheckoutComplete',
        backButtonTitle: '',
        backButtonHidden: true,
        passProps: {
          orderId: this.props.orderId,
        }
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          automaticallyAdjustContentInsets={false}
          javaScriptEnabled
          scalesPageToFit
          startInLoadingState
          userAgent={'Mozilla/5.0 (Linux; Android 6.0.1; SM-G920V Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36'}
          source={{
            uri: this.props.payment_url,
          }}
          onNavigationStateChange={e => this.onNavigationStateChange(e)}
        />
      </View>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
}),
dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
})
)(PayPalCompleteWebView);
