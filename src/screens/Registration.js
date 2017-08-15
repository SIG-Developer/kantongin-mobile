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

// Components
import Spinner from '../components/Spinner';

import i18n from '../utils/i18n';
import * as config from '../config';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

class Registration extends Component {
  static propTypes = {
    authActions: PropTypes.shape({
      login: PropTypes.func,
    }),
    navigator: PropTypes.shape({
      setOnNavigatorEvent: PropTypes.func,
      setTitle: PropTypes.func,
      dismissModal: PropTypes.func,
      showInAppNotification: PropTypes.func,
      push: PropTypes.func,
    }),
    auth: PropTypes.shape({
      logged: PropTypes.bool,
      fetching: PropTypes.bool,
    }),
  };

  static navigatorStyle = {
    navBarBackgroundColor: '#FAFAFA',
    navBarButtonColor: '#989898',
  };

  constructor(props) {
    super(props);

    props.navigator.setTitle({
      title: i18n.gettext('Registration')
    });
  }

  componentDidMount() {
    const { navigator } = this.props;
    navigator.setStyle({
      navBarRightButtonColor: '#FF6008',
    });
    navigator.setTitle({
      title: i18n.gettext('Registration').toUpperCase(),
    });
  }

  onNavigationStateChange(e) {
    let url = e.url;
    let response = {};
    response = qs(url);
    if (response.token != undefined) {
      this.props.authActions.registration(
        response.token,
        this.props.navigator,
      );
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <View style={styles.container}>
        <WebView
          automaticallyAdjustContentInsets={false}
          javaScriptEnabled
          scalesPageToFit
          startInLoadingState
          userAgent={'Mozilla/5.0 (Linux; Android 6.0.1; SM-G920V Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36'}
          source={{
            uri: `${config.config.siteUrl}index.php?dispatch=profiles.add.get_auth_token`,
          }}
          onNavigationStateChange={e => this.onNavigationStateChange(e)}
        />
        <Spinner visible={auth.fetching} />
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
)(Registration);
