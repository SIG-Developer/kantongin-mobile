import React, { Component } from 'react';
import axios from 'axios';
import base64 from 'base-64';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as authActions from '../actions/authActions';
import * as ordersActions from '../actions/ordersActions';
import * as flashActions from '../actions/flashActions';

// Components
import LoginForm from '../components/LoginForm';
import Spinner from '../components/Spinner';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class Profile extends Component {
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

  componentDidMount() {
    const { auth, ordersActions } = this.props;
    if (auth.logged) {
      ordersActions.fetch(auth.token);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { auth, flashActions, authActions } = nextProps;

    if (!auth.fetching && auth.error) {
      flashActions.show({ title: 'Error', text: 'Wrong password' });
      authActions.resetState();
    }
  }

  renderLoginForm() {
    return (
      <LoginForm
        onSubmit={data => this.props.authActions.login(data)}
        fetching={this.props.auth.fetching}
      />
    );
  }

  renderProfileInfo() {
    return (
      <Text>Orders will be here</Text>
    );
  }

  render() {
    const { auth } = this.props;
    return (
      <View style={styles.container}>
        { auth.logged ? this.renderProfileInfo() : this.renderLoginForm() }
        <Spinner visible={auth.fetching} />
      </View>
    );
  }
}

Profile.navigationOptions = () => {
  return {
    title: 'PROFILE',
  };
};

export default connect(state => ({
  nav: state.nav,
  flash: state.flash,
  auth: state.auth,
}),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch),
    flashActions: bindActionCreators(flashActions, dispatch),
    ordersActions: bindActionCreators(ordersActions, dispatch),
  })
)(Profile);
