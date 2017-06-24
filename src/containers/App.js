import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  View,
  NetInfo,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNavigationHelpers } from 'react-navigation';
import SplashScreen from 'rn-splash-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import DropdownAlert from 'react-native-dropdownalert';

// Theme
import theme from '../theme';

// Actions
import * as flashActions from '../actions/flashActions';

// Components
import AppNavigator from '../AppNavigator';
import Offline from '../components/Offline';

// Calcuate styles
const { width } = Dimensions.get('window');
EStyleSheet.build({
  rem: width > 340 ? 18 : 16,
  ...theme,
});

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  }
});

class App extends Component {
  static propTypes = {
    flash: PropTypes.shape({
      notifications: PropTypes.arrayOf(PropTypes.object),
    }),
    flashActions: PropTypes.shape({
      show: PropTypes.func,
      hide: PropTypes.func,
    }),
    dispatch: PropTypes.func,
    nav: PropTypes.shape({}),
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      offline: false,
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'change',
      this.handleFirstConnectivityChange.bind(this),
    );
    SplashScreen.hide();
  }

  componentWillReceiveProps(nextProps) {
    const { flash } = nextProps;
    // Show notifications
    if (flash.messages.length) {
      const notify = flash.messages[0];
      this.dropdown.alertWithType(notify.type, notify.title, notify.text);
    }
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this.handleFirstConnectivityChange,
    );
  }

  handleFirstConnectivityChange(active) {
    this.setState({ offline: !active });
  }

  handleCloseNotification() {
    const { flash, flashActions } = this.props;
    const notify = flash.messages[0];
    flashActions.hide();
    notify.onClose();
  }

  render() {
    return (
      <View style={styles.container}>
        <AppNavigator
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav,
          })}
        />
        <DropdownAlert
          ref={(r) => { this.dropdown = r; }}
          onClose={() => this.handleCloseNotification()}
        />
        {this.state.offline && <Offline />}
      </View>
    );
  }
}

export default connect(state => ({
  nav: state.nav,
  auth: state.auth,
  flash: state.flash,
  dispatch: state.dispatch,
}),
  dispatch => ({
    flashActions: bindActionCreators(flashActions, dispatch),
    dispatch,
  })
)(App);
