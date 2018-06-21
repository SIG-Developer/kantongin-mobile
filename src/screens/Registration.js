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

// theme
import theme from '../config/theme';

// Icons
import {
  iconsMap,
  iconsLoaded,
} from '../utils/navIcons';

// Components
import Spinner from '../components/Spinner';

import i18n from '../utils/i18n';
import config from '../config';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

class Registration extends Component {
  static propTypes = {
    authActions: PropTypes.shape({
      registration: PropTypes.func,
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
    showClose: PropTypes.bool,
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

    props.navigator.setTitle({
      title: i18n.gettext('Registration')
    });

    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    const { navigator, showClose } = this.props;
    if (showClose) {
      iconsLoaded.then(() => {
        navigator.setButtons({
          leftButtons: [
            {
              id: 'close',
              icon: iconsMap.close,
            },
          ],
        });
      });
    }
  }

  componentDidMount() {
    const { navigator } = this.props;
    navigator.setStyle({
      navBarRightButtonColor: theme.$navBarRightButtonColor,
    });
    navigator.setTitle({
      title: i18n.gettext('Registration').toUpperCase(),
    });
  }

  onNavigatorEvent(event) {
    const { navigator } = this.props;
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        navigator.dismissModal();
      }
    }
  }

  onNavigationStateChange(e) {
    const { url } = e;
    let response = {};
    response = qs(url);
    if (response.token != undefined) {
      this.props.authActions.registration(response.token);
    }
  }

  render() {
    const { auth } = this.props;
    let url = `${config.siteUrl}index.php?dispatch=profiles.add.get_auth_token&s_layout=${config.layoutId}`;
    if (!auth.logged) {
      url = `${config.siteUrl}index.php?dispatch=auth.logout&redirect_url=index.php?dispatch=profiles.add.get_auth_token`;
    }
    return (
      <View style={styles.container}>
        <WebView
          scalesPageToFit
          startInLoadingState
          source={{
            uri: url,
          }}
          onNavigationStateChange={e => this.onNavigationStateChange(e)}
        />
        <Spinner visible={auth.fetching} />
      </View>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
  }),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch),
  })
)(Registration);
