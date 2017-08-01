import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as authActions from '../actions/authActions';

// Components
import LoginForm from '../components/LoginForm';
import Spinner from '../components/Spinner';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

class LoginModal extends Component {
  static propTypes = {
    authActions: PropTypes.shape({
      login: PropTypes.func,
    }),
    onAfterLogin: PropTypes.func,
    navigator: PropTypes.shape({
      setOnNavigatorEvent: PropTypes.func,
      setTitle: PropTypes.func,
      setStyle: PropTypes.func,
      push: PropTypes.func,
    }),
    auth: PropTypes.shape({
      logged: PropTypes.bool,
      fetching: PropTypes.bool,
    }),
  }

  constructor(props) {
    super(props);

    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    const { navigator } = this.props;
    navigator.setButtons({
      rightButtons: [
        {
          id: 'close',
          title: 'Close',
        },
      ],
    });
    navigator.setStyle({
      navBarRightButtonColor: '#FF6008',
    });
    navigator.setTitle({
      title: 'Login'.toUpperCase(),
    });
  }

  componentWillReceiveProps(nextProps) {
    const { auth, authActions, navigator } = nextProps;

    if (!auth.fetching && auth.error) {
      navigator.showInAppNotification({
        screen: 'Notification',
        passProps: {
          type: 'warning',
          title: 'Error',
          text: 'Wrong password.'
        }
      });
      authActions.resetState();
    }

    if (!auth.error && auth.logged) {
      nextProps.onAfterLogin();
    }
  }

  onNavigatorEvent(event) {
    const { navigator } = this.props;
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        navigator.dismissModal();
      }
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <View style={styles.container}>
        <LoginForm
          onSubmit={data => this.props.authActions.login(data)}
          fetching={this.props.auth.fetching}
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
)(LoginModal);
