import React, { Component } from 'react';
import {
  Dimensions
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import AppNavigator from '../AppNavigator';

// Calcuate styles
const { width } = Dimensions.get('window');
EStyleSheet.build({
  rem: width > 340 ? 18 : 16,
  //outline: 1,
});

class App extends Component {
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
        })}
      />
    );
  }
}

export default connect(state => ({
  nav: state.nav,
  dispatch: state.dispatch,
}))(App);
