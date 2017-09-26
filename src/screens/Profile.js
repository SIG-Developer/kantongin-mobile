import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  WebView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import qs from 'shitty-qs';

// Import actions.
import * as authActions from '../actions/authActions';

import { registerDrawerDeepLinks } from '../utils/deepLinks';
import config from '../config';
// import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class Profile extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      setOnNavigatorEvent: PropTypes.func,
    })
  };
  componentDidMount() {
    const { navigator } = this.props;
    // FIXME: Set title
    navigator.setTitle({
      title: 'Profile'.toUpperCase(),
    });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    const { navigator } = this.props;
    registerDrawerDeepLinks(event, navigator);
  }

  onNavigationStateChange = (e) => {
    const url = e.url;
    let response = {};
    response = qs(url);
    if (response.token != undefined) {
      console.log('ok', url);
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
            uri: `${config.siteUrl}profiles-update/`,
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
)(Profile);
