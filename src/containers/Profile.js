import React, { Component } from 'react';
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

// Components
import LoginForm from '../components/LoginForm';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class Profile extends Component {

  renderLoginForm() {
    return (
      <LoginForm
        onSubmit={data => this.props.authActions.login(data)}
      />
    );
  }

  renderProfileInfo() {
    return (
      <Text>Orders will be here</Text>
    );
  }

  render() {
    const { session } = this.props;
    return (
      <View style={styles.container}>
        {session.logged ? this.renderProfileInfo() : this.renderLoginForm() }
      </View>
    );
  }
}

Profile.navigationOptions = () => {
  return {
    title: 'Profile',
  };
};

export default connect(state => ({
  nav: state.nav,
  session: state.session,
}),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch),
  })
)(Profile);
