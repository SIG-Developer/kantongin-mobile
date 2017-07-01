import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  listContainer: {
    marginTop: 30,
  },
  listItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
    borderTopWidth: 1,
  },
  listItemText: {
    fontSize: '0.9rem',
  },
  listItemIcon: {
    fontSize: '1.3rem',
    position: 'absolute',
    right: 14,
    top: 12,
  }
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
      <ScrollView
        contentContainerStyle={styles.listContainer}
      >
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => {
            this.props.navigation.navigate('Orders');
          }}
        >
          <Text style={styles.listItemText}>
            Orders
          </Text>
          <Icon name="angle-right" style={styles.listItemIcon} />
        </TouchableOpacity>
      </ScrollView>
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
