import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
} from 'react-native';
import * as t from 'tcomb-form-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as authActions from '../actions/authActions';

// Components
import Spinner from '../components/Spinner';
import FormBlock from '../components/FormBlock';
import CheckoutSteps from '../components/CheckoutSteps';
import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentContainer: {
    padding: 14,
  },
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

class CheckoutAuth extends Component {
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
      error: PropTypes.string,
      fetching: PropTypes.bool,
    }),
  };

  static navigatorStyle = {
    navBarBackgroundColor: '#FAFAFA',
    navBarButtonColor: '#989898',
  };

  constructor(props) {
    super(props);

    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    const { navigator } = this.props;
    navigator.setButtons({
      rightButtons: [
        {
          title: i18n.gettext('Next'),
          id: 'next',
          buttonColor: '#FD542A',
          buttonFontWeight: '600',
          buttonFontSize: 16,
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
      setTimeout(() => {
        this.props.navigator.push({
          screen: 'CheckoutDelivery',
          backButtonTitle: '',
          passProps: {},
        });
      }, 1000);
    } else if (nextProps.auth.error && !nextProps.auth.fetching) {
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
    const { authActions } = this.props;
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'next') {
        const value = this.refs.form.getValue();
        if (value) {
          authActions.login(value);
        }
      }
    }
  }

  render() {
    const { auth, navigator } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
        >
          <CheckoutSteps step={0} />
          <FormBlock title={i18n.gettext('Auth')}>
            <Form
              ref={'form'}
              type={FormFields}
              options={options}
            />
          </FormBlock>
        </ScrollView>
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
)(CheckoutAuth);
