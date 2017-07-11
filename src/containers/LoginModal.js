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
import * as flashActions from '../actions/flashActions';

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
    flashActions: PropTypes.shape({
      show: PropTypes.func,
    }),
    auth: PropTypes.shape({
      logged: PropTypes.bool,
      fetching: PropTypes.bool,
    }),
  }

  componentWillReceiveProps(nextProps) {
    const { auth, flashActions, authActions } = nextProps;

    if (!auth.fetching && auth.error) {
      flashActions.show({ title: 'Error', text: 'Wrong password' });
      authActions.resetState();
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
  nav: state.nav,
  flash: state.flash,
  auth: state.auth,
}),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch),
    flashActions: bindActionCreators(flashActions, dispatch),
  })
)(LoginModal);
