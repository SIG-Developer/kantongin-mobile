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
import * as notificationsActions from '../actions/notificationsActions';

// theme
import theme from '../config/theme';

import { registerDrawerDeepLinks } from '../utils/deepLinks';
import config from '../config';
import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$screenBackgroundColor',
  },
});

class Profile extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      setOnNavigatorEvent: PropTypes.func,
      pop: PropTypes.func,
    }),
    auth: PropTypes.shape({
      token: PropTypes.string,
    }),
    notificationsActions: PropTypes.shape({
      show: PropTypes.func,
    })
  };

  static navigatorStyle = {
    navBarBackgroundColor: theme.$navBarBackgroundColor,
    navBarButtonColor: theme.$navBarButtonColor,
    navBarButtonFontSize: theme.$navBarButtonFontSize,
    navBarTextColor: theme.$navBarTextColor,
    screenBackgroundColor: theme.$screenBackgroundColor,
  };

  componentDidMount() {
    const { navigator } = this.props;
    // FIXME: Set title
    navigator.setTitle({
      title: i18n.gettext('Profile').toUpperCase(),
    });
    navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    const { navigator } = this.props;
    registerDrawerDeepLinks(event, navigator);
  }

  onNavigationStateChange = (e) => {
    const { url } = e;
    if (url === `${this.redirectUrl}&selected_section=general`) {
      this.props.notificationsActions.show({
        type: 'success',
        title: i18n.gettext('Information'),
        text: i18n.gettext('The profile data has been updated successfully.'),
        closeLastModal: false,
      });
      this.props.navigator.pop();
    }
  }

  render() {
    const { auth } = this.props;
    this.redirectUrl = `${config.siteUrl}index.php?dispatch=profiles.update`;
    const url = `${config.siteUrl}index.php?dispatch=auth.token_login&token=${auth.token}&redirect_url=${this.redirectUrl}`;
    return (
      <View style={styles.container}>
        <WebView
          automaticallyAdjustContentInsets={false}
          javaScriptEnabled
          scalesPageToFit
          startInLoadingState
          userAgent={'Mozilla/5.0 (Linux; Android 6.0.1; SM-G920V Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36'}
          source={{
            uri: url,
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
  notificationsActions: bindActionCreators(notificationsActions, dispatch),
})
)(Profile);
