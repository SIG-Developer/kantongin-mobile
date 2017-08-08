import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as t from 'tcomb-form-native';

// Import components
import CheckoutSteps from '../components/CheckoutSteps';

// Import actions.
import * as authActions from '../actions/authActions';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentContainer: {
    padding: 14,
    marginBottom: 130,
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
  closeBtn: {
    padding: 10,
  },
  closeIcon: {
    height: 20,
    fontSize: 20,
  }
});

const Form = t.form.Form;
const Country = t.enums({
  AF: 'Afghanistan',
  AL: 'Aland Islands',
  ALB: 'Albania',
});

const FormFields = t.struct({
  firstName: t.String,
  lastName: t.String,
  email: t.String,
  phone: t.maybe(t.String),
  address: t.String,
  city: t.String,
  country: Country,
  state: t.String,
  zupCode: t.String,
});
const options = {
  disableOrder: true,
  fields: {
    firstName: {
      label: 'First name',
      clearButtonMode: 'while-editing',
    },
    lastName: {
      label: 'Last name',
      clearButtonMode: 'while-editing',
    },
    email: {
      label: 'E-mail',
      keyboardType: 'email-address',
      clearButtonMode: 'while-editing',
    },
    phone: {
      label: 'Phone',
      keyboardType: 'phone-pad',
      clearButtonMode: 'while-editing',
    },
    address: {
      label: 'Address',
      multiline: true,
      numberOfLines: 4,
      clearButtonMode: 'while-editing',
    },
    city: {
      label: 'City',
      clearButtonMode: 'while-editing',
    },
    state: {
      label: 'State',
      clearButtonMode: 'while-editing',
    },
    zipCode: {
      label: 'Zip code',
      keyboardType: 'numeric',
      clearButtonMode: 'while-editing',
    },
  }
};


class Checkout extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      push: PropTypes.func,
      pop: PropTypes.func,
    }),
  };

  // static navigationOptions = ({ navigation }) => {
  //   if (!navigation.state.params) {
  //     return {};
  //   }
  //   const { headerRight } = navigation.state.params;
  //   return {
  //     headerRight,
  //     title: 'Billing and Shipping Address'.toUpperCase(),
  //   };
  // };

  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      values: {
        country: 'AF',
      }
    };
  }

  componentDidMount() {
    const { navigator } = this.props;
    // navigation.setParams({
    //   headerRight: (
    //     <TouchableOpacity
    //       style={styles.closeBtn}
    //       onPress={() => {
    //         this.props.navigation.dispatch(NavigationActions.back());
    //       }}
    //     >
    //       <Icon name="times" style={styles.closeIcon} />
    //     </TouchableOpacity>
    //   ),
    // });
  }

  handleLogin() {
    // const { navigator } = this.props;
    // const value = this.refs.checkoutForm.getValue();
    // navigator.navigate('CheckoutStepTwo', {
    //   ...navigation.state.params,
    //   user_data: {},
    // });
    // if (value) {
    //   navigation.navigate('CheckoutStepTwo', { data: value });
    // }
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="position"
        >
          <ScrollView
            contentContainerStyle={styles.contentContainer}
          >
            <CheckoutSteps step={2} />
            <Form
              ref={'checkoutForm'}
              type={FormFields}
              value={this.state.values}
              options={options}
            />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.handleLogin()}
            >
              <Text style={styles.btnText}>Continue</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
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
)(Checkout);
