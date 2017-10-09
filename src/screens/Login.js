import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import * as t from 'tcomb-form-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as authActions from '../actions/authActions';

// theme
import theme from '../theme';

// Components
import Spinner from '../components/Spinner';
import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
  btn: {
    backgroundColor: '#4fbe31',
    padding: 12,
    borderRadius: 3,
  },
  btnText: {
    color: '#fff',
    fontSize: '1rem',
    textAlign: 'center',
  },
  btnRegistration: {
    marginTop: 20,
  },
  btnRegistrationText: {
    color: 'black',
    fontSize: '1rem',
    textAlign: 'center'
  }
});

const Form = t.form.Form;
const FormFields = t.struct({
  email: t.String,
  password: t.String,
});
const options = {
  disableOrder: true,
  fields: {
    email: {
      label: 'Email',
      keyboardType: 'email-address',
      clearButtonMode: 'while-editing',
    },
    password: {
      label: 'Password',
      secureTextEntry: true,
      clearButtonMode: 'while-editing',
    },
  }
};

class Login extends Component {
  static propTypes = {
    authActions: PropTypes.shape({
      login: PropTypes.func,
    }),
    navigator: PropTypes.shape({
      setOnNavigatorEvent: PropTypes.func,
      setTitle: PropTypes.func,
      setStyle: PropTypes.func,
      dismissModal: PropTypes.func,
      showInAppNotification: PropTypes.func,
      push: PropTypes.func,
    }),
    auth: PropTypes.shape({
      logged: PropTypes.bool,
      error: PropTypes.shape({}),
      fetching: PropTypes.bool,
    }),
  };

  static navigatorStyle = {
    navBarBackgroundColor: theme.$navBarBackgroundColor,
    navBarButtonColor: theme.$navBarButtonColor,
  };

  constructor(props) {
    super(props);

    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    const { navigator } = this.props;
    navigator.setButtons({
      leftButtons: [
        {
          id: 'close',
          icon: require('../assets/icons/close.png'),
        },
      ],
    });
    navigator.setStyle({
      navBarRightButtonColor: '#FF6008',
    });
    navigator.setTitle({
      title: i18n.gettext('Login').toUpperCase(),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.logged && !nextProps.auth.fetching) {
      setTimeout(() => this.props.navigator.dismissModal(), 1000);
    }
    if (nextProps.auth.error && !nextProps.auth.fetching) {
      this.props.navigator.showInAppNotification({
        screen: 'Notification',
        passProps: {
          type: 'warning',
          title: i18n.gettext('Error'),
          text: i18n.gettext('Wrong password.')
        }
      });
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

  handleLogin() {
    const { authActions } = this.props;
    const value = this.refs.form.getValue();
    if (value) {
      authActions.login(value);
    }
  }

  render() {
    const { auth, navigator } = this.props;
    return (
      <View style={styles.container}>
        <Form
          ref={'form'}
          type={FormFields}
          options={options}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.handleLogin()}
          disabled={auth.fetching}
        >
          <Text style={styles.btnText}>
            {i18n.gettext('Login')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnRegistration}
          onPress={() => navigator.push({
            screen: 'Registration',
            backButtonTitle: '',
          })}
        >
          <Text style={styles.btnRegistrationText}>
            {i18n.gettext('Registration')}
          </Text>
        </TouchableOpacity>
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
)(Login);
